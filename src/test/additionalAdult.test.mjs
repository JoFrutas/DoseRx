import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { drugs } from '../data/drugs.ts'
import { additionalAdultDrugs } from '../data/additionalAdultDrugs.ts'
import { localizeDrug } from '../i18n/localize.ts'
import en from '../i18n/generated/en.json' with { type: 'json' }
import es from '../i18n/generated/es.json' with { type: 'json' }

// Independently specified anchors guard against route/component/interval regressions.
const constraints = {
  fidaxomicina: [/200 mg/, /1–5/, /7/, /25/, /fulminant/],
  'vancomicina-oral-enterica': [/125 mg/, /10/, /sistém|systemic/],
  idarucizumab: [/5 g/, /2[,.]5 g\/50 mL/, /5–10 min/, /24 h/, /dabigatr/],
  claritromicina: [/500 mg/, /60 min/, /<30 mL\/min/, /50%/, /colchicin/],
  eritromicina: [/25 mg\/kg\//, /50 mg\/kg\//, /≤5 mg\/mL/, /20–60 min/, /8 h/],
  rifampicina: [/600 mg/, /2–3 h/, /600–1200 mg\//, /8 mg\/kg\//],
  'artesunato-intravenoso': [/2[,.]4 mg\/kg/, /0, 12/, /24 h/, /48 h/, /1–2 min/, /10 mg\/mL/, /1[,.]5 h/],
  clevidipina: [/0[,.]5 mg\/mL/, /2 mg\/h/, /4 mL\/h/, /32 mg\/h/, /1000 mL/, /72 h/, /8 h/, /12 h/],
  metamizol: [/>53 kg/, /500 mg\/mL/, /500–1000 mg/, /4000 mg\//, /5000 mg\//, /500 mg\/min/, /1 mL\/min/, /agranuloci|agranulocy/],
  'vitamina-k': [/10 mg\/mL/, /5–10 mg/, /30/, /3 h/, /40 mg/, /24 h/, /protromb|prothromb/],
  'ampicilina-sulbactam': [/1[,.]5–3 g/, /2 g/, /1 g/, /4 g\//, /15–30 min/, /15–29/, /5–14/],
  cefoxitina: [/1–2 g/, /12 g\//, /3–5 min/, /30–50 mL\/min/, /10–29 mL\/min/, /5–9 mL\/min/, /<5 mL\/min/],
}
describe('additional adult monographs', () => {
  it('adds twelve distinct source-linked records without evidence promotion or clinical defaults', () => {
    assert.deepEqual(additionalAdultDrugs.map(d=>d.id).sort(), Object.keys(constraints).sort())
    assert.equal(new Set(drugs.map(d=>d.id)).size, 552)
    for (const original of additionalAdultDrugs) {
      const d=drugs.find(d=>d.id===original.id)
      assert.equal(d.validationStatus,'source-linked')
      assert.equal(d.confidence,'low')
      assert.equal(d.verification,undefined)
      assert.ok(d.calculators.every(c=>c.kind==='infusion-conversion'))
      assert.match(d.references[0].url,/^https:\/\/(www\.medicines\.org\.uk|cima\.aemps\.es|dailymed\.nlm\.nih\.gov)\//)
      for (const row of [...d.usualAdultDose,...d.renalAdjustment.byKidneyFunction]) {
        assert.deepEqual(row.sourceIds,[d.references[0].id])
        assert.equal(row.validationStatus,'source-linked')
      }
    }
  })
  for (const [language,map] of [['pt',{}],['en',en],['es',es]]) {
    for (const [id,patterns] of Object.entries(constraints)) {
      it(`${language}: ${id} retains critical route, dose and formulation information`,()=>{
        const d=localizeDrug(drugs.find(d=>d.id===id),map)
        for (const pattern of patterns) assert.match(JSON.stringify(d),pattern)
      })
    }
  }
  it('keeps oral vancomycin separate from systemic administration and infusion tools',()=>{
    const oral=drugs.find(d=>d.id==='vancomicina-oral-enterica')
    assert.deepEqual(oral.routes,['Oral'])
    assert.equal(oral.calculators.length,0)
    assert.match(oral.usualAdultDose[0].recommendation,/125 mg de 6\/6h durante 10 dias/)
    assert.match(oral.practicalNotes.join(' '),/nunca.*IV/)
  })
  it('keeps ampicillin/sulbactam dose as combination total and distinct renal intervals',()=>{
    const d=drugs.find(d=>d.id==='ampicilina-sulbactam')
    assert.match(d.usualAdultDose[0].recommendation,/3 g = ampicilina 2 g \+ sulbactam 1 g/)
    assert.match(d.renalAdjustment.byKidneyFunction[1].recommendation,/12\/12h/)
    assert.match(d.renalAdjustment.byKidneyFunction[2].recommendation,/24\/24h/)
  })
  it('makes clevidipine conversion available without preset clinical values',()=>{
    const calculators=drugs.find(d=>d.id==='clevidipina').calculators
    assert.equal(calculators.length,1)
    assert.deepEqual(calculators[0].doseRateUnits,['mg/h'])
    for (const key of ['defaultDose','defaultWeight','defaultAmount','defaultVolume','validationStatus']) assert.equal(calculators[0][key],undefined)
  })
})
