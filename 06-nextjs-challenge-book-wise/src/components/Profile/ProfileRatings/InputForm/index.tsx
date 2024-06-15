import { CSS } from '@stitches/react/types/css-util'
import { InputHTMLAttributes, ReactNode } from 'react'
import { InputContainer } from './styles'

type InputFormProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode
  css?: CSS
}

export default function InputForm({ icon, css, ...props }: InputFormProps) {
  return (
    <InputContainer css={css}>
      <input {...props} />
      {icon}
    </InputContainer>
  )
}
