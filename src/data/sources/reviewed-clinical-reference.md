# DoseRx — Lista de referência de fármacos em Medicina Intensiva

> **AVISO CLÍNICO — LER ANTES DE USAR**
> Este documento é uma **base estrutural de referência** para popular o DoseRx. As doses correspondem a valores de adulto habitualmente citados em referências padrão de medicina intensiva (Medscape, The Sanford Guide, Surviving Sepsis Campaign, Lexicomp/UpToDate, formulários hospitalares e SmPC/INFARMED). **Nenhuma entrada está validada para prescrição.** Antes de mudar `validationStatus` para `validated` no `drugs.ts`, cada ficha exige:
> - confirmação de formulação, concentração, diluição, velocidade e compatibilidade;
> - revisão médica **e** farmacêutica;
> - conferência com os protocolos locais da tua UCI;
> - registo de `sourceIds` reais e `lastReviewedAt`.
>
> Manter `validationStatus: 'not-validated'` e `confidence: 'unvalidated'` durante a preparação.

**Convenções**
- Doses IV de adulto, função de órgão normal salvo indicação. Peso = peso corporal (usar peso ajustado onde indicado).
- Ajuste renal por TFG/ClCr (mL/min). HDi = hemodiálise intermitente. CRRT/TSR contínua ≈ ClCr efetiva 25–40 mL/min salvo nota.
- Perfusões vasoativas indicadas em mcg/kg/min salvo indicação.
- `→` = mapeamento para `categoryIds` do DoseRx.

**Índice de categorias**
1. Antibióticos (`antibiotics`)
2. Antifúngicos (`antifungals`)
3. Antivirais (`antivirals`)
4. Antiepilépticos / anticonvulsivantes (`antiepileptics`)
5. Sedação e analgesia (`sedation-analgesia`)
6. Bloqueadores neuromusculares (`neuromuscular-blockers`)
7. Vasopressores e inotrópicos (`vasopressors-inotropes`)
8. Antiarrítmicos (`antiarrhythmics`)
9. Anticoagulantes e antiagregantes (`antithrombotics`)
10. Diuréticos (`diuretics`)
11. Electrólitos e correcções metabólicas (`electrolytes-metabolic`)
12. Antídotos e toxicologia (`antidotes-toxicology`)
13. Fármacos gastrointestinais (`gastrointestinal`)
14. Endocrinologia e corticoterapia (`endocrine-corticosteroids`)
15. Fármacos usados em sépsis (`sepsis`) — categoria transversal
16. DRC, hemodiálise e técnicas contínuas (`renal-dialysis`) — categoria transversal

---

## 1. Antibióticos → `antibiotics` (+ `sepsis`, `renal-dialysis` conforme)

### Beta-lactâmicos — Penicilinas

**Piperacilina-tazobactam** — Penicilina de largo espectro + inibidor de beta-lactamase
- Habitual: 4,5 g IV 8/8h; em infeção grave/Pseudomonas 4,5 g 6/6h. **Perfusão prolongada** 4h melhora atingimento de alvo PK/PD.
- Carga: 4,5 g em bólus/30 min antes de iniciar perfusão prolongada/contínua.
- Renal: ClCr 20–40 → 4,5 g 8/8h; ClCr <20 → 4,5 g 12/12h. HDi 2,25 g 12/12h (+ 0,75 g pós-diálise). CRRT 4,5 g 8/8h (ou 6/6h se perfusão prolongada e sépsis).
- Hepático: sem ajuste habitual.
- Notas: falso-positivo galactomanano; sinergismo nefrotóxico com vancomicina (vigiar AKI). Cobre anaeróbios.

**Amoxicilina-ácido clavulânico** — Aminopenicilina + inibidor
- Habitual: 1,2 g IV 8/8h (grave 6/6h).
- Renal: ClCr 10–30 → 1,2 g 12/12h; <10 → 1,2 g 24/24h. HDi dose pós-diálise.
- Hepático: risco de hepatotoxicidade colestática (clavulânico); vigiar.

**Flucloxacilina** — Penicilina antiestafilocócica
- Habitual: 2 g IV 6/6h; endocardite/infeção grave por MSSA 2 g 4/4h (até 8–12 g/dia).
- Renal: ajuste só em ClCr <10. Hepático: hepatite colestática rara.

**Ampicilina** — Aminopenicilina
- Habitual: 2 g IV 4/4h–6/6h. Listeria/meningite 2 g 4/4h. Enterococcus (com gentamicina/ceftriaxona).
- Renal: ClCr <10 → 2 g 12/12h. HDi pós-diálise.

**Penicilina G (benzilpenicilina)** — Penicilina natural
- Habitual: 2–4 milhões U IV 4/4h; meningite/neurossífilis 4 MU 4/4h (18–24 MU/dia).
- Renal: reduzir em ClCr <10 (risco de neurotoxicidade/convulsões com doses altas).

### Beta-lactâmicos — Cefalosporinas

**Ceftriaxona** — Cefalosporina 3.ª geração
- Habitual: 2 g IV 24/24h; meningite 2 g 12/12h.
- Renal: sem ajuste (excreção biliar+renal). Hepático+renal graves: máx 2 g/dia.
- Notas: não co-administrar com soluções com cálcio (precipitação, sobretudo neonatos); pseudolitíase biliar.

**Cefotaxima** — Cefalosporina 3.ª geração
- Habitual: 2 g IV 6/6h–8/8h; meningite 2 g 4/4h–6/6h.
- Renal: ClCr <20 → reduzir 50%.

**Ceftazidima** — Cefalosporina 3.ª geração anti-Pseudomonas
- Habitual: 2 g IV 8/8h (perfusão prolongada útil). Carga 2 g.
- Renal: ClCr 30–50 → 2 g 12/12h; 15–30 → 2 g 24/24h; <15 → 1 g 24/24h. CRRT 2 g 12/12h.

**Cefepima** — Cefalosporina 4.ª geração
- Habitual: 2 g IV 8/8h (Pseudomonas/neutropenia febril). Carga 2 g; perfusão prolongada.
- Renal: ClCr 30–60 → 2 g 12/12h; 11–29 → 2 g 24/24h; <11 → 1 g 24/24h. CRRT 2 g 12/12h.
- Notas: **neurotoxicidade/encefalopatia** com acumulação renal (mioclonias, estado confusional, convulsões não-convulsivas) — vigiar EEG.

**Cefuroxima** — Cefalosporina 2.ª geração
- Habitual: 1,5 g IV 8/8h. Renal: ClCr <20 ajustar.

**Ceftarolina** — Cefalosporina anti-MRSA
- Habitual: 600 mg IV 8/8h–12/12h (grave 8/8h). Renal: ajuste em ClCr <50.

**Ceftolozano-tazobactam** — Cefalosporina anti-Pseudomonas (MDR) + inibidor
- Habitual: 1,5 g IV 8/8h; pneumonia nosocomial/VAP 3 g 8/8h.
- Renal: ClCr 30–50 → 750 mg 8/8h; 15–29 → 375 mg 8/8h; ajustar em HDi.

**Ceftazidima-avibactam** — Anti-Gram-negativo MDR (incl. KPC, OXA-48)
- Habitual: 2,5 g IV 8/8h (perfusão 2h).
- Renal: ajuste escalonado a partir de ClCr <50 (dose e/ou intervalo).

### Beta-lactâmicos — Carbapenemos e monobactâmicos

**Meropenem** — Carbapenemo
- Habitual: 1 g IV 8/8h; meningite/Pseudomonas/infeção grave 2 g 8/8h. Perfusão prolongada 3h. Carga 1–2 g.
- Renal: ClCr 25–50 → 1 g 12/12h; 10–25 → 500 mg 12/12h; <10 → 500 mg 24/24h. HDi 500 mg 24h (pós-diálise). CRRT 1 g 8/8h–12/12h.
- Notas: reduz níveis de **valproato** (perda de controlo de crises — evitar associação).

