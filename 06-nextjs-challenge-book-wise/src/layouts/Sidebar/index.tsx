import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { SignIn, SignOut } from '@phosphor-icons/react'
import { Text } from '@/components/Typography'
import { Avatar } from '@/components/Avatar'
import { useRouter } from 'next/router'

import { Container, LoginButton, UserDetails } from './styles'
import { Navigation } from '../Navigation'

export function Sidebar() {
  const { data } = useSession()
  const router = useRouter()

  const user = data?.user

  function handleOpenProfile() {
    router.push(`/profile/${user?.id}`)
  }

  return (
    <Container>
      <div>
        <Image
          src={'/images/logo.svg'}
          width={128}
          height={32}
          alt="BookWise Logo"
          priority
        />

        <Navigation />
      </div>

      <footer>
        {!user ? (
          <LoginButton href={'/login'}>
            Fazer login <SignIn />
          </LoginButton>
        ) : (
          <UserDetails>
            <Avatar
              size={'sm'}
              src={user?.avatar_url ? user?.avatar_url : ''}
              alt={user.name}
              pointerCursor={'eventPoint'}
              onClick={() => handleOpenProfile()}
            />
            <Text size={'sm'}>{user.name}</Text>
            <SignOut color="#F75A68" onClick={() => signOut()} />
          </UserDetails>
        )}
      </footer>
    </Container>
  )
}
