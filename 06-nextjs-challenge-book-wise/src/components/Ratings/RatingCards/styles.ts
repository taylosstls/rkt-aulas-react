import { styled } from '@/../stitches.config'
import Image from 'next/image'

export const Container = styled('div', {
  width: '100%',
  padding: '$8',
  borderRadius: '$md',
  background: '$gray700',
})

export const UserDetails = styled('div', {
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'space-between',
  marginBottom: '$10',

  section: {
    display: 'flex',
    alignItems: 'center',
    gap: '$4',
  },
})

export const BookDetails = styled('div', {
  display: 'flex',
  gap: '$5',

  img: {
    borderRadius: 4,
  },
})

export const BookImage = styled(Image, {
  minWidth: 108,
  height: 152,
  objectFit: 'cover',
  transition: 'all .3s',

  '&:hover': {
    filter: 'brightness(1.2)',
  },
})

export const BookContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

export const SeeMoreText = styled('button', {
  background: 'none',
  border: '0 none',
  fontSize: '$sm',
  color: '$purple100',
  fontWeight: '$bold',
  marginLeft: '$5',
  transition: 'all .3s',

  '&:hover': {
    color: '$green100',
  },
})
