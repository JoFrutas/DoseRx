import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { collectTranslatableStrings } from './translation-data.mjs'

const supportedTargets = new Set(['en', 'es'])
const requestedTargets = process.argv.slice(2).filter((argument) => supportedTargets.has(argument))
const targets = requestedTargets.length > 0 ? requestedTargets : [...supportedTargets]
const sourceStrings = collectTranslatableStrings()

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))

function createBatches(strings, maximumCharacters = 3200) {
  const batches = []
  let batch = []
  let characters = 0

  for (const value of strings) {
    const additionalCharacters = value.length + 32
    if (batch.length > 0 && characters + additionalCharacters > maximumCharacters) {
      batches.push(batch)
      batch = []
      characters = 0
    }
    batch.push(value)
    characters += additionalCharacters
  }
  if (batch.length > 0) batches.push(batch)
  return batches
}

function translatedTextFromPayload(payload) {
  return payload[0].map((segment) => segment[0]).join('')
}

function parseBatchTranslation(text, expectedCount) {
  const markerPattern = /<<<DOSERX_(\d+)>>>\s*/g
  const matches = [...text.matchAll(markerPattern)]
  if (matches.length !== expectedCount) return null

  const values = Array(expectedCount)
  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index]
    const id = Number(match[1])
    const start = (match.index ?? 0) + match[0].length
    const end = matches[index + 1]?.index ?? text.length
    values[id] = text.slice(start, end).trim()
  }
  return values.every((value) => typeof value === 'string' && value.length > 0) ? values : null
}

async function requestTranslation(text, target, attempt = 1) {
  const url = new URL('https://translate.googleapis.com/translate_a/single')
  url.searchParams.set('client', 'gtx')
  url.searchParams.set('sl', 'pt')
  url.searchParams.set('tl', target)
  url.searchParams.set('dt', 't')
  url.searchParams.set('q', text)

  const response = await fetch(url, { headers: { 'User-Agent': 'DoseRx translation build/0.4' } })
  if (!response.ok) {
    if (attempt < 4 && [429, 500, 502, 503, 504].includes(response.status)) {
      await wait(500 * (2 ** attempt))
      return requestTranslation(text, target, attempt + 1)
    }
    throw new Error(`Translation request failed (${response.status})`)
  }
  return translatedTextFromPayload(await response.json())
}

async function translateBatch(batch, target) {
  const combined = batch
    .map((value, index) => `<<<DOSERX_${index}>>>\n${value}`)
    .join('\n')
  const translated = await requestTranslation(combined, target)
  const parsed = parseBatchTranslation(translated, batch.length)
  if (parsed) return parsed

  const fallback = []
  for (const value of batch) {
    fallback.push((await requestTranslation(value, target)).trim())
    await wait(80)
  }
  return fallback
}

for (const target of targets) {
  const outputUrl = new URL(`../src/i18n/generated/${target}.json`, import.meta.url)
  let existing = {}
  try {
    existing = JSON.parse(await readFile(outputUrl, 'utf8'))
  } catch {
    existing = {}
  }

  const missing = sourceStrings.filter((value) => !existing[value])
  const batches = createBatches(missing)
  process.stdout.write(`${target}: ${sourceStrings.length} strings; ${missing.length} missing; ${batches.length} batches\n`)

  for (let index = 0; index < batches.length; index += 1) {
    const batch = batches[index]
    const translated = await translateBatch(batch, target)
    batch.forEach((source, itemIndex) => {
      existing[source] = translated[itemIndex]
    })
    if ((index + 1) % 10 === 0 || index + 1 === batches.length) {
      process.stdout.write(`${target}: ${index + 1}/${batches.length} batches\n`)
      const ordered = Object.fromEntries(sourceStrings.map((source) => [source, existing[source]]))
      await writeFile(outputUrl, `${JSON.stringify(ordered, null, 2)}\n`, 'utf8')
    }
    await wait(120)
  }

  if (batches.length === 0) {
    const ordered = Object.fromEntries(sourceStrings.map((source) => [source, existing[source]]))
    await writeFile(outputUrl, `${JSON.stringify(ordered, null, 2)}\n`, 'utf8')
  }
  process.stdout.write(`${target}: wrote ${fileURLToPath(outputUrl)}\n`)
}
