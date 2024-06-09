import Link from 'next/link'
import { Book, Rating, User } from '@prisma/client'

import { Text } from '@/components/Typography'
import Avatar from '@/components/Avatar'
import NoteStars from '@/components/Ratings/NoteStars'
import BookDetails from '@/components/BookDetails'

import { Container, UserDetails } from './styles'
import { getRelativeTimeString } from '@/utils/getRelativeTimeString'

export type RatingAuthorBook = Rating & {
  user: User
  book: Book
}

type RatingCardProps = {
  rating: RatingAuthorBook
}

export default function RatingCards({ rating }: RatingCardProps) {
  const publicatedDate = getRelativeTimeString(
    new Date(rating.created_at),
    'pt-BR',
  )

  return (
    <Container>
      <UserDetails>
        <section>
          <Link href={`/profile/${rating.user_id}`}>
            <Avatar src={rating.user.avatar_url!} alt={rating.user.name} />
          </Link>
          <div>
            <Text>{rating.user.name}</Text>
            <Text size={'sm'} color={'gray-400'}>
              {publicatedDate}
            </Text>
          </div>
        </section>

        <NoteStars rating={rating.rate} />
      </UserDetails>

      <BookDetails></BookDetails>
    </Container>
  )
}
