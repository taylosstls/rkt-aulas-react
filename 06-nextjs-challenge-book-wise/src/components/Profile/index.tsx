import { Container, RatingsList } from './styles'
import { MagnifyingGlass, User } from '@phosphor-icons/react'
import { Book, CategoriesOnBooks, Category, Rating } from '@prisma/client'
import { ProfileRatingCard } from './ProfileRatings/ProfileRatingCard'
import { useMemo, useState } from 'react'
import InputForm from './ProfileRatings/InputForm'
import Pagetitle from '@/components/PageTitle'
import Link from '@/components/Link'
import { Text } from '@/components/Typography'

export type ProfileRating = Rating & {
  book: Book & {
    categories: CategoriesOnBooks &
      {
        category: Category
      }[]
  }
}

type ProfileProps = {
  ratings: ProfileRating[]
  isOwnProfile?: boolean
}

export default function Profile({ ratings, isOwnProfile }: ProfileProps) {
  console.log(ratings, isOwnProfile)

  const [search, setSearch] = useState('')

  const filteredRatings = useMemo(() => {
    return ratings.filter((rating) => {
      return rating.book.name.toLowerCase().includes(search.toLowerCase())
    })
  }, [ratings, search])

  return (
    <Container>
      {isOwnProfile ? (
        <Pagetitle icon={<User size={25} />} title="Perfil" />
      ) : (
        <Link
          href="/"
          text="Voltar"
          iconSide="left"
          color="white"
          css={{ alignSelf: 'flex-start' }}
        />
      )}
      <InputForm
        placeholder="Buscar livro avaliado"
        icon={<MagnifyingGlass size={20} />}
        css={{ marginTop: 40, marginBottom: 32 }}
        value={search}
        onChange={({ target }) => setSearch(target.value)}
      />
      <RatingsList>
        {filteredRatings.length <= 0 && (
          <>
            <Text color="gray-400" css={{ textAlign: 'center' }}>
              {search
                ? 'Nenhum resultado encontrado'
                : 'Nenhuma avaliação encontrada'}
            </Text>
          </>
        )}

        {filteredRatings?.map((rating) => (
          <ProfileRatingCard key={rating.id} rating={rating} />
        ))}
      </RatingsList>
    </Container>
  )
}
