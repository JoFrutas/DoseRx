export type Language = 'pt' | 'en' | 'es'

export const languageOptions: ReadonlyArray<{
  code: Language
  flag: string
  label: string
  region: string
}> = [
  { code: 'pt', flag: '🇵🇹', label: 'Português', region: 'Portugal / Brasil' },
  { code: 'en', flag: '🇬🇧', label: 'English', region: 'United Kingdom / USA' },
  { code: 'es', flag: '🇪🇸', label: 'Español', region: 'España / Latinoamérica' },
]

export interface UiStrings {
  chooseLanguage: string
  languageSelectorLabel: string
  brandSubtitle: string
  homeAria: string
  availableRecords: string
  footerSafety: string
  searchLabel: string
  searchPlaceholder: string
  clearSearch: string
  searchHint: string
  heroEyebrow: string
  heroTitleFirst: string
  heroTitleSecond: string
  heroDescription: string
  results: string
  drugFound: string
  drugsFound: string
  viewCategories: string
  noResults: string
  noResultsHint: string
  catalogEyebrow: string
  exploreByCategory: string
  consensusCount: string
  verifiedCount: string
  linkedCount: string
  catalogOnlyCount: string
  records: string
  structuralRecord: string
  structuralRecords: string
  home: string
  back: string
  drugsInCategory: string
  scopeSummary: string
  summary: string
  lastReview: string
  priority: string
  subcategories: string
  references: string
  aliases: string
  routes: string
  reviewNotes: string
  sourcesCompared: string
  scope: string
  calculatorsTitle: string
  calculatorsEyebrow: string
  calculatorsIntro: string
  indicationsTitle: string
  indicationsEyebrow: string
  doseTitle: string
  doseEyebrow: string
  prescribeTitle: string
  prescribeEyebrow: string
  loadingDoseTitle: string
  loadingDoseEyebrow: string
  renalTitle: string
  renalEyebrow: string
  intermittentHd: string
  continuousKrt: string
  hepaticTitle: string
  hepaticEyebrow: string
  monitoringTitle: string
  monitoringEyebrow: string
  safetyTitle: string
  safetyEyebrow: string
  contraindications: string
  interactions: string
  practicalTitle: string
  practicalEyebrow: string
  bibliographyTitle: string
  bibliographyEyebrow: string
  openSource: string
  noSource: string
  noSourceText: string
  sources: string
  sourceLinksAria: string
  verificationNotCompared: string
  verificationConsensus: string
  verificationContext: string
  verificationConflict: string
  statusCatalogOnly: string
  statusSourceLinked: string
  statusSourceVerified: string
  statusValidated: string
  confidenceUnvalidated: string
  confidenceLow: string
  confidenceModerate: string
  confidenceHigh: string
  bannerCatalogTitle: string
  bannerCatalogMessage: string
  bannerLinkedTitle: string
  bannerLinkedMessage: string
  bannerMixedTitle: string
  bannerMixedMessage: string
  clinicalTranslationNotice: string
  infusion: string
  volumeTime: string
  weightDose: string
  dosingWeight: string
  targetDose: string
  preparationAmount: string
  finalVolume: string
  documentedRangeWarning: string
  calculatedRate: string
  preparation: string
  infusionPlaceholder: string
  duration: string
  durationMinimumWarning: string
  volumeTimePlaceholder: string
  documentedRegimen: string
  mathematicalDose: string
  maximumLimited: string
  volumeOf: string
  weightPlaceholder: string
  notFoundTitle: string
  notFoundText: string
  returnHome: string
  loadingLanguage: string
}

