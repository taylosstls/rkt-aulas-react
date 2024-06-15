import { TextareaHTMLAttributes } from 'react'
import { Container } from './styles'

type TextareaFormProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  maxLength?: number
}

export default function TextareaForm({
  maxLength,
  ...props
}: TextareaFormProps) {
  const valueLength = String(props.value)?.length ?? 0

  return (
    <Container>
      <textarea {...props} maxLength={maxLength} />
      {maxLength && (
        <span>
          {valueLength}/{maxLength}
        </span>
      )}
    </Container>
  )
}