**Imipenem-cilastatina** — Carbapenemo
- Habitual: 500 mg–1 g IV 6/6h–8/8h.
- Renal: ajuste marcado (risco convulsivo por acumulação). CRRT 500 mg 6/6h–8/8h.

**Ertapenem** — Carbapenemo (sem cobertura de Pseudomonas/Acinetobacter)
- Habitual: 1 g IV 24/24h. Renal: ClCr <30 → 500 mg 24/24h.

**Aztreonam** — Monobactâmico (alternativa em alergia a beta-lactâmicos; Gram-negativo)
- Habitual: 2 g IV 8/8h. Renal: reduzir 50% em ClCr 10–30; 75% em <10.

### Glicopéptidos e lipopéptidos

**Vancomicina** — Glicopéptido (MRSA, Gram+)
- Carga: 25–30 mg/kg IV (máx ~3 g). Manutenção 15–20 mg/kg 8/8h–12/12h.
- **TDM**: alvo AUC/MIC 400–600; vale 15–20 mg/L em infeção grave (método por vale a descontinuar a favor de AUC).
- Renal: ajustar por níveis/ClCr. CRRT 15–20 mg/kg carga + 10–15 mg/kg 24/24h guiado por níveis.
- Notas: nefrotoxicidade (↑ com piperacilina-tazobactam), síndrome do homem vermelho (perfundir ≥1h/g).

**Teicoplanina** — Glicopéptido
- Carga: 6–12 mg/kg 12/12h × 3–5 doses; manutenção 6–12 mg/kg 24/24h. TDM vale >15–20 (grave >20–30).
- Renal: reduzir intervalo a partir do 4.º dia em ClCr <50.

**Daptomicina** — Lipopéptido (não usar em pneumonia — inativado pelo surfactante)
- Habitual: 8–10 mg/kg IV 24/24h (bacteriémia/endocardite MRSA/enterococo).
- Renal: ClCr <30 ou diálise → 24/24h a cada 48h. **CK** semanal (rabdomiólise).

### Aminoglicosídeos

**Gentamicina** — Aminoglicosídeo
- Habitual: 5–7 mg/kg IV 24/24h (dose única diária); sinergia endocardite 3 mg/kg/dia div. TDM: pico e vale (<1 mg/L em dose única diária).
- Renal: prolongar intervalo por níveis. Oto/nefrotoxicidade.

**Amicacina** — Aminoglicosídeo
- Habitual: 15–20 mg/kg IV 24/24h. TDM pico 60–80, vale <4. Renal: intervalo por níveis.

**Tobramicina** — Aminoglicosídeo (Pseudomonas)
- Habitual: 5–7 mg/kg 24/24h. TDM idêntico a gentamicina.

### Fluoroquinolonas

**Ciprofloxacina** — Fluoroquinolona (Gram-negativo/Pseudomonas)
- Habitual: 400 mg IV 8/8h–12/12h. Renal: ClCr <30 → 400 mg 24/24h.
- Notas: prolongamento QT, tendinopatia, ↑ níveis de teofilina; interação com múltiplos fármacos (CYP1A2).

**Levofloxacina** — Fluoroquinolona respiratória
- Habitual: 750 mg IV 24/24h. Renal: ClCr <50 ajustar.

**Moxifloxacina** — Fluoroquinolona respiratória (cobre anaeróbios)
- Habitual: 400 mg IV 24/24h. Sem ajuste renal. Maior risco de QT.

### Outros / anaeróbios / atípicos

**Metronidazol** — Nitroimidazol (anaeróbios, C. difficile)
- Habitual: 500 mg IV 8/8h. Renal: sem ajuste (metabolitos acumulam em CRRT — vigiar). Hepático: reduzir em disfunção grave.
- Notas: neuropatia periférica em uso prolongado; efeito dissulfiram com álcool.

**Clindamicina** — Lincosamida (anti-toxina em choque tóxico/fasceíte)
- Habitual: 600–900 mg IV 8/8h. Sem ajuste renal. Risco de C. difficile.

**Linezolida** — Oxazolidinona (MRSA, VRE)
- Habitual: 600 mg IV 12/12h. Sem ajuste renal (metabolitos acumulam). 
- Notas: **trombocitopenia/mielossupressão** (uso >10–14 dias), acidose láctica, neuropatia; IMAO fraco (síndrome serotoninérgico com ISRS/petidina).

**Tigeciclina** — Glicilciclina (MDR; NÃO em bacteriémia primária)
- Habitual: carga 100 mg, depois 50 mg IV 12/12h (doses altas 100 mg 12/12h em alguns MDR).
- Hepático: Child-Pugh C → 100 mg carga + 25 mg 12/12h. Náusea marcada; ↑ mortalidade em algumas indicações.

**Colistina (colistimetato de sódio)** — Polimixina (Gram-negativo MDR/XDR)
- Carga: 9 milhões UI (≈300 mg base) IV. Manutenção 4,5 MUI 12/12h.
- Renal: ajustar manutenção por ClCr. Nefro e neurotoxicidade dependentes da dose. Nebulizada como adjuvante em VAP.

**Cotrimoxazol (trimetoprim-sulfametoxazol)** — (Pneumocystis, Stenotrophomonas, Nocardia)
- PJP: 15–20 mg/kg/dia de trimetoprim IV div 6/6h–8/8h.
- Renal: ClCr 15–30 → reduzir 50%; <15 evitar. Hipercaliémia, mielossupressão, AKI.

**Fosfomicina IV** — (adjuvante MDR)
- Habitual: 4–8 g IV 8/8h (até 24 g/dia). Carga de sódio elevada (vigiar Na⁺/insuf. cardíaca).

**Doxiciclina** — Tetraciclina (atípicas, riquétsias)
- Habitual: 100 mg IV/PO 12/12h. Sem ajuste renal.

**Azitromicina** — Macrólido (PAC atípica, imunomodulação)
- Habitual: 500 mg IV 24/24h. Prolongamento QT.

---

## 2. Antifúngicos → `antifungals` (+ `renal-dialysis`, `sepsis`)

**Fluconazol** — Triazol
- Carga: 12 mg/kg (≈800 mg) IV. Manutenção 6 mg/kg (≈400 mg) 24/24h; candidémia 400–800 mg/dia.
- Renal: ClCr <50 → reduzir manutenção 50%. HDi/CRRT dose pós-diálise / manter dose plena em CRRT (é dialisável).
- Notas: inibe CYP2C9/3A4 (↑ varfarina, ↑ QT com outros); hepatotoxicidade.

**Voriconazol** — Triazol (Aspergillus)
- Carga: 6 mg/kg IV 12/12h × 2 doses. Manutenção 4 mg/kg 12/12h.
- **TDM**: vale 1–5,5 mg/L. Hepático: Child-Pugh A/B → carga igual, manutenção metade.
- Renal: veículo (SBECD) acumula em ClCr <50 — preferir via oral ou vigiar. Alucinações visuais, hepatotoxicidade, QT, múltiplas interações CYP.

**Posaconazol** — Triazol (profilaxia/mucormicose)
- Habitual (comp. libertação retardada/IV): carga 300 mg 12/12h dia 1, depois 300 mg 24/24h. TDM: profilaxia >0,7; tratamento >1,0–1,25 mg/L.
- Veículo IV (SBECD) — cautela renal como voriconazol.

**Isavuconazol** — Triazol (Aspergillus, mucormicose; sem veículo SBECD)
- Carga: 200 mg 8/8h × 6 doses (48h). Manutenção 200 mg 24/24h. Sem ajuste renal; **encurta** QT.

