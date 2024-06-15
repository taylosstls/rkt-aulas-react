import { styled } from '@/../stitches.config'

export const Container = styled('div', {
  padding: '$6',
  borderRadius: '$md',

  variants: {
    variant: {
      primary: {
        background: '$gray700',
      },
      highLight: {
        background: '$gray600',
      },
    },
  },
})

export const UserDetails = styled('div', {
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'space-between',
  marginBottom: '$4',

  '> section': {
    display: 'flex',
    gap: '$4',
  },
})
