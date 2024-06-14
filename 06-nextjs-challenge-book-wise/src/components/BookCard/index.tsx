import { Book } from "@prisma/client";
import { Container, BookImage, BookDetails, BookName } from "./styles";
import { Text } from "../Typography";
import NoteStars from "../Ratings/NoteStars";

export type BookWithAvgRating = Book & {
  avgRating: number
}

type BookCardProps = {
  book: BookWithAvgRating
  size?: 'md' | 'lg'
}

export default function BookCard({ book, size = 'md' }: BookCardProps) {
  const IMAGE_SIZES = {
    md: {
      width: 64,
      height: 94
    },
    lg: {
      width: 108,
      height: 151
    }
  }
  return (
    <Container>
      <BookImage width={IMAGE_SIZES[size].width} height={IMAGE_SIZES[size].height} alt={book.name} src={book.cover_url}
        css={{ minWidth: IMAGE_SIZES[size].width }} />

      <BookDetails>
        <div>
          <BookName size={'xs'}>
            {book.name}
          </BookName>
          <Text size={'sm'} color={'gray-400'}>
            {book.author}
          </Text>
        </div>

        <NoteStars rating={book.avgRating} />
      </BookDetails>
    </Container>
  )
}