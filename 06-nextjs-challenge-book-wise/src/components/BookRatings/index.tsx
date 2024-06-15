import { Text } from '../Typography'
import Link from '../Link'
import { Container } from './styles'
import UserRatingCards, { RatingWithAuthor } from '../UserRatingCards'

type BookRatingsProps = {
  ratings: RatingWithAuthor[]
}

export default function BookRatings({ ratings }: BookRatingsProps) {

  function handleRate() {
    console.log('Avaliar')
  }

  return (
    <Container>
      <header>
        <Text>Avaliações</Text>

        <Link text="Avaliar" withoutIcon onClick={() => handleRate()} />
      </header>

      <section>
        {ratings.map((rating) => {
          return (
            <UserRatingCards key={rating.id} rating={rating} />
          )
        })}
      </section>
    </Container>
  )
}
