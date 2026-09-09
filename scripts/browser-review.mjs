import { createRequire } from 'node:module';
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.DOSERX_PLAYWRIGHT || 'playwright');
const root = path.resolve('dist');
const server = http.createServer(async (req, res) => {
  const requested = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
  if (!requested.startsWith(root + path.sep) && requested !== root) { res.writeHead(403); res.end(); return; }
  const file = requested === root ? path.join(root, 'index.html') : requested;
  try {
    res.setHeader('Content-Type', file.endsWith('.js') ? 'text/javascript' : file.endsWith('.css') ? 'text/css' : file.endsWith('.png') ? 'image/png' : 'text/html');
    res.end(await fs.readFile(file));
  } catch { res.writeHead(404); res.end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const browser = await chromium.launch(process.env.DOSERX_BROWSER ? { executablePath: process.env.DOSERX_BROWSER } : { channel: 'msedge' });
const report = [];
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  const base = `http://127.0.0.1:${server.address().port}/`;
  await page.goto(base + '#/drug/acyclovir');
  await page.getByRole('button', { name: /Português/ }).click();
  const weightCard = page.locator('.calculator-card').filter({ has: page.getByRole('heading', { name: 'Dose IV por peso', exact: true }) });
  assert.equal(await weightCard.getByLabel('Peso de dose (kg)', { exact: true }).inputValue(), '');
  assert.equal(await weightCard.locator('.calculator-result').count(), 0);
  await weightCard.getByLabel('Peso de dose (kg)', { exact: true }).fill('70');
  assert.match(await weightCard.innerText(), /700 mg/);
  await weightCard.getByLabel('Peso de dose (kg)', { exact: true }).fill('401');
  assert.equal(await weightCard.locator('.calculator-result').count(), 0);
  const volumeCard = page.locator('.calculator-card').filter({ has: page.getByRole('heading', { name: 'Velocidade da solução final', exact: true }) });
  await volumeCard.getByLabel('Duração (minutos)', { exact: true }).fill('30');
  assert.equal(await volumeCard.locator('.calculator-result').count(), 0);
  await volumeCard.getByLabel('Duração (minutos)', { exact: true }).fill('60');
  assert.match(await volumeCard.locator('.calculator-result').innerText(), /100 mL\/h/);
  report.push('acyclovir explicit weight, 1–400 kg range and minimum 60 min');
  await page.goto(base + '#/drug/potassium-chloride');
  const kcl = page.locator('.calculator-card');
  await kcl.getByLabel(/Dose alvo/).fill('11');
  assert.equal(await kcl.locator('.calculator-result').count(), 0);
  await kcl.getByLabel(/Dose alvo/).fill('10');
  assert.match(await kcl.locator('.calculator-result').innerText(), /250 mL\/h/);
  report.push('KCl upper limit blocks rate output');
  await page.goto(base + '#/drug/insulina-regular');
  assert.match(await page.locator('.drug-detail').innerText(), /K <3,5 mmol\/L/);
  for (const [language, expected] of [['EN', /K <3\.5 mmol\/L/], ['ES', /K <3,5 mmol\/L/]]) {
    await page.getByRole('button', { name: language, exact: true }).click();
    await page.locator('.drug-detail').waitFor();
    assert.match(await page.locator('.drug-detail').innerText(), expected);
    const card = page.locator('.calculator-card');
    await card.locator('input').nth(0).fill('70');
    await card.locator('input').nth(2).fill('100');
    await card.locator('input').nth(3).fill('100');
    assert.match(await card.locator('.calculator-result').innerText(), /7 mL\/h/);
    if (language === 'EN') assert.match(await card.innerText(), /units\/kg\/h/);
  }
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  report.push('updated DKA text in all languages, units and insulin rate');
  await page.goto(base + '#/drug/%');
  await page.getByRole('heading', { name: 'Página no encontrada' }).waitFor();
  report.push('malformed shared URL handled');
  assert.deepEqual(errors, []);
  console.log(JSON.stringify({ passed: report, pageErrors: errors }, null, 2));
} finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
