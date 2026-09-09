import fs from 'node:fs';
import { drugs } from '../src/data/drugs.ts';
const reviewedPrimary = new Set(['insulina-regular', 'sugamadex', 'angiotensina-ii', 'fosfato-de-sodio', 'fosfato-de-potassio']);
const generic = url => !url || /(?:uptodate\.com\/?$|sanfordguide\.com\/?$|INFOMED-fo\/?$|clinicalkey\.com\/?$)/i.test(url);
const records = drugs.map(drug => ({
  id: drug.id, name: drug.name, priority: drug.priority, validationStatus: drug.validationStatus,
  calculators: (drug.calculators ?? []).map(c => c.id), references: drug.references.length,
  genericOrMissingLinks: drug.references.filter(ref => generic(ref.url)).map(ref => ref.id),
  reviewScope: reviewedPrimary.has(drug.id) ? 'structural; targeted primary-source review (see report for scope)'
    : (drug.calculators?.length ?? 0) > 0 ? 'structural; all calculator definitions and numerical fixtures'
    : 'structural; bibliography mapping; no complete primary-source clinical revalidation',
}));
fs.mkdirSync('docs', { recursive: true });
fs.writeFileSync('docs/review-inventory-2026-09-09.json', JSON.stringify({ date: '2026-09-09',
  note: 'Structural coverage is not independent clinical validation. Historical validation categories were preserved.',
  counts: { catalog: drugs.length, monographs: records.filter(r => r.validationStatus !== 'catalog-only').length,
    calculators: records.reduce((sum, r) => sum + r.calculators.length, 0),
    monographsWithGenericOrMissingReferenceLinks: records.filter(r => r.references > 0 && r.genericOrMissingLinks.length > 0).length }, records }, null, 2) + '\n');
console.log(JSON.stringify({ records: records.length, monographsWithGenericOrMissingReferenceLinks: records.filter(r => r.references > 0 && r.genericOrMissingLinks.length > 0).length }));
