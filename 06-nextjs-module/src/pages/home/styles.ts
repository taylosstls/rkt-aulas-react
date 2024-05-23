import { styled, Heading, Text, globalCss } from '@ignite-ui/react'

export const bodyStyles = globalCss({
  body: {
    backgroundImage: 'url(/background-group.svg)',
    backgroundPosition: 'center left',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '75%',
    '@media(max-width: 1024px)': {
      backgroundSize: 'cover',
    },
  },
})

export const Container = styled('div', {
  maxWidth: 'calc(100vw - (100vw - 1160px) / 2)',
  marginLeft: 'auto',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  gap: '$20',
})

export const Hero = styled('div', {
  maxWidth: 480,
  padding: '0 $10',

  [`> ${Heading}`]: {
    '@media(max-width: 600px)': {
      fontSize: '$6xl',
    },
    lineHeight: '110%',
    marginBottom: '1rem',
  },

  [`> ${Text}`]: {
    maskType: '$2',
    color: '$gray200',
  },
})

export const Preview = styled('div', {
  paddingRight: '$8',
  overflow: 'hidden',

  '@media(max-width: 600px)': {
    display: 'none',
  },
})
