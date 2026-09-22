// Second independent review, 2026-09-09.
// The infusion rate is recomputed here from dimensional analysis written from
// scratch, so a wrong conversion factor in the engine cannot be confirmed by a
// test that reuses the engine's own unit table.
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { calculateDefinedInfusionRate, calculateInfusionRate } from '../lib/calculators.ts'
import { drugCalculatorsByDrugId } from '../data/drugCalculators.ts'
import { uiTranslations } from '../i18n/translations.ts'
import { drugs } from '../data/drugs.ts'
import { localizeDrug } from '../i18n/localize.ts'
import en from '../i18n/generated/en.json' with { type: 'json' }
import es from '../i18n/generated/es.json' with { type: 'json' }

const TEST_WEIGHT_KG = 70

// Amount of drug, per hour, expressed in the unit the preparation is written in.
// Written directly from each unit's name rather than copied from the engine.
const DOSE_PER_HOUR = {
  'ng/kg/min': (d, kg) => (d * kg * 60) / 1e6,      // ng -> mg
  'mcg/kg/min': (d, kg) => (d * kg * 60) / 1000,    // mcg -> mg
  'mcg/kg/h': (d, kg) => (d * kg) / 1000,
  'mcg/min': (d) => (d * 60) / 1000,
  'mg/kg/h': (d, kg) => d * kg,
  'mg/h': (d) => d,
  'mg/min': (d) => d * 60,
  'mEq/h': (d) => d,
  'units/h': (d) => d,
  'units/min': (d) => d * 60,
  'units/kg/h': (d, kg) => d * kg,
}

// Preparation amount converted to the same unit family, in milligrams for mass.
const AMOUNT_IN_MG = { g: 1000, mg: 1, mcg: 1 / 1000, mEq: 1, units: 1 }

const infusionCalculators = Object.entries(drugCalculatorsByDrugId).flatMap(
  ([drugId, list]) => list.filter((c) => c.kind === 'infusion-rate').map((c) => [drugId, c]),
)

describe('second review: infusion calculators', () => {
  it('covers every infusion calculator in the catalogue', () => {
    assert.ok(infusionCalculators.length >= 14, `only ${infusionCalculators.length} infusion calculators found`)
  })

  for (const [drugId, definition] of infusionCalculators) {
    it(`${drugId}: rate matches an independently derived conversion`, () => {
      const convert = DOSE_PER_HOUR[definition.doseRateUnit]
      assert.ok(convert, `unhandled dose unit ${definition.doseRateUnit}`)
      // Synthetic user-entered preparation for the three deliberately blank defaults.
      // These are arithmetic fixtures, not suggested clinical preparations.
      const amount = definition.preparation.amount > 0 ? definition.preparation.amount : 10
      const volumeMl = definition.preparation.volumeMl > 0 ? definition.preparation.volumeMl : 50
      const { amountUnit } = definition.preparation

      const dose = definition.defaultDoseRate
      const amountPerHour = convert(dose, TEST_WEIGHT_KG)
      const concentrationPerMl = (amount * AMOUNT_IN_MG[amountUnit]) / volumeMl
      const expected = amountPerHour / concentrationPerMl

      const actual = calculateDefinedInfusionRate(definition, {
        doseRate: dose,
        doseRateUnit: definition.doseRateUnit,
        weightKg: TEST_WEIGHT_KG,
        preparationAmount: amount,
        preparationAmountUnit: amountUnit,
        preparationVolumeMl: volumeMl,
      })
      assert.ok(Math.abs(actual - expected) < 1e-9 * Math.max(1, expected),
        `${drugId}: expected ${expected} mL/h, engine returned ${actual}`)
    })

    it(`${drugId}: the default dose sits inside its own documented limits`, () => {
      const { defaultDoseRate, minimumDoseRate, maximumDoseRate } = definition
      assert.ok(defaultDoseRate > 0, `${drugId}: default dose is not positive`)
      if (minimumDoseRate !== undefined) {
        assert.ok(defaultDoseRate >= minimumDoseRate, `${drugId}: default below its minimum`)
      }
      if (maximumDoseRate !== undefined) {
        assert.ok(defaultDoseRate <= maximumDoseRate, `${drugId}: default above its maximum`)
        assert.throws(
          () => calculateDefinedInfusionRate(definition, {
            doseRate: maximumDoseRate * 1.01,
            doseRateUnit: definition.doseRateUnit,
            weightKg: TEST_WEIGHT_KG,
            preparationAmount: definition.preparation.amount || 1,
            preparationAmountUnit: definition.preparation.amountUnit,
            preparationVolumeMl: definition.preparation.volumeMl || 50,
          }),
          /limite/,
          `${drugId}: a dose above the documented maximum was not refused`,
        )
      }
    })
  }

  it('refuses a preparation whose unit family differs from the dose', () => {
    assert.throws(() => calculateInfusionRate({
      doseRate: 5, doseRateUnit: 'mcg/kg/min', weightKg: 70,
      preparationAmount: 40, preparationAmountUnit: 'units', preparationVolumeMl: 100,
    }), /compat/)
    assert.throws(() => calculateInfusionRate({
      doseRate: 10, doseRateUnit: 'mEq/h',
      preparationAmount: 250, preparationAmountUnit: 'mg', preparationVolumeMl: 50,
    }), /compat/)
  })

  it('refuses a weight-based dose with no weight', () => {
    assert.throws(() => calculateInfusionRate({
      doseRate: 5, doseRateUnit: 'mcg/kg/min',
      preparationAmount: 250, preparationAmountUnit: 'mg', preparationVolumeMl: 50,
    }), /peso/)
  })
})

