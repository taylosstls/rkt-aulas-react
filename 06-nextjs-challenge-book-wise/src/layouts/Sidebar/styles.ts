import Link from 'next/link'
import { styled } from '@/../stitches.config'

export const Container = styled('aside', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',

  width: 232,
  height: 'calc(100% - 40px)',
  margin: 20,
  padding: '40px 20px 24px',
  borderRadius: '$md',

  background: '$gray700 url("/images/sidebar-bg.png") no-repeat center',
  backgroundSize: 'cover',
})

export const LoginButton = styled(Link, {
  color: '$gray200',
  fontWeight: 700,
  background: 'none',
  fontSize: '$md',
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
  border: '0 none',
  textDecoration: 'none',

  svg: {
    color: '$green100',
  },
})

export const UserDetails = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',

  svg: {
    cursor: 'pointer',
  },

  p: {
    maxWidth: 100,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
})