**Anidulafungina** — Equinocandina (1.ª linha candidémia/UCI)
- Carga: 200 mg IV. Manutenção 100 mg 24/24h. Sem ajuste renal nem hepático. Não dialisável.

**Caspofungina** — Equinocandina
- Carga: 70 mg IV. Manutenção 50 mg 24/24h; Child-Pugh B → 35 mg/dia. Sem ajuste renal.

**Micafungina** — Equinocandina
- Habitual: 100 mg IV 24/24h (candidémia); profilaxia 50 mg/dia. Sem ajuste renal.

**Anfotericina B lipossómica** — Poliénico (mucormicose, candidíase/aspergilose grave, leishmaniose)
- Habitual: 3–5 mg/kg IV 24/24h (mucormicose 5–10 mg/kg). Perfusão lenta.
- Notas: nefrotoxicidade, hipocaliémia/hipomagnesémia, reações infusionais (pré-medicar). Formulação lipídica menos nefrotóxica que a convencional (deoxicolato).

**Flucitosina (5-FC)** — (associada a anfotericina na meningite criptocócica)
- Habitual: 25 mg/kg PO/IV 6/6h. **Ajuste renal marcado** por níveis (mielossupressão). TDM pico 30–80 mg/L.

---

## 3. Antivirais → `antivirals` (+ `renal-dialysis`)

**Aciclovir** — (HSV/VZV; encefalite herpética)
- Habitual: encefalite HSV 10 mg/kg IV 8/8h (usar **peso ideal**); VZV grave 10 mg/kg 8/8h.
- Renal: ajuste marcado por ClCr (ex.: ClCr 25–50 → 10 mg/kg 12/12h; 10–25 → 24/24h; <10 → 5 mg/kg 24/24h). HDi pós-diálise.
- Notas: nefrotoxicidade cristalúrica (**hidratar bem**, perfundir ≥1h); neurotoxicidade em acumulação.

**Ganciclovir** — (CMV)
- Indução: 5 mg/kg IV 12/12h × 14–21 dias; manutenção 5 mg/kg 24/24h.
- Renal: ajuste marcado por ClCr. Mielossupressão (neutropenia) — vigiar hemograma.

**Valganciclovir** — pró-fármaco oral de ganciclovir
- Indução 900 mg PO 12/12h; manutenção 900 mg/dia. Ajuste renal.

**Oseltamivir** — (Influenza)
- Habitual: 75 mg PO 12/12h × 5 dias (grave/imunodeprimido prolongar; alguns usam 150 mg 12/12h).
- Renal: ClCr 30–60 → 30 mg 12/12h; <30 ajustar mais. Via SNG possível.

**Remdesivir** — (COVID-19)
- Carga: 200 mg IV dia 1; depois 100 mg 24/24h × 4–9 dias.
- Renal: cautela em ClCr <30 (veículo SBECD); vigiar transaminases/ALT (suspender se >5× ou hepatite).

**Foscarnet** — (CMV/HSV resistente)
- Indução 60 mg/kg 8/8h ou 90 mg/kg 12/12h. **Ajuste renal marcado**; nefrotoxicidade, distúrbios de Ca²⁺/Mg²⁺/P (hidratar). 

---

## 4. Antiepilépticos / anticonvulsivantes → `antiepileptics` (+ `renal-dialysis`)

> Estado de mal epiléptico (EME): benzodiazepina (1.ª linha) → antiepiléptico IV (2.ª linha) → anestésico em perfusão (EME refratário).

**Lorazepam** — Benzodiazepina (1.ª linha EME)
- EME: 0,1 mg/kg IV (máx 4 mg/dose), repetir 1× após 5–10 min. Ver também secção 5.

**Diazepam** — Benzodiazepina
- EME: 0,15–0,2 mg/kg IV (máx 10 mg), repetível; ou 10–20 mg retal se sem acesso.

**Midazolam** — Benzodiazepina (também perfusão em EME refratário)
- EME pré-hospitalar: 10 mg IM. Refratário: carga 0,2 mg/kg IV depois 0,05–2 mg/kg/h. Ver secção 5.

**Levetiracetam** — 2.ª linha EME
- Carga: 60 mg/kg IV (máx 4,5 g). Manutenção 1000–1500 mg IV 12/12h.
- Renal: ClCr 50–80 → 1000 mg 12/12h; 30–50 → 750 mg 12/12h; <30 → 500–750 mg 12/12h; HDi 500–1000 mg/dia + suplemento pós-diálise.
- Notas: perfil de interação favorável; alterações comportamentais/agitação.

**Fenitoína** — 2.ª linha EME
- Carga: 20 mg/kg IV a ≤50 mg/min (monitorizar ECG/PA — hipotensão, bradiarritmia). Adicional 5–10 mg/kg se persiste. Manutenção 100 mg 8/8h.
- **TDM**: total 10–20 mg/L; livre 1–2 mg/L (usar livre se hipoalbuminémia/urémia — comum em UCI). Cinética de saturação. Extravasamento → *purple glove syndrome*.

**Fosfenitoína** — pró-fármaco (expresso em equivalentes de fenitoína, PE)
- Carga: 20 mg PE/kg IV a ≤150 mg PE/min (menos hipotensão/flebite que fenitoína).

**Valproato de sódio** — 2.ª linha EME
- Carga: 40 mg/kg IV (máx 3 g). Manutenção 1–2 mg/kg/h ou 500 mg 8/8h.
- Notas: **hiperamoniémia/encefalopatia** (vigiar amónia), hepatotoxicidade, trombocitopenia; **carbapenemos reduzem drasticamente os níveis**. Evitar na gravidez.

**Lacosamida** — 2.ª/3.ª linha EME
- Carga: 200–400 mg IV. Manutenção 200 mg 12/12h. Vigiar PR/QT. Ajuste renal ligeiro em ClCr <30.

**Fenobarbital** — 2.ª/3.ª linha EME
- Carga: 15–20 mg/kg IV a ≤50–100 mg/min. Sedação e depressão respiratória (preparar via aérea).

**Brivaracetam** — alternativa a levetiracetam
- Carga 100–200 mg IV; manutenção 50–100 mg 12/12h.

---

## 5. Sedação e analgesia → `sedation-analgesia`

### Sedativos-hipnóticos

**Propofol** — Sedativo-hipnótico (perfusão)
- Sedação UCI: 5–50 mcg/kg/min (0,3–3 mg/kg/h), titular. Indução IOT 1–2,5 mg/kg.
- Notas: hipotensão, depressão respiratória; **síndrome de perfusão do propofol (PRIS)** com doses >4–5 mg/kg/h prolongadas (acidose láctica, rabdomiólise, IC — vigiar CK/lactato/triglicéridos); fornece calorias lipídicas (1,1 kcal/mL). Sem ajuste renal/hepático.

**Midazolam** — Benzodiazepina (perfusão)
- Sedação: carga 0,01–0,05 mg/kg; perfusão 0,02–0,2 mg/kg/h, titular.
- Renal: metabolito ativo (α-hidroximidazolam) acumula em disfunção renal → sedação prolongada. Associado a mais delirium.

**Dexmedetomidina** — Agonista α2 (sedação ligeira/cooperante, sem depressão respiratória)
- Perfusão: 0,2–1,4 mcg/kg/h (habitual sem bólus em UCI). 
- Notas: bradicardia e hipotensão (evitar bólus); reduz delirium vs benzodiazepinas.

**Clonidina** — Agonista α2 (adjuvante sedação/abstinência)
- 0,5–2 mcg/kg IV lento ou perfusão; PO/transdérmico. Bradicardia/hipotensão; rebound hipertensivo na suspensão brusca.

**Cetamina** — Anestésico dissociativo (analgo-sedação, broncospasmo, IOT com estabilidade hemodinâmica)
- Indução 1–2 mg/kg IV. Perfusão analgésica 0,1–0,5 mg/kg/h; sedação 0,5–2 mg/kg/h.
- Notas: preserva drive respiratório e PA; sialorreia, fenómenos de emergência; útil em choque.