const pt: UiStrings = {
  chooseLanguage: 'Escolha o idioma', languageSelectorLabel: 'Mudar idioma', brandSubtitle: 'Medicina Intensiva', homeAria: 'DoseRx — página inicial',
  availableRecords: 'fichas disponíveis', footerSafety: 'Ferramenta de apoio · confirmar indicação, preparação e protocolo local',
  searchLabel: 'Pesquisar fármacos', searchPlaceholder: 'Pesquisar por fármaco, classe, indicação ou alias…', clearSearch: 'Limpar pesquisa',
  searchHint: 'Pesquise por nome, alias, classe, indicação ou categoria.', heroEyebrow: 'Consulta farmacológica em UCI',
  heroTitleFirst: 'Doses críticas.', heroTitleSecond: 'Contexto à vista.', heroDescription: 'Encontre rapidamente a estrutura de dose, prescrição, ajuste renal, ajuste hepático e notas práticas de cada fármaco.',
  results: 'Resultados', drugFound: 'fármaco encontrado', drugsFound: 'fármacos encontrados', viewCategories: 'Ver categorias', noResults: 'Sem resultados para',
  noResultsHint: 'Tente outro nome, classe, indicação, subcategoria ou alias.', catalogEyebrow: 'Catálogo de Medicina Intensiva', exploreByCategory: 'Explorar por categoria',
  consensusCount: 'com consenso multiponto', verifiedCount: 'com fontes verificadas', linkedCount: 'monografias ligadas a fontes', catalogOnlyCount: 'entradas apenas de catálogo',
  records: 'fármacos', structuralRecord: 'ficha estrutural', structuralRecords: 'fichas estruturais', home: 'Início', back: 'Voltar', drugsInCategory: 'fármacos nesta categoria',
  scopeSummary: 'Âmbito do catálogo', summary: 'Resumo da ficha', lastReview: 'Última revisão', priority: 'Prioridade', subcategories: 'Subcategorias', references: 'Referências', aliases: 'Aliases', routes: 'Vias', reviewNotes: 'Notas de revisão', sourcesCompared: 'fontes comparadas', scope: 'Âmbito',
  calculatorsTitle: 'Calculadoras documentadas', calculatorsEyebrow: 'Cálculo assistido', calculatorsIntro: 'Resultados matemáticos baseados nos parâmetros introduzidos. A calculadora não selecciona a indicação, o peso de dose, a função orgânica nem a preparação local.',
  indicationsTitle: 'Indicações comuns em UCI', indicationsEyebrow: 'Enquadramento', doseTitle: 'Dose habitual no adulto', doseEyebrow: 'Posologia', prescribeTitle: 'Como prescrever', prescribeEyebrow: 'Exemplos práticos', loadingDoseTitle: 'Dose de carga', loadingDoseEyebrow: 'Se aplicável',
  renalTitle: 'Ajuste renal', renalEyebrow: 'ClCr / eGFR', intermittentHd: 'Hemodiálise intermitente', continuousKrt: 'Técnicas contínuas de substituição renal', hepaticTitle: 'Ajuste hepático', hepaticEyebrow: 'Função hepática', monitoringTitle: 'Monitorização terapêutica', monitoringEyebrow: 'TDM e parâmetros',
  safetyTitle: 'Contraindicações e interacções', safetyEyebrow: 'Segurança', contraindications: 'Contraindicações principais', interactions: 'Interacções importantes', practicalTitle: 'Notas práticas de Medicina Intensiva', practicalEyebrow: 'À cabeceira', bibliographyTitle: 'Referências bibliográficas', bibliographyEyebrow: 'Fontes', openSource: 'Abrir fonte', noSource: 'Nenhuma fonte associada', noSourceText: 'Esta entrada é apenas catalogal e não contém recomendações para prescrição.', sources: 'Fontes:', sourceLinksAria: 'Fontes desta recomendação',
  verificationNotCompared: 'Comparação ainda não realizada', verificationConsensus: 'Consenso entre fontes', verificationContext: 'Diferença dependente do contexto', verificationConflict: 'Discrepância por resolver',
  statusCatalogOnly: 'Entrada de catálogo', statusSourceLinked: 'Monografia ligada a fontes', statusSourceVerified: 'Fontes verificadas', statusValidated: 'Consenso multiponto',
  confidenceUnvalidated: 'sem confiança clínica atribuída', confidenceLow: 'confiança baixa', confidenceModerate: 'confiança moderada', confidenceHigh: 'confiança elevada',
  bannerCatalogTitle: 'Entrada de catálogo — sem monografia', bannerCatalogMessage: 'Esta ficha permite localizar o fármaco, mas não contém uma recomendação posológica. Consulte o RCM/SmPC e o protocolo local.',
  bannerLinkedTitle: 'Monografia com referências ligadas', bannerLinkedMessage: 'Cada recomendação aponta para fontes externas, mas o conteúdo ainda não foi confirmado de forma independente contra o texto integral.',
  bannerMixedTitle: 'Catálogo com diferentes âmbitos de evidência', bannerMixedMessage: 'Consulte o selo de cada ficha: monografias verificadas, monografias apenas ligadas a fontes e entradas sem conteúdo posológico.',
  clinicalTranslationNotice: 'Tradução clínica assistida; números e unidades foram verificados automaticamente. Confirme sempre a fonte original.',
  infusion: 'Perfusão', volumeTime: 'Volume / tempo', weightDose: 'Dose por peso', dosingWeight: 'Peso de dose (kg)', targetDose: 'Dose alvo', preparationAmount: 'Quantidade na preparação', finalVolume: 'Volume final (mL)', documentedRangeWarning: 'A dose introduzida está fora do intervalo ou limite documentado nesta ficha.', calculatedRate: 'Velocidade calculada', preparation: 'Preparação', infusionPlaceholder: 'Preencha peso, dose, quantidade e volume com valores superiores a zero.', duration: 'Duração (minutos)', durationMinimumWarning: 'A duração é inferior ao mínimo documentado de', volumeTimePlaceholder: 'Introduza volume e duração superiores a zero.', documentedRegimen: 'Regime documentado', mathematicalDose: 'Dose matemática', maximumLimited: 'limitado ao máximo de', volumeOf: 'Volume de', weightPlaceholder: 'Introduza um peso válido para obter o resultado.',
  notFoundTitle: 'Página não encontrada', notFoundText: 'O endereço pode estar incompleto ou a ficha já não existir.', returnHome: 'Voltar ao início', loadingLanguage: 'A carregar o idioma…',
}

