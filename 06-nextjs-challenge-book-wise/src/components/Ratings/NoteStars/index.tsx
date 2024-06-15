import { useState } from 'react'
import { Star } from '@phosphor-icons/react'
import { ComponentProps } from '@stitches/react'

import { Container } from './styles'

type NoteStarsProps = ComponentProps<typeof Container> & {
  rating: number
  size?: 'sm' | 'md' | 'lg'
  setRating?: (rating: number) => void
}

export default function NoteStars({
  rating,
  size = 'sm',
  setRating,
  ...props
}: NoteStarsProps) {
  const [previewValue, setPreviewValue] = useState(0)

  const isEditable = !!setRating // Checa se o componente é editável ou não

  const ratingValue = isEditable ? previewValue : rating

  // Efeito de 'hover'
  const handleMouseEnter = (value: number) => {
    if (isEditable) setPreviewValue(value)
  }

  // Ao tirar o mouse, mantém o valor anterior ou default
  const handleMouseLeave = () => {
    if (isEditable) setPreviewValue(rating)
  }

  // Confirma o valor
  const handleSetValue = () => {
    if (isEditable) setRating(ratingValue)
  }

  return (
    <Container
      css={isEditable ? { cursor: 'pointer' } : undefined}
      size={size}
      {...props}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={`star-${i}`}
          weight={i + 1 <= ratingValue ? 'fill' : 'regular'}
          onMouseEnter={() => handleMouseEnter(i + 1)}
          onMouseLeave={handleMouseLeave}
          onClick={handleSetValue}
        />
      ))}
    </Container>
  )
}