**Tiopental** — Barbitúrico (EME refratário, hipertensão intracraniana)
- EME/HIC: carga 3–5 mg/kg, perfusão 1–5 mg/kg/h (guiar por EEG *burst-suppression*). Hipotensão, imunossupressão, acumulação.

**Etomidato** — Hipnótico de indução (estabilidade hemodinâmica)
- Indução IOT: 0,3 mg/kg IV. **Supressão adrenal** com dose única (evitar perfusão; cautela em sépsis).

### Analgésicos opióides

**Fentanil** — Opióide (perfusão, analgo-sedação)
- Bólus 0,5–1 mcg/kg; perfusão 0,5–3 mcg/kg/h (25–200 mcg/h típico). Sem metabolitos ativos relevantes (útil na DRC). Rigidez torácica em bólus rápido.

**Morfina** — Opióide
- Bólus 2–4 mg IV; perfusão 1–10 mg/h. Renal: metabolito ativo (M6G) acumula → evitar/reduzir na DRC. Libertação de histamina/hipotensão.

**Remifentanil** — Opióide ultracurto (perfusão)
- 0,05–0,2 mcg/kg/min. Metabolismo por esterases plasmáticas (sem acumulação renal/hepática); despertar rápido; hiperalgesia/rigidez.

**Hidromorfona** — Opióide
- Bólus 0,2–0,5 mg IV; perfusão titulável. Alternativa na intolerância à morfina.

**Petidina (meperidina)** — Opióide (uso restrito — arrepios/tiritação pós-op)
- 12,5–25 mg IV para tiritação. Evitar em DRC/uso prolongado (normeperidina → convulsões); síndrome serotoninérgico com IMAO/linezolida.

**Paracetamol IV** — Analgésico/antipirético não-opióide
- 1 g IV 6/6h (máx 4 g/dia; 3 g se <50 kg, hepatopatia, desnutrição, álcool). Hepatotoxicidade em sobredosagem.

### Antipsicóticos / delirium

**Haloperidol** — Antipsicótico (agitação/delirium hiperativo)
- 2–5 mg IV/IM, repetível. **Vigiar QT** (torsades), distonia/SEP. Não previne delirium — usar sintomático.

**Quetiapina** — Antipsicótico atípico (delirium)
- 25–50 mg PO/SNG 12/12h, titular. Sedação, hipotensão, QT.

**Olanzapina** — Antipsicótico atípico
- 5–10 mg IM/PO. Sedação, QT.

---

## 6. Bloqueadores neuromusculares → `neuromuscular-blockers`

> Sempre com sedação/analgesia adequadas. Monitorizar com TOF (train-of-four). Proteção ocular e prevenção de úlceras.

**Rocurónio** — BNM não-despolarizante (aminosteroide)
- IOT (sequência rápida): 1,2 mg/kg IV; intubação padrão 0,6 mg/kg. Perfusão SDRA 0,3–0,6 mg/kg/h (ou bólus).
- Reversão: **sugammadex** 16 mg/kg (imediata) / 2–4 mg/kg. Renal/hepático: duração prolongada.

**Cisatracúrio** — BNM não-despolarizante (benzilisoquinolínico)
- Perfusão SDRA: bólus 0,15–0,2 mg/kg, depois 1–3 mcg/kg/min. 
- Notas: **eliminação de Hofmann** (independente de função renal/hepática) → preferido em falência de órgão. Sem libertação de histamina significativa.

**Atracúrio** — BNM não-despolarizante
- Bólus 0,5 mg/kg; perfusão 5–10 mcg/kg/min. Eliminação de Hofmann; libertação de histamina (hipotensão); metabolito laudanosina (convulsivante em doses altas).

**Vecurónio** — BNM não-despolarizante
- Bólus 0,1 mg/kg; perfusão 0,8–1,2 mcg/kg/min. Acumula na disfunção renal/hepática.

**Succinilcolina** — BNM despolarizante (só para IOT rápida)
- 1–1,5 mg/kg IV. **Contraindicada**: hipercaliémia, queimados/lesão medular/desnervação >48–72h, história de hipertermia maligna, deficiência de pseudocolinesterase. Bradicardia (sobretudo em crianças/repetição).

**Reversores:**
- **Sugammadex** — reverte rocurónio/vecurónio: 2–4 mg/kg (bloqueio moderado/profundo) ou 16 mg/kg (reversão imediata).
- **Neostigmina + atropina/glicopirrolato** — reversão de não-despolarizantes: neostigmina 0,04–0,07 mg/kg com anticolinérgico para bradicardia/secreções.

---

## 7. Vasopressores e inotrópicos → `vasopressors-inotropes` (+ `sepsis`)

> Preferir acesso central; titular a PAM/débito. Doses em mcg/kg/min salvo indicação.

**Noradrenalina (norepinefrina)** — Vasopressor de 1.ª linha no choque séptico
- 0,01–0,5 mcg/kg/min (titular; sem teto rígido — em doses altas associar 2.º agente). α1 > β1.
- Notas: extravasamento → necrose (antídoto fentolamina); reflexo bradicárdico possível.

**Adrenalina (epinefrina)** — Vasopressor/inotrópico (anafilaxia, choque, PCR)
- PCR: 1 mg IV 3–5/3–5 min. Anafilaxia: 0,5 mg IM (0,3–0,5); perfusão 0,05–0,5 mcg/kg/min. Choque: 0,01–0,5 mcg/kg/min.
- Notas: taquiarritmias, hiperglicémia, ↑ lactato (metabólico, não hipoperfusão obrigatória).

**Vasopressina** — Vasopressor não-catecolaminérgico (adjuvante no choque séptico)
- Dose fixa 0,03 U/min (até 0,04) — **não titular como catecolamina**. Poupa catecolaminas. Isquémia digital/mesentérica em doses altas.

**Fenilefrina** — Vasopressor α1 puro (bólus/perfusão; útil se taquicardia)
- Bólus 50–200 mcg IV; perfusão 0,1–1,4 mcg/kg/min. Bradicardia reflexa.

**Dopamina** — Vasopressor/inotrópico dependente da dose
- 5–20 mcg/kg/min (>10 predomínio α). Mais arritmias que noradrenalina; "dose renal" abandonada.

**Dobutamina** — Inotrópico (β1) — choque cardiogénico/disfunção miocárdica na sépsis
- 2,5–20 mcg/kg/min. Taquicardia, hipotensão (vasodilatação β2), arritmias.

**Milrinona** — Inodilatador (inibidor da PDE3) — IC/HT pulmonar
- 0,125–0,75 mcg/kg/min (evitar bólus em hipotensão). Renal: **acumula em DRC** — reduzir. Hipotensão, arritmias.

**Levosimendan** — Sensibilizador do cálcio (inotrópico) 
- 0,05–0,2 mcg/kg/min × 24h (carga 6–12 mcg/kg opcional, evitar se hipotenso). Metabolito ativo de longa duração; hipotensão.

**Isoprenalina (isoproterenol)** — β-agonista (bradicardia/BAV como ponte para pacing)
- 0,02–0,06 mcg/kg/min ou 2–10 mcg/min, titular à FC.

**Angiotensina II** — Vasopressor (choque vasodilatador refratário)
- Início 20 ng/kg/min, titular. Risco trombótico (tromboprofilaxia).

**Efedrina** — Vasopressor de ação mista (bólus, hipotensão transitória)
- 5–10 mg IV bólus.

**Azul de metileno** — (choque vasoplégico refratário — inibe guanilato-ciclase)
- 1–2 mg/kg IV em 20–30 min. Interfere com oximetria; contraindicado com serotoninérgicos (síndrome serotoninérgico) e défice de G6PD.

