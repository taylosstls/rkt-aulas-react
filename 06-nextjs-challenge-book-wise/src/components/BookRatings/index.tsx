import { useSession } from 'next-auth/react'

import { Text } from '../Typography'
import Link from '../Link'
import { Container } from './styles'
import UserRatingCards from '../UserRatingCards'

export default function BookRatings() {
  const { status, data: session } = useSession()

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
        {Array.from({ length: 5 })
          .map((_, i) => {

            return (
              <UserRatingCards key={i} rating={{
                rate: 2,
                user: {
                  name: 'Gustavo Teixeira',
                  avatar_url: 'https://avatars.githubusercontent.com/u/45001547?v=4',
                },
                created_at: new Date(),
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem consequatur temporibus beatae accusantium illum, corporis at consectetur debitis enim corrupti explicabo praesentium ipsam voluptas voluptatibus esse magnam. Velit, cumque iure.'

              }}>
              </UserRatingCards>
            )
          })
        }
      </section>
    </Container>
  )
}