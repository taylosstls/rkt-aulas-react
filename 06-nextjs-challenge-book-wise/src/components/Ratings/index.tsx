import { ChartLineUp } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'

import Pagetitle from '@/components/PageTitle'
import { Text } from '@/components/Typography'

import RatingCards, { RatingAuthorBook } from './RatingCards'
import { useSession } from 'next-auth/react'

import { Container, LatestContainer } from './styles'
import Link from '../Link'

export default function Ratings() {
  const { data: ratings } = useQuery<RatingAuthorBook[]>({
    queryKey: ['latest-ratings'],
    queryFn: async () => {
      const { data } = await api.get('/ratings/latest')

      console.log(data)
      return data?.ratings ?? []
    },
  })

  const { data: session } = useSession()

  const userId = session?.user?.id

  const { data: latestUserRating } = useQuery<RatingAuthorBook>({
    queryKey: ['latest,user-rating', userId],
    queryFn: async () => {
      const { data } = await api.get(`ratings/user-latest`)

      console.log(data)
      return data?.rating ?? null
    },
    enabled: !!userId,
  })

  return (
    <Container>
      <Pagetitle title="Início" icon={<ChartLineUp size={32} />} />

      {latestUserRating && (
        <LatestContainer>
          <header>
            <Text size={'sm'}>Sua última avaliação</Text>
            <Link href={`/profile/${userId}`} text="Ver todas" />
          </header>

          <RatingCards variant="compact" rating={latestUserRating} />
        </LatestContainer>
      )}

      <Text>Avaliações mais recentes</Text>

      <section>
        {ratings?.map((rating) => {
          return <RatingCards key={rating.id} rating={rating} />
        })}
      </section>
    </Container>
  )
}