---

## 8. Antiarrítmicos → `antiarrhythmics`

**Amiodarona** — Classe III (FA, TV/FV, tempestade elétrica)
- PCR (FV/TV sem pulso): 300 mg IV bólus, depois 150 mg. 
- Estável: carga 150 mg IV em 10 min, depois 1 mg/min × 6h, depois 0,5 mg/min × 18h (≈1 g/24h). 
- Notas: hipotensão/bradicardia (perfusão lenta), flebite (via central), QT; toxicidade crónica (tiroide, pulmão, fígado, córnea). Muitas interações (↑ varfarina, digoxina).

**Lidocaína** — Classe Ib (TV/FV, alternativa à amiodarona)
- Carga 1–1,5 mg/kg IV, repetir 0,5–0,75 mg/kg; perfusão 1–4 mg/min. Neurotoxicidade (acumula na disfunção hepática/IC — reduzir).

**Adenosina** — (TSV paroxística/reentrada nodal — diagnóstica e terapêutica)
- 6 mg IV bólus rápido + flush; repetir 12 mg (e 12 mg). Assistolia transitória/rubor/dispneia. Semivida segundos.

**Diltiazem** — Bloqueador dos canais de cálcio (controlo de frequência na FA)
- Bólus 0,25 mg/kg IV (≈15–20 mg) em 2 min; repetir 0,35 mg/kg; perfusão 5–15 mg/h. Evitar em IC sistólica/pré-excitação.

**Verapamil** — BCC (TSV, controlo de frequência)
- 2,5–5 mg IV em 2 min, repetível. Inotrópico negativo — evitar em IC/betabloqueio.

**Metoprolol** — Betabloqueante (controlo de frequência, isquémia, tempestade elétrica)
- 2,5–5 mg IV em 2 min, repetir até 15 mg. Broncospasmo, hipotensão, bradicardia.

**Esmolol** — Betabloqueante ultracurto (perfusão)
- Carga 500 mcg/kg em 1 min; perfusão 50–200 mcg/kg/min. Titulável, semivida ~9 min.

**Digoxina** — Glicosídeo (controlo de frequência na FA, sobretudo com IC/hipotensão)
- Digitalização: 0,25 mg IV 2/2h até 1–1,5 mg. Manutenção 0,125–0,25 mg/dia.
- Renal: **reduzir marcadamente** (eliminação renal). TDM 0,5–2 ng/mL (IC alvo <1). Toxicidade ↑ com hipocaliémia/hipomagnesémia; antídoto **fragmentos Fab antidigoxina**.

**Sulfato de magnésio** — (torsades de pointes, FA, adjuvante)
- Torsades: 2 g IV em 1–2 min. Ver também secção 11.

**Procainamida** — Classe Ia (FA com pré-excitação/WPW, TV estável)
- 20–50 mg/min até 17 mg/kg (parar se hipotensão, QRS alarga >50%, arritmia resolve). Vigiar QT/QRS. Ajuste renal.

**Isoprenalina** — ver secção 7 (bradiarritmias).

**Atropina** — (bradicardia sintomática)
- 0,5–1 mg IV 3–5/3–5 min (máx 3 mg). <0,5 mg pode causar bradicardia paradoxal.

---

## 9. Anticoagulantes e antiagregantes → `antithrombotics` (+ `renal-dialysis`)

### Heparinas

**Heparina não fracionada (HNF)** — Anticoagulante (perfusão)
- TEV/SCA: bólus 60–80 U/kg, perfusão 12–18 U/kg/h, ajustar por **aPTT (1,5–2,5×)** ou anti-Xa (0,3–0,7). Circuito CRRT/ECMO doses próprias.
- Reversão: **protamina** 1 mg por 100 U de heparina das últimas ~2–3h. Vigiar plaquetas (**HIT** — trombocitopenia induzida por heparina).

**Enoxaparina** — HBPM
- Profilaxia: 40 mg SC 24/24h (obesidade/alto risco ajustar). Terapêutica: 1 mg/kg SC 12/12h ou 1,5 mg/kg 24/24h.
- Renal: **ClCr <30 → 1 mg/kg 24/24h** (terapêutica) / 30 mg 24/24h (profilaxia); em UCI/DRC preferir HNF ou monitorizar **anti-Xa** (alvo 0,5–1,0; pico 4h pós-dose).

**Dalteparina / Tinzaparina** — HBPM (alternativas; tinzaparina menos acumulação renal)
- Dalteparina profilaxia 5000 U SC/dia; terapêutica 200 U/kg/dia ou 100 U/kg 12/12h.

**Fondaparinux** — Inibidor indireto do Xa
- Profilaxia 2,5 mg SC/dia; terapêutica 5–10 mg/dia por peso. Evitar em ClCr <30 (acumulação; sem antídoto específico). Alternativa na HIT.

### Anticoagulantes parenterais não heparínicos (HIT / alternativas)

**Argatrobano** — Inibidor direto da trombina (HIT)
- Perfusão 0,5–2 mcg/kg/min (reduzir em disfunção hepática 0,5), ajustar por aPTT 1,5–3×. Prolonga INR.

**Bivalirudina** — Inibidor direto da trombina (HIT, ICP)
- Perfusão 0,15–0,2 mg/kg/h ajustada por aPTT. Ajuste renal (eliminação renal parcial).

### Anticoagulantes orais (relevantes em UCI para reversão/gestão)

**Varfarina** — Antagonista da vitamina K
- Dose individual por INR (alvo 2–3 na maioria). Muitas interações.
- Reversão: **vitamina K** 5–10 mg IV + **CCP (concentrado de complexo protrombínico) 25–50 U/kg** na hemorragia grave; PFC se CCP indisponível.

**Apixabano / Rivaroxabano** — DOAC anti-Xa
- Reversão: **andexanet alfa** (específico) ou CCP 50 U/kg se indisponível. Ajuste renal (rivaroxabano evitar ClCr <15).

**Dabigatrano** — DOAC anti-trombina
- Reversão: **idarucizumab** 5 g IV (específico). Dialisável. Ajuste/contra-indicação renal.

### Antiagregantes

**Ácido acetilsalicílico (AAS)** — 75–300 mg (carga 150–300 mg no SCA).
**Clopidogrel** — carga 300–600 mg, manutenção 75 mg/dia.
**Ticagrelor** — carga 180 mg, 90 mg 12/12h. **Prasugrel** — carga 60 mg, 10 mg/dia.
**Tirofibano / Eptifibatida** — inibidores GP IIb/IIIa em perfusão (ICP); ajuste renal.

### Trombolíticos

**Alteplase (rtPA)** — (EAM, AVC isquémico, TEP maciço)
- TEP maciço: 100 mg IV em 2h (ou 0,6 mg/kg em 15 min em PCR). AVC: 0,9 mg/kg (máx 90 mg), 10% em bólus. Risco hemorrágico major — critérios rigorosos.

**Tenecteplase** — bólus único ajustado ao peso (EAM; usado em TEP/AVC em protocolos).

### Reversão / hemostáticos

**Protamina, Vitamina K, CCP, Andexanet, Idarucizumab** — ver acima.
**Ácido tranexâmico** — antifibrinolítico: 1 g IV em 10 min + 1 g em 8h (trauma <3h/hemorragia); ajuste renal.

---

## 10. Diuréticos → `diuretics` (+ `renal-dialysis`)

**Furosemida** — Diurético da ansa
- Bólus 20–80 mg IV (naive) até 200 mg em DRC/resistência; **perfusão** 5–20 mg/h (carga antes da perfusão). Regra: dose IV ≈ dose oral prévia.
- Notas: ototoxicidade (bólus rápido/doses altas — perfundir ≤4 mg/min), hipocaliémia/hipomagnesémia/alcalose, hipovolémia.