describe('second review: calculator prompts', () => {
  it('a calculator without a weight field never asks for a weight', () => {
    const weightFree = infusionCalculators.filter(([, c]) => !c.doseRateUnit.includes('/kg/'))
    assert.ok(weightFree.length > 0, 'no weight-free infusion calculator in the catalogue')
    for (const language of ['pt', 'en', 'es']) {
      const ui = uiTranslations[language]
      assert.equal(typeof ui.infusionPlaceholderNoWeight, 'string')
      assert.ok(ui.infusionPlaceholderNoWeight.trim().length > 0, `${language}: empty prompt`)
      assert.ok(!/peso|weight|kg/i.test(ui.infusionPlaceholderNoWeight),
        `${language}: the weight-free prompt still mentions a weight`)
      assert.ok(/peso|weight/i.test(ui.infusionPlaceholder),
        `${language}: the weight prompt should mention the weight`)
    }
  })
})

describe('paracetamol IV: weight-specific dosing retained in every language', () => {
  const original = drugs.find(drug => drug.id === 'paracetamol')
  for (const [language, map] of [['pt', {}], ['en', en], ['es', es]]) {
    it(`${language}: separates per-dose and daily limits at 50 kg and hepatic risk`, () => {
      const drug = localizeDrug(original, map)
      const lowWeight = drug.usualAdultDose.find(item => item.context.includes('≤50 kg'))
      assert.ok(lowWeight, '50 kg must remain within the weight-based group')
      assert.match(lowWeight.context, />33 kg/)
      assert.match(lowWeight.recommendation, /15 mg\/kg/)
      assert.match(lowWeight.recommendation, /60 mg\/kg/)
      assert.match(lowWeight.recommendation, /3 g/)
      const fixed = drug.usualAdultDose.filter(item => item.context.includes('>50 kg'))
      assert.equal(fixed.length, 2, 'separate fixed-dose groups with and without hepatic risk')
      assert.match(fixed[0].recommendation, /4 g\//)
      assert.match(fixed[1].recommendation, /3 g\//)
      assert.match(drug.prescriptionExamples[0].prescription, />50 kg/)
      assert.match(drug.prescriptionExamples[0].prescription, /15 min/)
      assert.match(drug.prescriptionExamples[0].context, /15 mg\/kg/)
      assert.match(drug.practicalNotes.join(' '), /≤33 kg/)
    })
  }
  it('uses the exact SmPC renal interval bands, including <10 mL/min', () => {
    const rows = original.renalAdjustment.byKidneyFunction
    assert.equal(rows.length, 3)
    assert.deepEqual(rows.map(item => item.context), ['ClCr ≥50 mL/min', 'ClCr 10–<50 mL/min', 'ClCr <10 mL/min'])
    assert.deepEqual(rows.map(item => item.recommendation.match(/\d+/)[0]), ['4', '6', '8'])
  })
  it('traces the corrected dosing to the regulator without claiming full validation', () => {
    const reference = original.references.find(item => item.id === 'paracetamolHpra2025')
    assert.match(reference.url, /assets\.hpra\.ie\/products\/Human\/23043\/Licence_PA1968-021-001_06032025152236\.pdf$/)
    assert.ok([...original.usualAdultDose, ...original.renalAdjustment.byKidneyFunction, ...original.hepaticAdjustment.bySeverity].every(item => item.sourceIds.includes(reference.id)))
    assert.equal(original.validationStatus, 'source-linked')
    assert.equal(original.calculators.length, 0)
  })
})
