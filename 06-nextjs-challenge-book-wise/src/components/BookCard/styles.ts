import { styled } from '@/../stitches.config'
import Image from 'next/image'
import { Heading } from '../Typography'

export const Container = styled('div', {
  display: 'flex',
  gap: '$5',
  padding: '18px $5',
  background: '$gray700',
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  border: '1px solid $gray700',
  transition: 'all .3s',

  '&:hover': {
    borderColor: '$gray600',
  },
})

export const ReadBadge = styled('span', {
  position: 'absolute',
  display: 'block',
  background: '#0A313C',
  top: 0,
  right: 0,
  color: '$gray100',
  fontWeight: '$bold',
  fontSize: '$xs',
  padding: '$1 $3',
  textTransform: 'uppercase',
  borderRadius: '0 $sm 0 $sm',
})

export const BookImage = styled(Image, {
  borderRadius: '$md',
  objectFit: 'contain',
})

export const BookDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

export const BookName = styled(Heading, {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  '-webkit-line-clamp': 2,
  '-webkit-box-orient': 'vertical',
})
