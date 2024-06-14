import Link from "@/components/Link";
import { Text } from '@/components/Typography'
import { Container } from "./styles";
import BookCard from "../BookCard";

export default function PopularBooks() {

  return (
    <Container>
      <header>
        <Text size={'sm'}>Livros populares</Text>
        <Link href={'/explore'} text='Ver todos' />
      </header>

      <section>
        {Array.from({ length: 4 })
          .map((_, i) => {
            return (
              <BookCard key={`popularBook-${i}`} book={{
                name: 'Nome do livro',
                author: 'Nome do autor',
                avgRating: 4,
                cover_url: '/images/books/o-hobbit.png',
                created_at: new Date(),
                id: 'asduihasdncsadnj',
                summary: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, optio animi quos exercitationem dicta magnam ipsam! Rerum, totam, repellat voluptate non ullam fuga laudantium, exercitationem a aperiam ex ea error.',
                total_pages: 250
              }} />
            )
          })
        }
      </section>
    </Container>
  )
}