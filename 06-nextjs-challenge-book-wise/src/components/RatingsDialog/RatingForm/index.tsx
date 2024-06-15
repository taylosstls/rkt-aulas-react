import { FormEvent, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Check, X } from '@phosphor-icons/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'

import Avatar from '@/components/Avatar'
import { Heading } from '@/components/Typography'
import NoteStars from '@/components/Ratings/NoteStars'

import TextareaForm from './TextareaForm'

import {
  ActionsContainer,
  Container,
  FormContainer,
  UserDetails,
} from './styles'
import ButtonForm from './ButtonForm'

type RatingFormProps = {
  onCancel: () => void
  bookId: string
}

export const RatingForm = ({ bookId, onCancel }: RatingFormProps) => {
  const { data: session } = useSession() // Pega os dados do usuário logado

  const user = session?.user

  const [description, setDescription] = useState('')
  const [currentRate, setCurrentRate] = useState(0)

  const queryClient = useQueryClient()

  const submitDisabled = !description.trim() || !currentRate

  const rateBook = async ({
    bookId,
    description,
    currentRate,
  }: {
    bookId: string
    description: string
    currentRate: number
  }) => {
    await api.post(`/books/${bookId}/rate`, {
      description,
      rate: currentRate,
    })
  }

  const mutation = useMutation({
    mutationFn: rateBook,
    onSuccess: () => {
      onCancel(); // Fecha o form

      // Atualiza a busca do queryClient
      queryClient.invalidateQueries({ queryKey: ['book', bookId] });
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
    onError: (error) => {
      console.error('Error rating the book:', error)
    },
  })

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (submitDisabled) return

    try {
      await mutation.mutateAsync({ bookId, description, currentRate })
      // Optionally, handle success here, like showing a message or resetting the form
    } catch (error) {
      // Optionally, handle error here
      console.error(error)
    }
  }

  return (
    <Container>
      {user && (
        <UserDetails>
          <section>
            <Avatar alt={user.name} src={user.avatar_url!} />
            <Heading size="xs">{user.name}</Heading>
          </section>

          <NoteStars
            size="lg"
            rating={currentRate}
            setRating={setCurrentRate}
          />
        </UserDetails>
      )}

      <FormContainer onSubmit={handleSubmit}>
        <TextareaForm
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          maxLength={450}
          placeholder="Escreva sua avaliação"
        />
        <ActionsContainer>
          <ButtonForm
            type="button"
            onClick={onCancel}
            icon={<X size={20} />}
            iconColor="purple100"
          />
          <ButtonForm
            disabled={submitDisabled}
            type="submit"
            icon={<Check size={20} />}
            iconColor="green100"
          />
        </ActionsContainer>
      </FormContainer>
    </Container>
  )
}