**Bumetanida** — Diurético da ansa (1 mg ≈ 40 mg furosemida)
- 0,5–2 mg IV; perfusão 0,5–2 mg/h. Melhor biodisponibilidade oral.

**Torasemida** — Diurético da ansa (10–20 mg IV/PO; boa absorção oral).

**Tiazidas / Metolazona** — Bloqueio sequencial do nefrónio (resistência a diuréticos)
- Metolazona 2,5–10 mg PO ou hidroclorotiazida/clorotiazida IV **antes** da dose de ansa. Vigiar depleção electrolítica marcada.

**Espironolactona / Eplerenona** — Antagonistas da aldosterona (poupadores de potássio)
- Espironolactona 25–100 mg/dia PO. **Hipercaliémia** (cautela em DRC/IECA). Efeito diurético lento.

**Acetazolamida** — Inibidor da anidrase carbónica (alcalose metabólica associada a diuréticos, diurese)
- 250–500 mg IV 12/12h–24/24h. Acidose metabólica hiperclorémica; cautela em DPOC/retentores.

**Manitol** — Diurético osmótico (HIC, edema cerebral; não é diurético "de volume")
- 0,25–1 g/kg IV em 15–20 min. Vigiar osmolaridade/gap osmolar, natrémia, função renal; evitar se anúria/IC descompensada.

**Tolvaptano** — Antagonista V2 (hiponatrémia euvolémica/hipervolémica)
- 15 mg/dia PO, titular. **Corrigir Na⁺ devagar** (risco de mielinólise); hepatotoxicidade.

---

## 11. Electrólitos e correcções metabólicas → `electrolytes-metabolic` (+ `renal-dialysis`)

**Cloreto de potássio (KCl)** — Reposição de potássio
- IV periférico ≤10 mEq/h (≤40 mEq/L); central ≤20 mEq/h com **monitorização ECG**. Regra prática: 10 mEq elevam K⁺ ~0,1 mEq/L. Corrigir Mg²⁺ concomitante.
- Renal: cautela extrema em oligúria/DRC (hipercaliémia).

**Fosfato (de potássio ou sódio)** — Reposição de fósforo
- Hipofosfatémia grave (<0,3 mmol/L): 0,3–0,6 mmol/kg IV em 6h. Escolher sal (K vs Na) conforme potássio. Vigiar Ca²⁺ (precipitação), função renal.

**Sulfato / cloreto de magnésio** — Reposição de magnésio
- Repleção: 2–4 g IV em 1–2h. Torsades/eclâmpsia/asma grave: 2 g IV. Vigiar reflexos/PA/FR em doses altas; ajuste renal (acumula).

**Gluconato / cloreto de cálcio** — Reposição de cálcio / hipercaliémia / toxicidade por BCC
- Gluconato de cálcio 10% 10–30 mL IV; **cloreto de cálcio 10% 10 mL** (3× mais cálcio elementar — via central, cardioestabilizador na hipercaliémia). 
- Notas: não co-administrar com bicarbonato/fosfato/ceftriaxona (precipitação).

**Cloreto de sódio hipertónico (NaCl 3% / 7,5% / 20%)** — Hiponatrémia sintomática, HIC
- Hiponatrémia sintomática grave: bólus 100–150 mL de NaCl 3% IV, repetível; **limitar correção a 6–8 mEq/L/24h** (risco de mielinólise pontina). HIC: 2–5 mL/kg de 3% ou bólus de 20% conforme protocolo. Vigiar Na⁺ seriado.

**Bicarbonato de sódio** — Acidose metabólica grave, hipercaliémia, alcalinização urinária
- Acidose grave (pH <7,1–7,2)/hipercaliémia: 50–100 mEq IV (1 mEq/kg). Vigiar Na⁺, pCO₂ (necessita ventilação), Ca²⁺ ionizado, K⁺.

**Insulina + glicose** — Hipercaliémia (desvio intracelular)
- 10 U de insulina rápida IV + 25 g de glicose (D50 50 mL); vigiar glicémia (hipoglicémia tardia). Ver secção 14.

**Glucagom** — (hipoglicémia sem acesso; sobredosagem de betabloqueante/BCC)
- Hipoglicémia 1 mg IM/IV. Toxicidade BB/BCC: 3–10 mg IV bólus + perfusão.

**Tiamina (vitamina B1)** — (encefalopatia de Wernicke, alcoolismo, refeeding, antes de glicose)
- 200–500 mg IV 8/8h na suspeita de Wernicke; 100–250 mg/dia profilático. Administrar **antes** de cargas de glicose.

**Fosfato/Potássio/Magnésio no refeeding** — repor proativamente na síndrome de realimentação.

**Cloreto de amónio / Acetazolamida** — correções de alcalose (ver secção 10).

---

## 12. Antídotos e toxicologia → `antidotes-toxicology` (+ `renal-dialysis`)

**N-acetilcisteína (NAC)** — Antídoto do paracetamol
- Regime 21h IV: 150 mg/kg em 1h → 50 mg/kg em 4h → 100 mg/kg em 16h (ou regime 2 sacos). Reações anafilactóides (abrandar). Iniciar por nomograma/tempo.

**Naloxona** — Antagonista opióide
- 0,04–0,4 mg IV titulado (evitar abstinência abrupta); perfusão 2/3 da dose de reversão/h. Semivida curta — repetir/perfundir.

**Flumazenil** — Antagonista de benzodiazepinas
- 0,2 mg IV, repetir até 1 mg. **Cautela**: pode precipitar convulsões (uso crónico/co-ingestão de pró-convulsivantes).

**Fomepizol** — Inibidor da álcool-desidrogenase (metanol, etilenoglicol)
- Carga 15 mg/kg IV, depois 10 mg/kg 12/12h × 4, depois 15 mg/kg 12/12h. **Aumentar frequência durante hemodiálise**. Considerar HD para eliminação do tóxico/acidose grave.

**Etanol** — alternativa ao fomepizol se indisponível (perfusão para nível ~100–150 mg/dL).

**Hidroxocobalamina** — Antídoto do cianeto (inalação de fumo)
- 5 g IV em 15 min (repetir até 10 g). Colore urina/pele de vermelho; interfere com colorimetrias.

**Tiossulfato de sódio / Nitrito de sódio** — kit clássico do cianeto (adjuvante).

**Emulsão lipídica IV 20% (ILE)** — Toxicidade por anestésico local / lipofílicos (BCC, TCA)
- 1,5 mL/kg em bólus + 0,25 mL/kg/min; repetir bólus se instável (máx ~10–12 mL/kg).

**Glucagom + Cálcio + Insulina em alta dose (HIET)** — Toxicidade betabloqueante / BCC
- HIET: insulina 1 U/kg bólus + 0,5–1 U/kg/h (com glicose e monitorização de K⁺/glicémia). Glucagom e cálcio conforme secção 11.

**Bicarbonato de sódio** — Antidepressivos tricíclicos (QRS largo), alcalinização (salicilatos, fenobarbital).

**Fragmentos Fab antidigoxina (DigiFab)** — Intoxicação digitálica
- Dose por carga corporal/nível ou empírica (10–20 frascos em intoxicação aguda com risco de vida).

**Sulfato de protamina** — reversão de heparina (secção 9).
**Vitamina K / CCP / Andexanet / Idarucizumab** — reversão de anticoagulantes (secção 9).

**Azul de metileno** — metahemoglobinémia: 1–2 mg/kg IV (evitar em défice de G6PD).

**Fisostigmina** — síndrome anticolinérgico central: 0,5–2 mg IV lento (monitorização — bradicardia/convulsões).

**Atropina + Pralidoxima** — Organofosforados/carbamatos
- Atropina 2–5 mg IV a duplicar até secura de secreções brônquicas; pralidoxima 30 mg/kg carga + perfusão.

