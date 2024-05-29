import { Box, styled, Text, TextArea } from '@ignite-ui/react'

export const ProfileBox = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',

    [`> ${TextArea}`]: {
      resize: 'none',
      height: '10rem'
    }

  },

})

export const FormAnnotation = styled(Text, {
  color: '$gray200',
})