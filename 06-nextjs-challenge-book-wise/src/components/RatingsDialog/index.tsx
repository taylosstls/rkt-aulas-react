import { ReactNode } from 'react'
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

type RatingDialogProps = {
  children: ReactNode
}

export default function RatingsDialog({ children }: RatingDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <DialogOverlay />

        <DialogContent>
          <DialogClose>
            <X size={24} />
          </DialogClose>

          <BookDetailsWrapper>
            <BookDetailsContainer>
              <BookImage
                width={171}
                height={242}
                alt="Book name"
                src={'https://avatars.githubusercontent.com/u/45001547?v=4'}
              />
              <BookContent>
                <div>
                  <Heading size={'sm'}>Book name</Heading>
                  <Text color={'gray-300'} css={{ marginTop: '$2' }}>
                    Gustavo Teixeira
                  </Text>
                </div>

                <div>
                  <NoteStars rating={4} />
                  <Text
                    color={'gray-400'}
                    size={'sm'}
                    css={{ marginTop: '$1' }}
                  >
                    2 avaliações
                  </Text>
                </div>
              </BookContent>
            </BookDetailsContainer>

            <BookInfos>
              <BookInfo
                icon={<BookmarkSimple />}
                title={'Categorias'}
                info={'Ficção, Ação'}
              />
              <BookInfo icon={<BookOpen />} title={'Páginas'} info={'217'} />
            </BookInfos>
          </BookDetailsWrapper>

          <BookRatings />
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
