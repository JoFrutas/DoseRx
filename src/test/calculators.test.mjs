import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  calculateInfusionRate,
  calculateVolumeRate,
  calculateWeightDose,
  calculateDefinedInfusionRate,
  calculateDefinedVolumeRate,
  calculatePrescriptionInfusionRate,
  formatCalculatorNumber,
  formatCalculatorUnit,
} from '../lib/calculators.ts'
import { drugs } from '../data/drugs.ts'
import { drugCalculatorsByDrugId } from '../data/drugCalculators.ts'
import { infusionConversionUnits } from '../data/infusionConversions.ts'

describe('prescribed continuous infusion conversion', () => {
  const conversions = drugs.flatMap(d => (d.calculators ?? []).filter(c => c.kind === 'infusion-conversion').map(c => [d.id, c]))
  // Synthetic arithmetic examples only: these are not drug dose/preparation recommendations.
  const fixtures = {
    'mg/kg/h': [0.5, 500, 'mg', 50, 3.5],
    'mcg/kg/h': [1, 1000, 'mcg', 50, 3.5],
    'mcg/kg/min': [0.1, 2, 'mg', 50, 10.5],
    'mg/h': [2, 50, 'mg', 50, 2],
    'units/kg/h': [18, 25000, 'units', 50, 2.52],
    'mcg/min': [30, 10, 'mg', 50, 9],
    'mg/min': [2, 100, 'mg', 100, 120],
    'mcg/h': [50, 1, 'mg', 50, 2.5],
    'units/h': [1000000, 20000000, 'units', 100, 5],
  }
  it('exposes every explicitly scoped conversion, with no orphan, clinical default or validation claim', () => {
    assert.equal(conversions.length, 30)
    assert.deepEqual(conversions.map(([id]) => id).sort(), Object.keys(infusionConversionUnits).sort())
    assert.equal(new Set(conversions.map(([, c]) => c.id)).size, 30)
    for (const [id, definition] of conversions) {
      const drug = drugs.find(d => d.id === id)
      assert.notEqual(drug.validationStatus, 'catalog-only')
      for (const key of ['defaultDoseRate', 'preparation', 'minimumDoseRate', 'maximumDoseRate', 'validationStatus']) assert.equal(key in definition, false)
      assert.ok(definition.sourceIds.every(sourceId => drug.references.some(r => r.id === sourceId && r.url)))
    }
  })
  for (const [id, definition] of conversions) it(`${id}: all selectable units match independent expected pump rates`, () => {
    for (const doseRateUnit of definition.doseRateUnits) {
      assert.ok(fixtures[doseRateUnit], `missing fixture ${doseRateUnit}`)
      const [doseRate, preparationAmount, preparationAmountUnit, preparationVolumeMl, expected] = fixtures[doseRateUnit]
      const actual = calculatePrescriptionInfusionRate(definition, { doseRate, doseRateUnit, weightKg: 70, preparationAmount, preparationAmountUnit, preparationVolumeMl })
      assert.ok(Math.abs(actual - expected) < 1e-10, `${id} ${doseRateUnit}: ${actual} != ${expected}`)
    }
  })
  const ketamine = conversions.find(([id]) => id === 'cetamina')[1]
  const input = { doseRate: 0.5, doseRateUnit: 'mg/kg/h', weightKg: 70, preparationAmount: 500, preparationAmountUnit: 'mg', preparationVolumeMl: 50 }
  it('ketamine: 70 kg at 0.5 mg/kg/h, 500 mg in final 50 mL gives 3.5 mL/h', () => {
    assert.equal(calculatePrescriptionInfusionRate(ketamine, input), 3.5)
    assert.equal(calculatePrescriptionInfusionRate(ketamine, { ...input, preparationAmount: 0.5, preparationAmountUnit: 'g' }), 3.5)
    assert.equal(calculatePrescriptionInfusionRate(ketamine, { ...input, preparationAmount: 500000, preparationAmountUnit: 'mcg' }), 3.5)
  })
  it('refuses unsupported units, missing/invalid required values and overflow', () => {
    for (const doseRateUnit of ['units/kg/h', 'mg/kg/s', undefined]) assert.throws(() => calculatePrescriptionInfusionRate(ketamine, { ...input, doseRateUnit }))
    for (const preparationAmountUnit of ['units', 'mEq', 'ml']) assert.throws(() => calculatePrescriptionInfusionRate(ketamine, { ...input, preparationAmountUnit }))
    for (const key of ['doseRate', 'weightKg', 'preparationAmount', 'preparationVolumeMl']) {
      for (const value of [0, -1, NaN, Infinity, undefined]) assert.throws(() => calculatePrescriptionInfusionRate(ketamine, { ...input, [key]: value }))
    }
    assert.throws(() => calculatePrescriptionInfusionRate(ketamine, { ...input, weightKg: 401 }))
    assert.throws(() => calculatePrescriptionInfusionRate(ketamine, { ...input, doseRate: Number.MAX_VALUE }))
  })
  it('absolute hourly dosing does not require or silently apply a weight', () => {
    assert.equal(calculatePrescriptionInfusionRate(ketamine, { ...input, doseRate: 35, doseRateUnit: 'mg/h', weightKg: undefined }), 3.5)
    assert.equal(calculatePrescriptionInfusionRate(ketamine, { ...input, doseRate: 35, doseRateUnit: 'mg/h', weightKg: 100 }), 3.5)
  })
  it('unit-based heparin cannot be prepared as mass and mcg/h is not mcg/min', () => {
    const heparin = conversions.find(([id]) => id === 'heparina-nao-fraccionada')[1]
    assert.throws(() => calculatePrescriptionInfusionRate(heparin, { ...input, doseRateUnit: 'units/kg/h' }))
    assert.equal(calculateInfusionRate({ ...input, doseRate: 50, doseRateUnit: 'mcg/h', preparationAmount: 1 }), 2.5)
    assert.equal(calculateInfusionRate({ ...input, doseRate: 50, doseRateUnit: 'mcg/min', preparationAmount: 1 }), 150)
  })
})

