import { styled } from '@/../stitches.config'
import { Text } from '@/components/Typography'

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$5',

  [`> div ${Text}:last-child`]: {
    fontWeight: '$bold',
  },

  svg: {
    width: 32,
    height: 32,
    color: '$green100',
  },
})
