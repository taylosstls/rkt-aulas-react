import { Avatar, Button, Heading, MultiStep, Text, TextArea } from '@ignite-ui/react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useState } from 'react'; // Importe useState

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { ArrowRight } from 'phosphor-react'
import { z } from 'zod'

import { Container, Header } from '../styles'
import { ProfileBox, FormAnnotation } from './styles'
import { buildNextAuthOptions } from '../../api/auth/[...nextauth].api'
import { api } from '../../../lib/axios'

const updateProfileSchema = z.object({
  bio: z.string(),
  avatar: z.any().optional(),
})

type UpdateProfileData = z.infer<typeof updateProfileSchema>

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema)
  })

  const router = useRouter()
  const session = useSession()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(session.data?.user.avatar_url || null);

  async function handleUpdateProfile(data: UpdateProfileData) {
    const formData = new FormData()
    formData.append('bio', data.bio)
    if (data.avatar && data.avatar.length > 0) {
      formData.append('avatar', data.avatar[0])
    }

    await api.put('/users/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    await router.push(`/schedule/${session.data?.user.username}`)
  }

  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          const size = 96
          canvas.width = size
          canvas.height = size

          if (ctx) {
            ctx.drawImage(img, 0, 0, size, size)
            canvas.toBlob((blob) => {
              if (blob) {
                const newFile = new File([blob], file.name, { type: 'image/png' })
                setValue('avatar', [newFile])
                setAvatarUrl(URL.createObjectURL(blob)); // Atualize o estado com a nova URL da imagem
              }
            }, 'image/png')
          }
        }
        img.src = reader.result as string
      }
      reader.readAsDataURL(file)
    }
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
            {avatarUrl ? // Use avatarUrl ao invés de session.data?.user.avatar_url
              <Avatar src={avatarUrl} referrerPolicy="no-referrer" alt={session.data?.user.name} /> : // Alterado de session.data?.user.avatar_url para avatarUrl
              <Avatar />
            }
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
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
  const session = await getServerSession(req, res, buildNextAuthOptions(req, res))

  return {
    props: {
      session
    }
  }
}
