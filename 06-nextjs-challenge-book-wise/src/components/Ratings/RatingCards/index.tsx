import { Book, Rating, User } from '@prisma/client'
import Link from 'next/link'

import { Heading, Text } from '@/components/Typography'
import Avatar from '@/components/Avatar'
import NoteStars from '@/components/Ratings/NoteStars'
import useShowMoreText from '@/hooks/useShowMoreText'

import { getRelativeTimeString } from '@/utils/getRelativeTimeString'

import {
  BookContent,
  BookDetails,
  BookImage,
  CompactDetails,
  Container,
  SeeMoreText,
  UserDetails,
} from './styles'

export type RatingAuthorBook = Rating & {
  user: User
  book: Book
}

type RatingCardProps = {
  rating: RatingAuthorBook
  variant?: 'default' | 'compact'
}

export default function RatingCards({
  rating,
  variant = 'default',
}: RatingCardProps) {
  const publicatedDate = getRelativeTimeString(
    new Date(rating.created_at),
    'pt-BR',
  )

  const { textDescription, buttonSeeMore, isShowingMore } = useShowMoreText(
    rating.book.summary,
    180,
  )

  const distance = getRelativeTimeString(new Date(rating.created_at), 'pt-BR')

  return (
    <Container variant={variant}>
      {variant === 'default' && (
        <UserDetails>
          <section>
            <Link href={`/profile/${rating.user_id}`}>
              <Avatar
                src={rating.user.avatar_url!}
                alt={rating.user.name}
                pointerCursor={'eventPoint'}
              />
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
      )}

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
            {variant === 'compact' && (
              <CompactDetails>
                <Text size={'sm'} color={'gray-300'}>
                  {distance}
                </Text>

                <NoteStars rating={rating.rate} />
              </CompactDetails>
            )}
            <Heading size={'xs'}>{rating.book.name}</Heading>
            <Text size={'sm'} color={'gray-400'}>
              {rating.book.author}
            </Text>
          </div>

          <Text size={'sm'} color={'gray-300'} css={{ marginTop: '$5' }}>
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
