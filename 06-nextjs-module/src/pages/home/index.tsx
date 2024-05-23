import { Heading, Text } from '@ignite-ui/react'
import { bodyStyles, Container, Hero, Preview } from './styles'
import Image from 'next/image'

import previewImage from '../../assets/app-preview.png'

bodyStyles()

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading size={'4xl'}>Agendamento descomplicado</Heading>
        <Text size={'lg'}>
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
      </Hero>

      <Preview>
        <Image
          src={previewImage}
          alt="Imagem de agendamento"
          height={400}
          quality={100}
          priority
        />
      </Preview>
    </Container>
  )
}