const en: UiStrings = {
  chooseLanguage: 'Choose your language', languageSelectorLabel: 'Change language', brandSubtitle: 'Intensive Care Medicine', homeAria: 'DoseRx — home page',
  availableRecords: 'records available', footerSafety: 'Decision-support tool · confirm indication, preparation and local protocol',
  searchLabel: 'Search medicines', searchPlaceholder: 'Search by medicine, class, indication or alias…', clearSearch: 'Clear search',
  searchHint: 'Search by name, alias, class, indication or category.', heroEyebrow: 'ICU pharmacology reference', heroTitleFirst: 'Critical doses.', heroTitleSecond: 'Context in view.', heroDescription: 'Quickly find dosing, prescribing, renal adjustment, hepatic adjustment and practical notes for each medicine.',
  results: 'Results', drugFound: 'medicine found', drugsFound: 'medicines found', viewCategories: 'View categories', noResults: 'No results for', noResultsHint: 'Try another name, class, indication, subcategory or alias.', catalogEyebrow: 'Intensive Care Medicine catalogue', exploreByCategory: 'Browse by category',
  consensusCount: 'with multi-source consensus', verifiedCount: 'with verified sources', linkedCount: 'source-linked monographs', catalogOnlyCount: 'catalogue-only entries', records: 'medicines', structuralRecord: 'structured record', structuralRecords: 'structured records', home: 'Home', back: 'Back', drugsInCategory: 'medicines in this category',
  scopeSummary: 'Catalogue scope', summary: 'Record summary', lastReview: 'Last review', priority: 'Priority', subcategories: 'Subcategories', references: 'References', aliases: 'Aliases', routes: 'Routes', reviewNotes: 'Review notes', sourcesCompared: 'sources compared', scope: 'Scope',
  calculatorsTitle: 'Documented calculators', calculatorsEyebrow: 'Assisted calculation', calculatorsIntro: 'Mathematical results based on the entered parameters. The calculator does not select the indication, dosing weight, organ function or local preparation.', indicationsTitle: 'Common ICU indications', indicationsEyebrow: 'Clinical context', doseTitle: 'Usual adult dose', doseEyebrow: 'Dosage', prescribeTitle: 'How to prescribe', prescribeEyebrow: 'Practical examples', loadingDoseTitle: 'Loading dose', loadingDoseEyebrow: 'When applicable',
  renalTitle: 'Renal adjustment', renalEyebrow: 'CrCl / eGFR', intermittentHd: 'Intermittent haemodialysis', continuousKrt: 'Continuous kidney replacement therapy', hepaticTitle: 'Hepatic adjustment', hepaticEyebrow: 'Liver function', monitoringTitle: 'Therapeutic monitoring', monitoringEyebrow: 'TDM and parameters', safetyTitle: 'Contraindications and interactions', safetyEyebrow: 'Safety', contraindications: 'Main contraindications', interactions: 'Important interactions', practicalTitle: 'Practical intensive care notes', practicalEyebrow: 'At the bedside', bibliographyTitle: 'Bibliographic references', bibliographyEyebrow: 'Sources', openSource: 'Open source', noSource: 'No source linked', noSourceText: 'This is a catalogue-only entry and contains no prescribing recommendations.', sources: 'Sources:', sourceLinksAria: 'Sources for this recommendation',
  verificationNotCompared: 'Comparison not yet performed', verificationConsensus: 'Consensus across sources', verificationContext: 'Context-dependent difference', verificationConflict: 'Unresolved discrepancy', statusCatalogOnly: 'Catalogue entry', statusSourceLinked: 'Source-linked monograph', statusSourceVerified: 'Sources verified', statusValidated: 'Multi-source consensus', confidenceUnvalidated: 'no clinical confidence assigned', confidenceLow: 'low confidence', confidenceModerate: 'moderate confidence', confidenceHigh: 'high confidence',
  bannerCatalogTitle: 'Catalogue entry — no monograph', bannerCatalogMessage: 'This record helps locate the medicine but contains no dosing recommendation. Consult the local SmPC/label and protocol.', bannerLinkedTitle: 'Monograph with linked references', bannerLinkedMessage: 'Each recommendation points to external sources, but the content has not yet been independently checked against the full source text.', bannerMixedTitle: 'Catalogue with different evidence scopes', bannerMixedMessage: 'Check each record badge: verified monographs, source-linked monographs and entries without dosing content.', clinicalTranslationNotice: 'Assisted clinical translation; numbers and units were checked automatically. Always confirm the original source.',
  infusion: 'Infusion', volumeTime: 'Volume / time', weightDose: 'Weight-based dose', dosingWeight: 'Dosing weight (kg)', targetDose: 'Target dose', preparationAmount: 'Amount in preparation', finalVolume: 'Final volume (mL)', documentedRangeWarning: 'The entered dose is outside the documented range or limit for this record.', calculatedRate: 'Calculated rate', preparation: 'Preparation', infusionPlaceholder: 'Enter weight, dose, amount and volume values greater than zero.', duration: 'Duration (minutes)', durationMinimumWarning: 'The duration is below the documented minimum of', volumeTimePlaceholder: 'Enter volume and duration values greater than zero.', documentedRegimen: 'Documented regimen', mathematicalDose: 'Calculated dose', maximumLimited: 'limited to a maximum of', volumeOf: 'Volume of', weightPlaceholder: 'Enter a valid weight to obtain a result.', notFoundTitle: 'Page not found', notFoundText: 'The address may be incomplete or the record may no longer exist.', returnHome: 'Return home', loadingLanguage: 'Loading language…',
}

