import { Box, Text, styled } from '@ignite-ui/react'

export const ConnectBox = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
})

export const ConnectItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: '1px solid $gray600',
  padding: '$4 $6',
  borderRadius: '$md',
  marginBottom: '$2',
})

export const AuthError = styled('div', {
  border: '1px solid #f75a68',
  padding: '$3',
  borderRadius: '$md',
  display: 'flex',
  alignItems: 'center',
  marginBlock: '1rem',
  gap: '$3',
  color: '#f75a68',

  [`> ${Text}`]: {
    color: '#f75a68',
    lineHeight: '$short',
  },
})
