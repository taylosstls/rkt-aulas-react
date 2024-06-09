import { Book, Rating, User } from '@prisma/client'
import Link from 'next/link'

import { Heading, Text } from '@/components/Typography'
import Avatar from '@/components/Avatar'
import NoteStars from '@/components/Ratings/NoteStars'

import { getRelativeTimeString } from '@/utils/getRelativeTimeString'
import {
  BookContent,
  BookDetails,
  BookImage,
  Container,
  SeeMoreText,
  UserDetails,
} from './styles'
import useShowMoreText from '@/hooks/useShowMoreText'

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

  const { textDescription, buttonSeeMore, isShowingMore } = useShowMoreText(
    rating.book.summary,
    180,
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

      <BookDetails>
        <Link href={`/explore?book=${rating.book_id}`}>
          <BookImage
            src={rating.book.cover_url}
            alt={rating.book.name}
            width={108}
            height={152}
          />
        </Link>

        <BookContent>
          <div>
            <Heading size={'xs'}>{rating.book.name}</Heading>
            <Text size={'sm'} color={'gray-400'}>
              {rating.book.author}
            </Text>
          </div>

          <Text size={'sm'} color={'gray-300'}>
            {textDescription}
            {rating.book.summary.length > 180 && (
              <SeeMoreText onClick={buttonSeeMore}>
                {isShowingMore ? 'Ver menos' : 'Ver mais'}
              </SeeMoreText>
            )}
          </Text>
        </BookContent>
      </BookDetails>
    </Container>
  )
}
