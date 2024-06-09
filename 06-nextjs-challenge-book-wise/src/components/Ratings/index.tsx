import { ChartLineUp } from '@phosphor-icons/react'

import Pagetitle from '@/components/PageTitle'
import { Text } from '@/components/Typography'

import { Container } from './styles'
import RatingCards from './RatingCards'

export default function Ratings() {
  return (
    <Container>
      <Pagetitle title="Início" icon={<ChartLineUp size={32} />} />

      <Text>Avaliações mais recentes</Text>

      <section>
        {Array.from({ length: 5 }).map((_, i) => {
          return (
            <RatingCards
              key={i}
              rating={{
                id: 'aa',
                rate: 4,
                book_id: 'asdadsassdads',
                description: 'descrição de alguma coisa',
                user_id: 'asdassaadsasdasdd',
                user: {
                  name: 'Gustavo Teixeira',
                  avatar_url:
                    'https://avatars.githubusercontent.com/u/45001547',
                  email: 'luisgustavogto@gmail.com',
                  id: 'asdasdasdasd',
                  created_at: new Date(),
                },
                book: {
                  author: 'Nome do Autor',
                  summary: 'Texto da descrição do livro',
                  name: 'Nome do Livro',
                  total_pages: 300,
                  cover_url: 'https://avatars.githubusercontent.com/u/45001547',
                  id: 'asasdasdasdas',
                  created_at: new Date(),
                },
                created_at: new Date(),
              }}
            />
          )
        })}
      </section>
    </Container>
  )
}