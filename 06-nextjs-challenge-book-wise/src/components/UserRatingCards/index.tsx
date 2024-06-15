import Link from 'next/link'
import { Container, UserDetails } from './styles'
import { Rating, User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import Avatar from '../Avatar'
import { Heading, Text } from '../Typography'
import { getRelativeTimeString } from '@/utils/getRelativeTimeString'
import NoteStars from '../Ratings/NoteStars'

export type RatingWithAuthor = Rating & {
  user: User
}

type UserRatingCardsProps = {
  rating: RatingWithAuthor
}

export default function UserRatingCards({ rating }: UserRatingCardsProps) {
  const { data: session } = useSession()
  const distance = getRelativeTimeString(new Date(rating.created_at), 'pt-br')

  const isOwner = session?.user?.id === rating.user_id

  return (
    <Container variant={isOwner ? 'highLight' : 'primary'}>
      <UserDetails>
        <section>
          <Link href={`/profile/${rating.user_id}`}>
            <Avatar alt={rating.user.name} src={rating.user.avatar_url!} />
          </Link>

          <div>
            <Heading size={'xs'}>{rating.user.name}</Heading>
            <Text size={'sm'} color={'gray-400'}>
              {distance}
            </Text>
          </div>
        </section>

        <NoteStars rating={rating.rate} />
      </UserDetails>

      <Text size={'sm'} color={'gray-300'}>
        {rating.description}
      </Text>
    </Container>
  )
}
