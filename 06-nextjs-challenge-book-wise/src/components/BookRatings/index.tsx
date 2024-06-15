import { Fragment, useState } from 'react'
import { useSession } from 'next-auth/react'

import { Text } from '../Typography'
import Link from '../Link'
import UserRatingCards, { RatingWithAuthor } from '../UserRatingCards'
import { RatingForm } from '../RatingsDialog/RatingForm'
import LoginDialog from '../LoginDialog'

import { Container } from './styles'

type BookRatingsProps = {
  ratings: RatingWithAuthor[]
  bookId: string
}

export default function BookRatings({ ratings, bookId }: BookRatingsProps) {
  const { status, data } = useSession()
  const [showForm, setShowForm] = useState(false)

  const isAuthenticated = status === 'authenticated'

  function handleRate() {
    if (!isAuthenticated) return
    setShowForm((prevStats) => !prevStats)
  }

  const RatingWrapper = isAuthenticated ? Fragment : LoginDialog

  const sortedRatingByDate = ratings.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  const alreadyRated = ratings.every((user) => user.user_id !== data?.user?.id)

  return (
    <Container>
      <header>
        <Text>Avaliações</Text>

        {alreadyRated && (
          <RatingWrapper>
            <Link
              text={!showForm ? 'Avaliar' : 'Fechar'}
              withoutIcon
              onClick={() => handleRate()}
            />
          </RatingWrapper>
        )}
      </header>

      <section>
        {showForm && (
          <RatingForm bookId={bookId} onCancel={() => setShowForm(false)} />
        )}
        {sortedRatingByDate.map((rating) => {
          return <UserRatingCards key={rating.id} rating={rating} />
        })}
      </section>
    </Container>
  )
}