**Octreotido** — Hipoglicémia por sulfonilureias
- 50 mcg SC/IV 6/6h–12/12h (além de glicose).

**Carvão ativado** — descontaminação GI: 1 g/kg PO/SNG (via aérea protegida; até 1h pós-ingestão / substâncias selecionadas).

---

## 13. Fármacos gastrointestinais → `gastrointestinal`

**Pantoprazol** — IBP (profilaxia de úlcera de stress, hemorragia digestiva alta)
- Profilaxia 40 mg IV/dia. **HDA (úlcera péptica)**: bólus 80 mg IV + perfusão 8 mg/h × 72h. Sem ajuste renal; cautela hepática grave.

**Esomeprazol / Omeprazol** — IBP (mesma lógica de HDA que o pantoprazol).

**Ranitidina/Famotidina (anti-H2)** — Famotidina 20 mg IV 12/12h (alternativa/profilaxia stress). Ajuste renal da famotidina.

**Metoclopramida** — Procinético/antiemético
- 10 mg IV 8/8h. SEP/distonia, QT; reduzir em DRC. Evitar uso prolongado (discinesia tardia).

**Eritromicina** — Procinético (agonista da motilina; gastroparésia/intolerância entérica)
- 3 mg/kg IV 8/8h ou 250 mg. Taquifilaxia, QT, interações.

**Ondansetrom** — Antiemético 5-HT3
- 4–8 mg IV 8/8h. **QT** (evitar doses únicas altas). 

**Octreotido** — Análogo da somatostatina (hemorragia varicosa, fístulas de alto débito)
- Varizes: 50 mcg IV bólus + 50 mcg/h × 3–5 dias. 

**Terlipressina** — (hemorragia varicosa, síndrome hepatorrenal)
- Varizes 1–2 mg IV 4/4h–6/6h; SHR 0,5–1 mg 4/4h–6/6h ou perfusão. Isquémia periférica/mesentérica, hiponatrémia.

**Lactulose** — (encefalopatia hepática)
- 20–30 g PO/SNG a titular para 2–3 dejeções moles/dia; enema se necessário.

**Rifaximina** — (encefalopatia hepática, adjuvante) 550 mg PO 12/12h.

**Loperamida / Colestiramina** — controlo de diarreia (após excluir C. difficile).

**Sucralfato** — proteção da mucosa 1 g SNG 6/6h (reduz absorção de outros fármacos).

**Glicopirrónio / Butilescopolamina** — antissecretor/antiespasmódico (secreções, cólica).

---

## 14. Endocrinologia e corticoterapia → `endocrine-corticosteroids` (+ `sepsis`)

### Insulina e glicémia

**Insulina rápida (regular) IV** — Controlo glicémico / CAD-EHH / hipercaliémia
- Perfusão UCI: 0,05–0,1 U/kg/h titulada a protocolo (alvo 140–180 mg/dL). 
- **CAD/EHH**: perfusão 0,1 U/kg/h (± bólus 0,1 U/kg); baixar glicémia ~50–70 mg/dL/h; adicionar glicose quando <200–250; **repor K⁺** e só iniciar insulina se K⁺ >3,3.
- Hipercaliémia: 10 U + glicose (secção 11).

**Glucose hipertónica (D30/D50)** — hipoglicémia: 10–25 g IV; reavaliar.

**Glucagom** — hipoglicémia sem acesso / toxicidade BB-BCC (secção 11/12).

### Corticosteroides

**Hidrocortisona** — Glucocorticoide (choque séptico refratário, insuficiência adrenal)
- Choque séptico: **50 mg IV 6/6h** (200 mg/dia) ou perfusão 200 mg/24h. Crise adrenal: 100 mg IV bólus + 50 mg 6/6h ou 200 mg/24h. Tem atividade mineralocorticoide.

**Metilprednisolona** — Glucocorticoide (asma, SDRA, imunomediado, transplante)
- Asma grave 40–125 mg IV 6/6h–8/8h; pulsos 0,5–1 g/dia em doença imunomediada.

**Dexametasona** — Glucocorticoide (edema cerebral por tumor, COVID-19, antiemético, laringe)
- COVID-19 (O₂): 6 mg IV/PO/dia × ≤10 dias. Edema cerebral (tumoral): 10 mg IV + 4 mg 6/6h. Sem mineralocorticoide.

**Prednisolona** — oral equivalente (asma/DPOC: 40–50 mg/dia).

**Fludrocortisona** — mineralocorticoide (0,05–0,1 mg/dia PO; adjuvante na insuficiência adrenal — alguns protocolos de choque séptico).

### Tiroide

**Levotiroxina (T4)** — coma mixedematoso: 200–400 mcg IV carga, depois 50–100 mcg/dia (com hidrocortisona antes, e ± liotironina T3).
**Tiamazol/Propiltiouracilo + Lugol + betabloqueante + hidrocortisona** — tempestade tiroideia.

### Outros

**Octreotido** — acromegalia/hemorragia (secção 13).
**Desmopressina (DDAVP)** — diabetes insípida central: 1–2 mcg IV/SC 12/12h titulado; também disfunção plaquetária urémica 0,3 mcg/kg.
**Vasopressina** — diabetes insípida (além do uso vasopressor, secção 7).

---

## 15. Fármacos usados em sépsis → `sepsis` (categoria transversal)

Esta categoria **agrega** fármacos já descritos, para consulta rápida no *bundle* de sépsis/choque séptico. Adicionar `'sepsis'` aos `categoryIds` das fichas abaixo:

- **Antibióticos empíricos precoces** (secção 1): piperacilina-tazobactam, meropenem, ceftriaxona/cefotaxima, cefepima, vancomicina, linezolida/daptomicina (MRSA), amicacina/gentamicina (adjuvante Gram-negativo), metronidazol/clindamicina (anaeróbios/toxina), colistina/ceftazidima-avibactam (MDR).
- **Antifúngicos empíricos** em candidémia/choque (secção 2): anidulafungina/caspofungina/micafungina.
- **Vasopressores/inotrópicos** (secção 7): noradrenalina (1.ª linha), vasopressina (adjuvante), adrenalina, dobutamina (disfunção miocárdica).
- **Corticoterapia** (secção 14): hidrocortisona 200 mg/dia no choque refratário.
- **Fluidoterapia de ressuscitação**: cristaloides balanceados (Lactato de Ringer/Plasma-Lyte) 30 mL/kg inicial guiado por resposta; considerar albumina 4–5% se grandes volumes.
- **Adjuvantes**: controlo glicémico (insulina), profilaxia de úlcera de stress (IBP/anti-H2), tromboprofilaxia (HBPM/HNF), controlo de fonte.

> Nota: a proteína C ativada (drotrecogina alfa) foi **retirada** do mercado — não incluir como opção terapêutica.

---

## 16. DRC, hemodiálise e técnicas contínuas → `renal-dialysis` (categoria transversal)

Categoria **transversal**: fármacos cujo *dosing* muda de forma clinicamente relevante na disfunção renal, HDi ou CRRT/TSR. Adicionar `'renal-dialysis'` aos `categoryIds`. Principais (ajustes já detalhados nas secções indicadas):

