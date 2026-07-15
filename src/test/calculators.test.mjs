import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  calculateInfusionRate,
  calculateVolumeRate,
  calculateWeightDose,
} from '../lib/calculators.ts'

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
})

describe('infusion rate calculator', () => {
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
