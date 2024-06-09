import { ComponentProps, ReactNode } from 'react'
import { Heading } from '@/components/Typography'
import { Container } from './styles'

type PageTitleProps = ComponentProps<typeof Container> & {
  icon: ReactNode
  title: string
}

export default function Pagetitle({ icon, title, ...props }: PageTitleProps) {
  return (
    <Container {...props}>
      {icon}
      <Heading size={'lg'}>{title}</Heading>
    </Container>
  )
}
