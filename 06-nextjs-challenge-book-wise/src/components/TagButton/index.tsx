import { ComponentProps } from '@stitches/react'
import { ReactNode } from 'react'
import { Container } from './styles'

type TagProps = ComponentProps<typeof Container> & {
  children: ReactNode
  active?: boolean
}

export default function TagButton({ children, active, ...props }: TagProps) {
  return (
    <Container active={active} {...props}>
      {children}
    </Container>
  )
}
