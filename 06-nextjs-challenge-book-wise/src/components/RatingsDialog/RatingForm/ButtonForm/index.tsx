import { ComponentProps } from '@stitches/react'
import { ReactNode } from 'react'
import { theme } from '@/../stitches.config'
import { Container } from './styles'

type ButtonFormProps = ComponentProps<typeof Container> & {
  icon: ReactNode
  iconColor: keyof typeof theme.colors
}

export default function ButtonForm({
  icon,
  iconColor,
  ...props
}: ButtonFormProps) {
  return (
    <Container
      {...props}
      css={{
        color: `$${iconColor}`,
      }}
    >
      {icon}
    </Container>
  )
}