- **Antibióticos** (secção 1): meropenem, piperacilina-tazobactam, cefepima, ceftazidima, vancomicina, teicoplanina, daptomicina, aminoglicosídeos (gentamicina/amicacina/tobramicina), ciprofloxacina/levofloxacina, colistina, cotrimoxazol, aztreonam, ampicilina/penicilina G.
- **Antifúngicos** (secção 2): fluconazol, flucitosina; veículos SBECD de voriconazol/posaconazol/remdesivir em ClCr <50.
- **Antivirais** (secção 3): aciclovir, ganciclovir/valganciclovir, oseltamivir, foscarnet.
- **Antiepilépticos** (secção 4): levetiracetam, lacosamida.
- **Cardio/antiarrítmicos** (secção 8): digoxina (redução marcada), procainamida, sotalol.
- **Anticoagulantes** (secção 9): enoxaparina/HBPM (preferir HNF ou anti-Xa em DRC grave), fondaparinux, DOAC, bivalirudina/argatrobano em CRRT.
- **Diuréticos** (secção 10): furosemida (doses altas na DRC), metolazona (bloqueio sequencial).
- **Electrólitos** (secção 11): KCl, magnésio, fosfato — risco de acumulação; ajustar à diurese/TSR.
- **Milrinona** (secção 7): acumula na DRC.

**Princípios de dosing em CRRT** (para as notas de cada ficha):
- CRRT (CVVH/CVVHD/CVVHDF) remove sobretudo fármacos hidrossolúveis, de baixo peso molecular e baixa ligação proteica.
- Para antibióticos tempo-dependentes (beta-lactâmicos), **manter/encurtar intervalos ou usar perfusão prolongada/contínua** com carga inicial plena, independentemente da função renal, para não subdosear na sépsis.
- Não reduzir a dose de **carga** por causa da função renal — a carga depende do volume de distribuição, não da depuração.
- Confirmar sempre o modo e a dose de efluente da TSR (mL/kg/h) da tua unidade e usar TDM quando disponível (vancomicina, aminoglicosídeos, voriconazol, teicoplanina).

---

## Tabela-resumo (mapeamento para `drugs.ts`)

| Fármaco | `drugClass` | `categoryIds` sugeridos |
|---|---|---|
| Piperacilina-tazobactam | Penicilina + inibidor | antibiotics, sepsis, renal-dialysis |
| Meropenem | Carbapenemo | antibiotics, sepsis, renal-dialysis |
| Ceftriaxona | Cefalosporina 3.ª G | antibiotics, sepsis |
| Cefepima | Cefalosporina 4.ª G | antibiotics, sepsis, renal-dialysis |
| Ceftazidima-avibactam | Cefalosporina + inibidor | antibiotics, sepsis, renal-dialysis |
| Vancomicina | Glicopéptido | antibiotics, sepsis, renal-dialysis |
| Linezolida | Oxazolidinona | antibiotics, sepsis |
| Daptomicina | Lipopéptido | antibiotics, renal-dialysis |
| Amicacina | Aminoglicosídeo | antibiotics, sepsis, renal-dialysis |
| Colistina | Polimixina | antibiotics, sepsis, renal-dialysis |
| Metronidazol | Nitroimidazol | antibiotics |
| Anidulafungina | Equinocandina | antifungals, sepsis |
| Fluconazol | Triazol | antifungals, renal-dialysis |
| Anfotericina B lipossómica | Poliénico | antifungals, renal-dialysis |
| Voriconazol | Triazol | antifungals, renal-dialysis |
| Aciclovir | Antiviral | antivirals, renal-dialysis |
| Ganciclovir | Antiviral | antivirals, renal-dialysis |
| Oseltamivir | Antiviral | antivirals, renal-dialysis |
| Levetiracetam | Antiepiléptico | antiepileptics, renal-dialysis |
| Fenitoína | Antiepiléptico | antiepileptics |
| Valproato de sódio | Antiepiléptico | antiepileptics |
| Propofol | Sedativo-hipnótico | sedation-analgesia |
| Midazolam | Benzodiazepina | sedation-analgesia, antiepileptics |
| Dexmedetomidina | Agonista α2 | sedation-analgesia |
| Cetamina | Anestésico dissociativo | sedation-analgesia |
| Fentanil | Opióide | sedation-analgesia |
| Morfina | Opióide | sedation-analgesia |
| Cisatracúrio | BNM não-despolarizante | neuromuscular-blockers |
| Rocurónio | BNM não-despolarizante | neuromuscular-blockers |
| Succinilcolina | BNM despolarizante | neuromuscular-blockers |
| Noradrenalina | Vasopressor | vasopressors-inotropes, sepsis |
| Adrenalina | Vasopressor/inotrópico | vasopressors-inotropes, sepsis |
| Vasopressina | Vasopressor | vasopressors-inotropes, sepsis |
| Dobutamina | Inotrópico | vasopressors-inotropes, sepsis |
| Milrinona | Inodilatador PDE3 | vasopressors-inotropes, renal-dialysis |
| Amiodarona | Antiarrítmico III | antiarrhythmics |
| Diltiazem | BCC | antiarrhythmics |
| Esmolol | Betabloqueante | antiarrhythmics |
| Digoxina | Glicosídeo | antiarrhythmics, renal-dialysis |
| Adenosina | Antiarrítmico | antiarrhythmics |
| Heparina não fracionada | Anticoagulante | antithrombotics |
| Enoxaparina | HBPM | antithrombotics, renal-dialysis |
| Argatrobano | Inibidor direto trombina | antithrombotics |
| Varfarina | Antagonista vit. K | antithrombotics |
| Alteplase | Trombolítico | antithrombotics |
| Ácido tranexâmico | Antifibrinolítico | antithrombotics |
| Furosemida | Diurético da ansa | diuretics, renal-dialysis |
| Manitol | Diurético osmótico | diuretics |
| Espironolactona | Antagonista aldosterona | diuretics |
| Cloreto de potássio | Electrólito | electrolytes-metabolic, renal-dialysis |
| Sulfato de magnésio | Electrólito | electrolytes-metabolic, antiarrhythmics |
| NaCl hipertónico | Electrólito | electrolytes-metabolic |
| Bicarbonato de sódio | Alcalinizante | electrolytes-metabolic, antidotes-toxicology |
| Gluconato/cloreto de cálcio | Electrólito | electrolytes-metabolic, antidotes-toxicology |
| N-acetilcisteína | Antídoto | antidotes-toxicology |
| Naloxona | Antagonista opióide | antidotes-toxicology |
| Flumazenil | Antagonista BZD | antidotes-toxicology |
| Fomepizol | Antídoto | antidotes-toxicology, renal-dialysis |
| Hidroxocobalamina | Antídoto cianeto | antidotes-toxicology |
| DigiFab | Antídoto digitálico | antidotes-toxicology, antiarrhythmics |
| Pantoprazol | IBP | gastrointestinal |
| Metoclopramida | Procinético | gastrointestinal |
| Octreotido | Análogo somatostatina | gastrointestinal, endocrine-corticosteroids |
| Terlipressina | Análogo vasopressina | gastrointestinal |
| Insulina rápida IV | Hormona | endocrine-corticosteroids |
| Hidrocortisona | Corticosteroide | endocrine-corticosteroids, sepsis |
| Dexametasona | Corticosteroide | endocrine-corticosteroids |
| Metilprednisolona | Corticosteroide | endocrine-corticosteroids |

---

## Como converter cada linha numa ficha `Drug`

Para cada fármaco, o objeto TypeScript deve:
1. Ter `usualAdultDose` (array de `DoseAdjustment`) com o contexto "Adulto em Medicina Intensiva".
2. Preencher `loadingDose` só quando aplicável (ex.: vancomicina, levetiracetam, amiodarona).
3. Construir `renalAdjustment.byKidneyFunction` com 3 escalões + `intermittentHemodialysis` + `continuousKidneyReplacement`.
4. Preencher `prescriptionExamples` com uma prescrição concreta (formulação, diluição, velocidade).
5. Ligar cada recomendação a `sourceIds` presentes em `references`.
6. Manter `validationStatus: 'not-validated'` / `confidence: 'unvalidated'` até revisão local; registar `lastReviewedAt`.

Diz-me quais fármacos queres que converta primeiro em objetos `Drug` prontos a colar no `drugs.ts` (posso começar pelos 10–15 mais prioritários da tua UCI).





