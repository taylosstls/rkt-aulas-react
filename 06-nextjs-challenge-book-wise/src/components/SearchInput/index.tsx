import { InputHTMLAttributes, ReactNode } from 'react'
import { InputContainer } from './styles'
import { CSS } from '@stitches/react/types/css-util'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode
  css?: CSS
}

export default function SearchInput({ icon, css, ...props }: InputProps) {
  return (
    <InputContainer css={css}>
      <input {...props} />
      {icon}
    </InputContainer>
  )
}
