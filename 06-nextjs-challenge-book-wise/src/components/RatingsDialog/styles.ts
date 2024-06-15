import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import { styled, keyframes } from '@/../stitches.config'

export const DialogOverlay = styled(Dialog.Overlay, {
  position: 'fixed',
  inset: 0,
  background: '#00000099',
})

// Defina as animações usando keyframes
const slideIn = keyframes({
  from: { transform: 'translateX(100%)', opacity: 0 },
  to: { transform: 'translateX(0)', opacity: 1 },
})

const slideOut = keyframes({
  from: { transform: 'translateX(0)', opacity: 1 },
  to: { transform: 'translateX(100%)', opacity: 0 },
})

export const DialogContent = styled(Dialog.Content, {
  position: 'fixed',
  top: 0,
  right: 0,
  width: 660,
  height: '100%',
  background: '$gray800',
  boxShadow: '-4px 0px 30px 0px #00000080',
  padding: '$6 48px',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',

  '&::-webkit-scrollbar': {
    width: 6,
  },

  '&::-webkit-scrollbar-track': {
    background: '$gray700',
  },

  '&::-webkit-scrollbar-thumb': {
    background: '$gray600',
  },

  // Aplique as animações baseadas no estado do diálogo
  '&[data-state="open"]': {
    animation: `${slideIn} 300ms ease-out`,
  },

  '&[data-state="closed"]': {
    animation: `${slideOut} 300ms ease-in`,
  },
})

export const DialogClose = styled(Dialog.Close, {
  color: '$gray400',
  background: 'transparent',
  border: 'none',
  marginLeft: 'auto',
  marginBottom: '$4',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const BookDetailsWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  background: '$gray700',
  padding: '$6 $8',
  borderRadius: '$md',
})

export const BookDetailsContainer = styled('div', {
  display: 'flex',
  gap: '$8',
})

export const BookImage = styled(Image, {
  borderRadius: '$md',
  objectFit: 'cover',
  minWidth: 171,
})

export const BookContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

export const BookInfos = styled('div', {
  marginTop: 40,
  paddingTop: 24,
  borderTop: '1px solid $gray600',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 60,
})
