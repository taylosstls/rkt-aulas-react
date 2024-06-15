import Link from '@/components/Link'
import { Text } from '@/components/Typography'
import { Container } from './styles'
import BookCard, { BookWithAvgRating } from '../BookCard'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

export default function PopularBooks() {
  const { data: popularBook } = useQuery<BookWithAvgRating[]>({
    queryKey: ['popular-books'],
    queryFn: async () => {
      const { data } = await api.get('/books/popular')

      console.log(data)
      return data?.books ?? []
    },
  })

  return (
    <Container>
      <header>
        <Text size={'sm'}>Livros populares</Text>
        <Link href={'/explore'} text="Ver todos" />
      </header>

      <section>
        {popularBook?.map((book) => {
          return <BookCard key={book.id} book={book} />
        })}
      </section>
    </Container>
  )
}
