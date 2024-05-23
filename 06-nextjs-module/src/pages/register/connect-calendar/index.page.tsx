import { useState, useEffect } from 'react'
import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { signIn, useSession } from 'next-auth/react'
import { ArrowRight, CheckCircle } from 'phosphor-react'
import { Container, Header } from '../styles'
import { ConnectBox, ConnectItem } from './styles'

export default function Register() {
  const { data: session, status } = useSession()
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (session && status === 'authenticated') {
      setIsConnected(true)
    }
  }, [session, status])

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          <Button
            variant={isConnected ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => signIn('google')}
            disabled={isConnected}
          >
            {isConnected ? (
              <>
                <CheckCircle />
                Conectado
              </>
            ) : (
              <>
                Conectar
                <ArrowRight />
              </>
            )}
          </Button>
        </ConnectItem>

        <Button type="submit" disabled={!isConnected}>
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}
