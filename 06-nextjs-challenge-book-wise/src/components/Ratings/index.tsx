import { ChartLineUp } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'

import Pagetitle from '@/components/PageTitle'
import { Text } from '@/components/Typography'

import RatingCards, { RatingAuthorBook } from './RatingCards'
import { Container } from './styles'

export default function Ratings() {
  const { data: ratings } = useQuery<RatingAuthorBook[]>({
    queryKey: ['latest-ratings'],
    queryFn: async () => {
      const { data } = await api.get('/ratings/latest')

      console.log(data)
      return data?.ratings ?? []
    },
  })
  return (
    <Container>
      <Pagetitle title="Início" icon={<ChartLineUp size={32} />} />

      <Text>Avaliações mais recentes</Text>

      <section>
        {ratings?.map((rating) => {
          return <RatingCards key={rating.id} rating={rating} />
        })}
      </section>
    </Container>
  )
}
