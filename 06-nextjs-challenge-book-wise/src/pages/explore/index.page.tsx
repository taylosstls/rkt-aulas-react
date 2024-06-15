import { useState } from 'react'
import { Binoculars, MagnifyingGlass } from '@phosphor-icons/react'
import { DefaultLayout } from '@/layouts/DefaultLayout'
import { NextPageWithLayout } from '../_app.page'
import Pagetitle from '@/components/PageTitle'

import { ExploreContainer, TagsContainer, BooksGrid } from './styles'
import SearchInput from '@/components/SearchInput'
import TagButton from '@/components/TagButton'
import BookCard, { BookWithAvgRating } from '@/components/BookCard'
import { useQuery } from '@tanstack/react-query'
import { Category } from '@prisma/client'
import { api } from '@/lib/axios'

const ExplorePage: NextPageWithLayout = () => {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const { data: categories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get('/books/categories')

      console.log(data)
      return data?.categories ?? []
    },
  })

  const { data: books } = useQuery<BookWithAvgRating[]>({
    queryKey: ['books', selectedCategory],
    queryFn: async () => {
      const { data } = await api.get('/books', {
        params: {
          category: selectedCategory
        }
      })

      console.log(data)
      return data?.books ?? []
    },
  })

  const filteredBooks = books?.filter(book => {
    return book.name.toLowerCase().includes(search.toLowerCase())
      || book.author.toLowerCase().includes(search.toLowerCase())
      || book.summary.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <>
      <ExploreContainer>
        <header>
          <Pagetitle title="Explorar" icon={<Binoculars size={32} />} />
          <SearchInput
            placeholder="Buscar livro ou autor"
            icon={<MagnifyingGlass size={20} />}
            css={{ maxWidth: 433 }}
            value={search}
            onChange={({ target }) => setSearch(target.value)}
          />
        </header>

        <TagsContainer>
          <TagButton
            onClick={() => setSelectedCategory(null)}
            active={selectedCategory === null}
          >
            Todos
          </TagButton>
          {categories?.map((category) => (
            <TagButton
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              active={selectedCategory === category.id}
            >
              {category.name}
            </TagButton>
          ))}
        </TagsContainer>

        <BooksGrid>
          {filteredBooks?.map(book => {
            return (
              <BookCard key={book.id} book={book} size={'lg'} />
            )
          })}
        </BooksGrid>
      </ExploreContainer>
    </>
  )
}

ExplorePage.getLayout = (page) => {
  return <DefaultLayout title="Explorar">{page}</DefaultLayout>
}

export default ExplorePage
