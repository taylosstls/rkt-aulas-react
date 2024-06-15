import { Text } from '../Typography'
import Link from '../Link'
import { Container } from './styles'
import UserRatingCards, { RatingWithAuthor } from '../UserRatingCards'
import { useState } from 'react'
import { RatingForm } from '../RatingsDialog/RatingForm'

type BookRatingsProps = {
  ratings: RatingWithAuthor[]
  bookId: string
}

export default function BookRatings({ ratings, bookId }: BookRatingsProps) {
  const [showForm, setShowForm] = useState(false)

  function handleRate() {
    setShowForm((prevStats) => !prevStats)
  }

  const sortedRatingByDate = ratings.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  return (
    <Container>
      <header>
        <Text>Avaliações</Text>

        <Link
          text={!showForm ? 'Avaliar' : 'Fechar'}
          withoutIcon
          onClick={() => handleRate()}
        />
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
