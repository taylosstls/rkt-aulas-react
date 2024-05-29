import { Avatar, Button, Heading, MultiStep, Text, TextArea } from '@ignite-ui/react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { ArrowRight } from 'phosphor-react'
import { z } from 'zod'

import { Container, Header } from '../styles'
import { ProfileBox, FormAnnotation } from './styles'
import { buildNextAuthOptions } from '../../api/auth/[...nextauth].api'
import { api } from '../../../lib/axios'

const updateProfileSchema = z.object({
  bio: z.string()
})

type UpdateProfileData = z.infer<typeof updateProfileSchema>

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema)
  })

  const router = useRouter()
  const session = useSession()

  async function handleUpdateProfile(data: UpdateProfileData) {
    await api.put('/users/profile', {
      bio: data.bio
    })

    await router.push(`/schedule/${session.data?.user.username}`)
  }

  return (
    <Container>
      <Header>
        <Heading as={'h2'}>Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={4}></MultiStep>

        <ProfileBox as={'form'} onSubmit={handleSubmit(handleUpdateProfile)}>
          <label>
            <Text size={'sm'}>Foto de perfil</Text>
            {session.data?.user.avatar_url ?
              <Avatar src={session.data?.user.avatar_url} referrerPolicy="no-referrer" alt={session.data?.user.name} /> :
              <Avatar />
            }
          </label>

          <label>
            <Text size={'sm'}>Sobre você</Text>
            <TextArea {...register('bio')} />
            <FormAnnotation size={'sm'}>
              Fale um pouco sobre você. Isto será exibido em sua página pessoal.
            </FormAnnotation>
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Salvar
            <ArrowRight />
          </Button>
        </ProfileBox>

      </Header>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // Precisa passá-los como NextPageContext para resgatar o ServerSession
  const session = await getServerSession(req, res, buildNextAuthOptions(req, res))

  return {
    props: {
      session
    }
  }
}
