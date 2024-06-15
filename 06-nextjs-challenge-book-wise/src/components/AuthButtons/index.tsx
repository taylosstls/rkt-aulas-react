import Image from 'next/image'
import { AuthButton, ContainerButton } from './styles'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

type AuthButtonsProps = {
  canGuest?: boolean
  callbackUrl?: string
}

export default function AuthButtons({ canGuest, callbackUrl = '/' }: AuthButtonsProps) {
  const router = useRouter()

  const handleSignIn = (provider?: string) => {
    if (!provider) {
      router.push(callbackUrl)
      return
    }
    signIn(provider, {
      callbackUrl,
    })
  }

  return (
    <ContainerButton>
      <AuthButton onClick={() => handleSignIn('google')}>
        <Image
          src={'/images/icons/google.svg'}
          width={32}
          height={32}
          alt="Faça login com sua conta do Google"
        />
        Entrar com Google
      </AuthButton>

      <AuthButton onClick={() => handleSignIn('github')}>
        <Image
          src={'/images/icons/github.svg'}
          width={32}
          height={32}
          alt="Faça login com sua conta do Github"
        />
        Entrar com Github
      </AuthButton>

      {canGuest && (
        <AuthButton onClick={() => handleSignIn()}>
          <Image
            src={'/images/icons/rocket.svg'}
            width={32}
            height={32}
            alt="Entre como visitante"
          />
          Entrar como visitante
        </AuthButton>
      )}
    </ContainerButton>
  )
}
