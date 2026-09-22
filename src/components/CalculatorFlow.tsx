import { useRef, useState, type ReactNode } from 'react'
import { useI18n } from '../i18n/I18nContext'

export type CalculatorMode = 'all' | 'questions'

const COPY = {
  pt: {
    mode: 'Como quer preencher?', all: 'Formulário completo', questions: 'Modo de perguntas',
    automatic: 'Preencha os campos: o resultado atualiza automaticamente.',
    guided: 'Uma pergunta de cada vez. Confirme também os valores pré-preenchidos. Todos os campos desta calculadora são necessários para o cálculo.',
    choose: 'Calculadora', question: 'Pergunta', of: 'de', required: 'Necessário para calcular',
    next: 'Confirmar e continuar', result: 'Ver resultado', previous: 'Anterior', edit: 'Editar respostas',
    positive: 'Introduza um número superior a zero.', weight: 'Introduza um peso entre 1 e 400 kg.',
    option: 'Selecione o regime documentado.', maximum: 'Dose acima do limite documentado:',
    minimum: 'Duração mínima documentada:', shortcut: 'Ir para as calculadoras',
  },
  en: {
    mode: 'How would you like to enter data?', all: 'Full form', questions: 'Question mode',
    automatic: 'Enter the values: the result updates automatically.',
    guided: 'One question at a time. Confirm the pre-filled values too. Every field in this calculator is required for the calculation.',
    choose: 'Calculator', question: 'Question', of: 'of', required: 'Required for the calculation',
    next: 'Confirm and continue', result: 'View result', previous: 'Previous', edit: 'Edit answers',
    positive: 'Enter a number greater than zero.', weight: 'Enter a weight between 1 and 400 kg.',
    option: 'Select the documented regimen.', maximum: 'Dose above the documented limit:',
    minimum: 'Documented minimum duration:', shortcut: 'Go to calculators',
  },
  es: {
    mode: '¿Cómo quiere introducir los datos?', all: 'Formulario completo', questions: 'Modo de preguntas',
    automatic: 'Introduzca los valores: el resultado se actualiza automáticamente.',
    guided: 'Una pregunta a la vez. Confirme también los valores predefinidos. Todos los campos de esta calculadora son necesarios para el cálculo.',
    choose: 'Calculadora', question: 'Pregunta', of: 'de', required: 'Necesario para calcular',
    next: 'Confirmar y continuar', result: 'Ver resultado', previous: 'Anterior', edit: 'Editar respuestas',
    positive: 'Introduzca un número mayor que cero.', weight: 'Introduzca un peso entre 1 y 400 kg.',
    option: 'Seleccione el régimen documentado.', maximum: 'Dosis superior al límite documentado:',
    minimum: 'Duración mínima documentada:', shortcut: 'Ir a las calculadoras',
  },
}

export function useCalculatorFlowCopy() {
  const { language } = useI18n()
  return COPY[language ?? 'pt']
}

export function isPositiveInput(value: string) {
  return value.trim() !== '' && Number.isFinite(Number(value)) && Number(value) > 0
}

interface CalculatorField {
  id: string
  input: ReactNode
  valid: boolean
  error: string
}

interface CalculatorFlowProps {
  mode: CalculatorMode
  fields: CalculatorField[]
  children: ReactNode
}

export function CalculatorFlow({ mode, fields, children }: CalculatorFlowProps) {
  const t = useCalculatorFlowCopy()
  const [step, setStep] = useState(0)
  const [complete, setComplete] = useState(false)
  const panel = useRef<HTMLDivElement>(null)
  const current = Math.min(step, fields.length - 1)
  const allValid = fields.every((field) => field.valid)

  function moveTo(next: number) {
    setStep(next)
    setComplete(false)
    requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>('input, select')?.focus())
  }

  return (
    <div className="calculator-flow" ref={panel}>
      {mode === 'all' ? (
        <div className="calculator-fields" onChange={() => setComplete(false)}>
          {fields.map((field) => <div className="calculator-flow__field" key={field.id}>
            {field.input}
            {!field.valid && <small className="calculator-flow__error">{field.error}</small>}
          </div>)}
        </div>
      ) : complete && allValid ? (
        <div className="calculator-flow__actions">
          <button type="button" onClick={() => moveTo(0)}>{t.edit}</button>
        </div>
      ) : (
        <form noValidate onSubmit={(event) => {
          event.preventDefault()
          if (!fields[current].valid) return
          if (current < fields.length - 1) moveTo(current + 1)
          else if (allValid) {
            setComplete(true)
            requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>('.calculator-flow__result')?.focus())
          } else moveTo(fields.findIndex((field) => !field.valid))
        }}>
          <p className="calculator-flow__progress" aria-live="polite">{t.question} {current + 1} {t.of} {fields.length} · {t.required}</p>
          <div className="calculator-fields calculator-fields--question" onChange={() => setComplete(false)}>
            <div className="calculator-flow__field" key={fields[current].id}>
              {fields[current].input}
              {!fields[current].valid && <small className="calculator-flow__error" role="status">{fields[current].error}</small>}
            </div>
          </div>
          <div className="calculator-flow__actions">
            <button type="button" disabled={current === 0} onClick={() => moveTo(current - 1)}>{t.previous}</button>
            <button type="submit" className="calculator-flow__primary" disabled={!fields[current].valid}>
              {current === fields.length - 1 ? t.result : t.next}
            </button>
          </div>
        </form>
      )}
      {(mode === 'all' || (complete && allValid)) && <div className="calculator-flow__result" tabIndex={-1}>{children}</div>}
    </div>
  )
}