const es: UiStrings = {
  chooseLanguage: 'Elige el idioma', languageSelectorLabel: 'Cambiar idioma', brandSubtitle: 'Medicina Intensiva', homeAria: 'DoseRx — página de inicio',
  availableRecords: 'fichas disponibles', footerSafety: 'Herramienta de apoyo · confirmar indicación, preparación y protocolo local', searchLabel: 'Buscar fármacos', searchPlaceholder: 'Buscar por fármaco, clase, indicación o alias…', clearSearch: 'Borrar búsqueda', searchHint: 'Busca por nombre, alias, clase, indicación o categoría.', heroEyebrow: 'Consulta farmacológica en UCI', heroTitleFirst: 'Dosis críticas.', heroTitleSecond: 'Contexto visible.', heroDescription: 'Encuentra rápidamente la dosis, prescripción, ajuste renal, ajuste hepático y notas prácticas de cada fármaco.',
  results: 'Resultados', drugFound: 'fármaco encontrado', drugsFound: 'fármacos encontrados', viewCategories: 'Ver categorías', noResults: 'Sin resultados para', noResultsHint: 'Prueba con otro nombre, clase, indicación, subcategoría o alias.', catalogEyebrow: 'Catálogo de Medicina Intensiva', exploreByCategory: 'Explorar por categoría', consensusCount: 'con consenso entre varias fuentes', verifiedCount: 'con fuentes verificadas', linkedCount: 'monografías vinculadas a fuentes', catalogOnlyCount: 'entradas solo de catálogo', records: 'fármacos', structuralRecord: 'ficha estructurada', structuralRecords: 'fichas estructuradas', home: 'Inicio', back: 'Volver', drugsInCategory: 'fármacos en esta categoría',
  scopeSummary: 'Ámbito del catálogo', summary: 'Resumen de la ficha', lastReview: 'Última revisión', priority: 'Prioridad', subcategories: 'Subcategorías', references: 'Referencias', aliases: 'Alias', routes: 'Vías', reviewNotes: 'Notas de revisión', sourcesCompared: 'fuentes comparadas', scope: 'Ámbito', calculatorsTitle: 'Calculadoras documentadas', calculatorsEyebrow: 'Cálculo asistido', calculatorsIntro: 'Resultados matemáticos basados en los parámetros introducidos. La calculadora no selecciona la indicación, el peso de dosificación, la función orgánica ni la preparación local.', indicationsTitle: 'Indicaciones habituales en UCI', indicationsEyebrow: 'Contexto clínico', doseTitle: 'Dosis habitual en adultos', doseEyebrow: 'Posología', prescribeTitle: 'Cómo prescribir', prescribeEyebrow: 'Ejemplos prácticos', loadingDoseTitle: 'Dosis de carga', loadingDoseEyebrow: 'Si corresponde',
  renalTitle: 'Ajuste renal', renalEyebrow: 'ClCr / eGFR', intermittentHd: 'Hemodiálisis intermitente', continuousKrt: 'Técnicas continuas de sustitución renal', hepaticTitle: 'Ajuste hepático', hepaticEyebrow: 'Función hepática', monitoringTitle: 'Monitorización terapéutica', monitoringEyebrow: 'TDM y parámetros', safetyTitle: 'Contraindicaciones e interacciones', safetyEyebrow: 'Seguridad', contraindications: 'Contraindicaciones principales', interactions: 'Interacciones importantes', practicalTitle: 'Notas prácticas de Medicina Intensiva', practicalEyebrow: 'A pie de cama', bibliographyTitle: 'Referencias bibliográficas', bibliographyEyebrow: 'Fuentes', openSource: 'Abrir fuente', noSource: 'Ninguna fuente asociada', noSourceText: 'Esta entrada es solo de catálogo y no contiene recomendaciones de prescripción.', sources: 'Fuentes:', sourceLinksAria: 'Fuentes de esta recomendación',
  verificationNotCompared: 'Comparación aún no realizada', verificationConsensus: 'Consenso entre fuentes', verificationContext: 'Diferencia dependiente del contexto', verificationConflict: 'Discrepancia sin resolver', statusCatalogOnly: 'Entrada de catálogo', statusSourceLinked: 'Monografía vinculada a fuentes', statusSourceVerified: 'Fuentes verificadas', statusValidated: 'Consenso entre varias fuentes', confidenceUnvalidated: 'sin confianza clínica asignada', confidenceLow: 'confianza baja', confidenceModerate: 'confianza moderada', confidenceHigh: 'confianza alta',
  bannerCatalogTitle: 'Entrada de catálogo — sin monografía', bannerCatalogMessage: 'Esta ficha permite localizar el fármaco, pero no contiene una recomendación posológica. Consulta la ficha técnica local y el protocolo.', bannerLinkedTitle: 'Monografía con referencias vinculadas', bannerLinkedMessage: 'Cada recomendación apunta a fuentes externas, pero el contenido todavía no se ha comprobado de forma independiente frente al texto íntegro.', bannerMixedTitle: 'Catálogo con distintos ámbitos de evidencia', bannerMixedMessage: 'Consulta el sello de cada ficha: monografías verificadas, monografías vinculadas a fuentes y entradas sin contenido posológico.', clinicalTranslationNotice: 'Traducción clínica asistida; los números y las unidades se comprobaron automáticamente. Confirma siempre la fuente original.',
  infusion: 'Perfusión', volumeTime: 'Volumen / tiempo', weightDose: 'Dosis por peso', dosingWeight: 'Peso de dosificación (kg)', targetDose: 'Dosis objetivo', preparationAmount: 'Cantidad en la preparación', finalVolume: 'Volumen final (mL)', documentedRangeWarning: 'La dosis introducida está fuera del intervalo o límite documentado en esta ficha.', calculatedRate: 'Velocidad calculada', preparation: 'Preparación', infusionPlaceholder: 'Introduce peso, dosis, cantidad y volumen con valores superiores a cero.', duration: 'Duración (minutos)', durationMinimumWarning: 'La duración es inferior al mínimo documentado de', volumeTimePlaceholder: 'Introduce un volumen y una duración superiores a cero.', documentedRegimen: 'Régimen documentado', mathematicalDose: 'Dosis calculada', maximumLimited: 'limitado a un máximo de', volumeOf: 'Volumen de', weightPlaceholder: 'Introduce un peso válido para obtener el resultado.', notFoundTitle: 'Página no encontrada', notFoundText: 'La dirección puede estar incompleta o la ficha puede haber dejado de existir.', returnHome: 'Volver al inicio', loadingLanguage: 'Cargando idioma…',
}

export const uiTranslations: Readonly<Record<Language, UiStrings>> = { pt, en, es }
