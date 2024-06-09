import { styled, keyframes } from '@/../stitches.config'

// Definindo a animação de gradiente
const gradientTransition = keyframes({
  '0%': { backgroundPosition: '0% 50%' },
  '100%': { backgroundPosition: '100% 50%' },
})

export const ContainerButton = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})

export const AuthButton = styled('button', {
  width: '100%',
  height: 72,
  background: 'linear-gradient(to right, $gray600, $gray500)',
  backgroundSize: '200% 200%',
  color: 'white',
  border: '0 none',
  fontWeight: '$bold',
  fontSize: '$lg',
  borderRadius: '$md',
  paddingInline: '$6',
  display: 'flex',
  alignItems: 'center',
  gap: '$6',
  transition: 'all .3s',

  '&:hover': {
    animation: `${gradientTransition} .3s ease-in-out`,
    backgroundPosition: '100% 50%',
  },
})