describe('weight dose calculator', () => {
  it('calculates a dose and its concentrate volume', () => {
    const result = calculateWeightDose(70, 10, undefined, 25)
    assert.equal(result.finalDose, 700)
    assert.equal(result.volumeMl, 28)
    assert.equal(result.capped, false)
  })

  it('applies an explicit maximum dose', () => {
    const result = calculateWeightDose(80, 60, 4500, 100)
    assert.equal(result.calculatedDose, 4800)
    assert.equal(result.finalDose, 4500)
    assert.equal(result.volumeMl, 45)
    assert.equal(result.capped, true)
  })

  it('applies regulatory caps used by alteplase and acetylcysteine', () => {
    const alteplase = calculateWeightDose(120, 0.9, 90)
    assert.equal(alteplase.calculatedDose, 108)
    assert.equal(alteplase.finalDose, 90)
    assert.equal(alteplase.capped, true)

    const acetylcysteine = calculateWeightDose(120, 150, 15000, 200)
    assert.equal(acetylcysteine.calculatedDose, 18000)
    assert.equal(acetylcysteine.finalDose, 15000)
    assert.equal(acetylcysteine.volumeMl, 75)
  })
})

describe('infusion rate calculator', () => {
  it('converts angiotensin II ng/kg/min to mL/h', () => {
    const rate = calculateInfusionRate({
      doseRate: 20,
      doseRateUnit: 'ng/kg/min',
      weightKg: 70,
      preparationAmount: 2.5,
      preparationAmountUnit: 'mg',
      preparationVolumeMl: 250,
    })
    assert.equal(rate, 8.4)
  })

  it('converts the new source-backed continuous infusions', () => {
    const cases = [
      {
        input: { doseRate: 3, doseRateUnit: 'mcg/kg/min', weightKg: 70, preparationAmount: 20, preparationAmountUnit: 'mg', preparationVolumeMl: 50 },
        expected: 31.5,
      },
      {
        input: { doseRate: 5, doseRateUnit: 'mcg/kg/min', weightKg: 70, preparationAmount: 200, preparationAmountUnit: 'mg', preparationVolumeMl: 250 },
        expected: 26.25,
      },
      {
        input: { doseRate: 0.5, doseRateUnit: 'mcg/kg/min', weightKg: 70, preparationAmount: 50, preparationAmountUnit: 'mg', preparationVolumeMl: 250 },
        expected: 10.5,
      },
      {
        input: { doseRate: 50, doseRateUnit: 'mcg/kg/min', weightKg: 70, preparationAmount: 2500, preparationAmountUnit: 'mg', preparationVolumeMl: 250 },
        expected: 21,
      },
      {
        input: { doseRate: 0.1, doseRateUnit: 'units/kg/h', weightKg: 70, preparationAmount: 100, preparationAmountUnit: 'units', preparationVolumeMl: 100 },
        expected: 7,
      },
    ]

    for (const testCase of cases) {
      assert.equal(calculateInfusionRate(testCase.input), testCase.expected)
    }
  })

  it('converts propofol mcg/kg/min to mL/h', () => {
    const rate = calculateInfusionRate({
      doseRate: 5,
      doseRateUnit: 'mcg/kg/min',
      weightKg: 70,
      preparationAmount: 1000,
      preparationAmountUnit: 'mg',
      preparationVolumeMl: 100,
    })
    assert.equal(rate, 2.1)
  })

  it('converts norepinephrine mcg/min to mL/h', () => {
    const rate = calculateInfusionRate({
      doseRate: 8,
      doseRateUnit: 'mcg/min',
      preparationAmount: 4,
      preparationAmountUnit: 'mg',
      preparationVolumeMl: 1000,
    })
    assert.equal(rate, 120)
  })

  it('converts amiodarone mg/min to mL/h', () => {
    const rate = calculateInfusionRate({
      doseRate: 1,
      doseRateUnit: 'mg/min',
      preparationAmount: 900,
      preparationAmountUnit: 'mg',
      preparationVolumeMl: 500,
    })
    assert.ok(Math.abs(rate - 33.3333333333) < 1e-9)
  })

  it('converts weight-based mg/h and electrolyte rates', () => {
    assert.equal(calculateInfusionRate({
      doseRate: 0.3,
      doseRateUnit: 'mg/kg/h',
      weightKg: 70,
      preparationAmount: 50,
      preparationAmountUnit: 'mg',
      preparationVolumeMl: 5,
    }), 2.1)

    assert.equal(calculateInfusionRate({
      doseRate: 10,
      doseRateUnit: 'mEq/h',
      preparationAmount: 40,
      preparationAmountUnit: 'mEq',
      preparationVolumeMl: 1000,
    }), 250)
  })

  it('converts mcg/kg/h and units/min regimens', () => {
    assert.equal(calculateInfusionRate({
      doseRate: 0.7,
      doseRateUnit: 'mcg/kg/h',
      weightKg: 70,
      preparationAmount: 200,
      preparationAmountUnit: 'mcg',
      preparationVolumeMl: 50,
    }), 12.25)

    const vasopressinRate = calculateInfusionRate({
      doseRate: 0.01,
      doseRateUnit: 'units/min',
      preparationAmount: 40,
      preparationAmountUnit: 'units',
      preparationVolumeMl: 100,
    })
    assert.ok(Math.abs(vasopressinRate - 1.5) < Number.EPSILON * 4)
  })

  it('rejects incompatible units and missing positive values', () => {
    assert.throws(() => calculateInfusionRate({
      doseRate: 10,
      doseRateUnit: 'mEq/h',
      preparationAmount: 40,
      preparationAmountUnit: 'mg',
      preparationVolumeMl: 100,
    }), /não é compatível/)

    assert.throws(() => calculateWeightDose(0, 10), /superior a zero/)
  })
})

