import Image from 'next/image'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'
import { SignIn, SignOut } from '@phosphor-icons/react'

import { Text } from '@/components/Typography'
import Avatar from '@/components/Avatar'
import Navigation from '@/layouts/Navigation'

import { Container, LoginButton, UserDetails } from './styles'

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
