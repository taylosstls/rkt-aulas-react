import { ComponentProps } from '@stitches/react'
import { AvatarImage, Container } from './styles'

type AvatarProps = ComponentProps<typeof Container> & {
  src: string
  size?: 'sm' | 'md' | 'lg'
  alt: string
  pointerCursor?: 'eventPoint' | 'eventMouse'
}

export default function Avatar({
  src,
  alt,
  size = 'md',
  pointerCursor = 'eventMouse',
  ...props
}: AvatarProps) {
  return (
    <Container size={size} pointerCursor={pointerCursor} {...props}>
      <AvatarImage src={src} width={80} height={80} alt={alt} />
    </Container>
  )
}