describe('volume and time calculator', () => {
  it('converts a final volume and duration to mL/h', () => {
    assert.equal(calculateVolumeRate(100, 30), 200)
    assert.equal(calculateVolumeRate(100, 60), 100)
  })
})

describe('actual calculator definitions', () => {
  const definitions = drugs.flatMap(drug => drug.calculators ?? []).filter(c => c.kind !== 'infusion-conversion')
  const byId = new Map(definitions.map(definition => [definition.id, definition]))
  // Independently specified expected results for the published defaults at 70 kg.
  const weightFixtures = {
    'acyclovir-weight-dose': 700, 'levetiracetam-loading-dose': 4200,
    'rocuronium-intubation-dose': 70, 'enoxaparin-treatment-dose': 70,
    'fomepizole-weight-dose': 1050, 'vancomycin-loading-dose': 1750,
    'amikacin-extended-interval-dose': 1050, 'gentamicin-extended-interval-dose': 350,
    'tobramycin-extended-interval-dose': 350, 'daptomycin-labelled-dose': 420,
    'ganciclovir-adult-dose': 350, 'foscarnet-labelled-dose': 6300,
    'voriconazole-iv-dose': 420, 'ambisome-weight-dose': 210,
    'alteplase-ischemic-stroke-dose': 63, 'dantrolene-mh-dose': 175,
    'sugammadex-reversal-dose': 140, 'acetylcysteine-three-bag-dose': 10500,
    'cisatracurium-intubation-dose': 10.5, 'esmolol-loading-dose': 35000,
  }
  const infusionFixtures = {
    'epinephrine-septic-shock-infusion': 13.125, 'dexmedetomidine-icu-infusion': 12.25,
    'dobutamine-infusion': 4.2, 'vasopressin-septic-shock-infusion': 1.5,
    'propofol-icu-infusion': 2.1, 'rocuronium-infusion': 4.2,
    'norepinephrine-infusion': 120, 'amiodarone-slow-load': 100 / 3,
    'furosemide-infusion': 240, 'potassium-infusion': 250,
    'pantoprazole-continuous-infusion': 10, 'hydrocortisone-septic-shock-infusion': 2.08333325,
    'cisatracurium-continuous-infusion': 31.5, 'dopamine-continuous-infusion': 26.25,
    'milrinone-continuous-infusion': 10.5, 'esmolol-continuous-infusion': 21,
    'angiotensin-ii-infusion': 8.4, 'regular-insulin-hyperglycemic-crisis-infusion': 7,
  }
  const volumeFixtures = { 'meropenem-volume-time': 200, 'acyclovir-volume-time': 100,
    'levetiracetam-volume-time': 400, 'fomepizole-volume-time': 200, 'ganciclovir-volume-time': 100 }
  const preparations = { 'furosemide-infusion': [100, 100],
    'hydrocortisone-septic-shock-infusion': [200, 50], 'regular-insulin-hyperglycemic-crisis-infusion': [100, 100] }
  const input = definition => ({ doseRate: definition.defaultDoseRate, doseRateUnit: definition.doseRateUnit,
    weightKg: 70, preparationAmount: preparations[definition.id]?.[0] ?? definition.preparation.amount,
    preparationAmountUnit: definition.preparation.amountUnit,
    preparationVolumeMl: preparations[definition.id]?.[1] ?? definition.preparation.volumeMl })

  it('covers every effective definition and detects orphaned definitions', () => {
    assert.equal(definitions.length, 43)
    assert.equal(byId.size, 43)
    assert.deepEqual([...byId.keys()].sort(), Object.keys({ ...weightFixtures, ...infusionFixtures, ...volumeFixtures }).sort())
    assert.deepEqual(Object.values(drugCalculatorsByDrugId).flat().map(d => d.id).sort(), [...byId.keys()].sort())
  })
  for (const [id, expected] of Object.entries(weightFixtures)) it(`real definition ${id}`, () => {
    const definition = byId.get(id)
    const option = definition.options.find(o => o.id === definition.defaultOptionId)
    assert.ok(option)
    assert.equal(calculateWeightDose(70, option.dosePerKg, option.maxDose, definition.concentration?.value).finalDose, expected)
    for (const candidate of definition.options) {
      if (definition.concentration) assert.equal(definition.concentration.amountUnit, candidate.amountUnit)
      assert.ok(Number.isFinite(candidate.dosePerKg) && candidate.dosePerKg > 0)
      if (candidate.maxDose) assert.ok(calculateWeightDose(400, candidate.dosePerKg, candidate.maxDose).finalDose <= candidate.maxDose)
    }
  })
  for (const [id, expected] of Object.entries(infusionFixtures)) it(`real definition ${id}`, () => {
    const definition = byId.get(id)
    assert.ok(Math.abs(calculateDefinedInfusionRate(definition, input(definition)) - expected) < 1e-8)
    if (definition.maximumDoseRate !== undefined) assert.throws(() => calculateDefinedInfusionRate(definition, { ...input(definition), doseRate: definition.maximumDoseRate + 0.001 }), /limite/)
    if (definition.preparation.amount === 0) assert.throws(() => calculateDefinedInfusionRate(definition, { ...input(definition), preparationAmount: 0 }))
  })
  for (const [id, expected] of Object.entries(volumeFixtures)) it(`real definition ${id}`, () => {
    const definition = byId.get(id)
    assert.equal(calculateDefinedVolumeRate(definition, definition.defaultVolumeMl, definition.defaultDurationMinutes), expected)
    assert.throws(() => calculateDefinedVolumeRate(definition, 100, definition.minimumDurationMinutes - 1), /mínimo/)
  })
  it('uses actual regulatory dose caps at obesity boundary fixtures', () => {
    for (const [id, optionId, expected] of [ ['alteplase-ischemic-stroke-dose', 'stroke-09', 90],
      ['levetiracetam-loading-dose', 'status-load', 4500], ['acetylcysteine-three-bag-dose', 'bag-1', 15000],
      ['acetylcysteine-three-bag-dose', 'bag-2', 5000], ['acetylcysteine-three-bag-dose', 'bag-3', 10000],
      ['vancomycin-loading-dose', 'critical-30', 3000] ]) {
      const option = byId.get(id).options.find(candidate => candidate.id === optionId)
      assert.equal(calculateWeightDose(120, option.dosePerKg, option.maxDose).finalDose, expected)
    }
    assert.equal(byId.get('angiotensin-ii-infusion').maximumDoseRate, 40)
  })
})

