import { NextPageWithLayout } from '@/pages/_app.page'
import { DefaultLayout } from '@/layouts/DefaultLayout'

import PopularBooks from '@/components/PopularBooks'
import Profile, { ProfileRating } from '@/components/Profile'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { api } from '@/lib/axios'
import { useSession } from 'next-auth/react'

import { HomeContainer } from './styles'

export type ProfileData = {
  user: {
    avatar_url: string
    name: string
    member_since: string
  }
  ratings: ProfileRating[]
  readPages: number
  ratedBooks: number
  readAuthors: number
  mostReadCategory?: string
}

const ProfilePage: NextPageWithLayout = () => {
  const router = useRouter()
  const userId = router.query.id as string

  const { data: session } = useSession()

  const { data } = useQuery<ProfileData>({
    queryKey: ['profile', userId],
    queryFn: async () => {
      const { data } = await api.get(`/profile/${userId}`)

      return data?.profile ?? {}
    },
    enabled: !!userId, // Verifica se ele existe
  })

  // Verifica se é o perfil atual do usuário
  const isOwnProfile = session?.user.id === userId

  console.log(data)

  return (
    <>
      <HomeContainer>
        {data ? (
          <>
            <Profile isOwnProfile={isOwnProfile} ratings={data.ratings} />
          </>
        ) : (
          <h1>Carregando...</h1>
        )}
        <PopularBooks />
      </HomeContainer>
    </>
  )
}

ProfilePage.getLayout = (page) => {
  return <DefaultLayout title="Perfil">{page}</DefaultLayout>
}

export default ProfilePage
