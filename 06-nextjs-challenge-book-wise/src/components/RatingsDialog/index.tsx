import { ReactNode, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { BookOpen, BookmarkSimple, X } from '@phosphor-icons/react'

import BookInfo from './BookInfo'
import NoteStars from '@/components/Ratings/NoteStars'
import { Heading, Text } from '../Typography'

import {
  BookContent,
  BookDetailsContainer,
  BookDetailsWrapper,
  BookImage,
  BookInfos,
  DialogClose,
  DialogContent,
  DialogOverlay,
} from './styles'
import BookRatings from '../BookRatings'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { BookWithAvgRating } from '../BookCard'
import { RatingWithAuthor } from '../UserRatingCards'
import { CategoriesOnBooks, Category } from '@prisma/client'

type BookDetailsProps = BookWithAvgRating & {
  ratings: RatingWithAuthor[]
  categories: (CategoriesOnBooks & {
    category: Category
  })[]
}

type RatingDialogProps = {
  children: ReactNode
  bookId: string
}

export default function RatingsDialog({ children, bookId }: RatingDialogProps) {
  const [open, setOpen] = useState(false)

  const { data: book } = useQuery<BookDetailsProps>({
    queryKey: ['book', bookId],
    queryFn: async () => {
      const { data } = await api.get(`/books/details/${bookId}`)

      console.log(data)
      return data?.book ?? []
    },
    enabled: open,
  })

  const ratingsCount = book?.ratings?.length ?? 0
  const ratingsMessage = ratingsCount === 1 ? 'avaliação' : 'avaliações'
  const categoryNames = book?.categories
    ? book?.categories?.map((item) => item.category.name).join(', ')
    : ''

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <DialogOverlay />

        <DialogContent>
          <DialogClose>
            <X size={24} />
          </DialogClose>

          {!book ? (
            <p>Carregando...</p>
          ) : (
            <BookDetailsWrapper>
              <BookDetailsContainer>
                <BookImage
                  width={171}
                  height={242}
                  alt={book?.name}
                  src={book?.cover_url}
                />
                <BookContent>
                  <div>
                    <Heading size={'sm'}>{book?.name}</Heading>
                    <Text color={'gray-300'} css={{ marginTop: '$2' }}>
                      {book?.author}
                    </Text>
                  </div>

                  <div>
                    <NoteStars rating={book?.avgRating} />
                    <Text
                      color={'gray-400'}
                      size={'sm'}
                      css={{ marginTop: '$1' }}
                    >
                      {ratingsCount} {ratingsMessage}
                    </Text>
                  </div>
                </BookContent>
              </BookDetailsContainer>

              <BookInfos>
                <BookInfo
                  icon={<BookmarkSimple />}
                  title={'Categorias'}
                  info={categoryNames}
                />
                <BookInfo
                  icon={<BookOpen />}
                  title={'Páginas'}
                  info={String(book?.total_pages ?? 0)}
                />
              </BookInfos>
            </BookDetailsWrapper>
          )}
          {book?.ratings && <BookRatings ratings={book.ratings} />}
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