describe('finite arithmetic and presentation', () => {
  it('rejects overflow, underflow, unsupported units and weights outside the displayed range', () => {
    for (const weight of [0.1, 401, Infinity, NaN]) assert.throws(() => calculateWeightDose(weight, 10))
    assert.throws(() => calculateWeightDose(400, Number.MAX_VALUE))
    assert.throws(() => calculateWeightDose(70, 10, undefined, Number.MIN_VALUE))
    assert.throws(() => calculateVolumeRate(Number.MAX_VALUE, 0.001))
    for (const doseRateUnit of ['mg/kg/s', null, 'mcg/kg/day']) assert.throws(() => calculateInfusionRate({ doseRate: 1, doseRateUnit, weightKg: 70, preparationAmount: 1, preparationAmountUnit: 'mg', preparationVolumeMl: 1 }))
    assert.throws(() => calculateInfusionRate({ doseRate: 1, doseRateUnit: 'mg/h', preparationAmount: 1, preparationAmountUnit: 'ml', preparationVolumeMl: 1 }))
  })
  it('never formats a small positive dose as zero and respects the chosen language', () => {
    assert.equal(formatCalculatorNumber(0.000001, 'en'), '0.000001')
    assert.equal(formatCalculatorNumber(Infinity), '—')
    assert.equal(formatCalculatorNumber(1.25, 'pt'), '1,25')
    assert.equal(formatCalculatorUnit('units/kg/h', 'en'), 'units/kg/h')
    assert.equal(formatCalculatorUnit('units/kg/h', 'es'), 'unidades/kg/h')
  })
})
