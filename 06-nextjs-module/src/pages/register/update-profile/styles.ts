import { Box, Button, styled, Text, TextArea } from '@ignite-ui/react'

export const ProfileBox = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',

    [`> ${TextArea}`]: {
      resize: 'none',
      height: '10rem',
    },
  },
})

export const LabelImageAvatar = styled('label', {
  width: 'fit-content',
  display: 'flex',
  flexDirection: 'row !important',
  alignItems: 'center',
  marginBottom: '$1',

  [`${Button}`]: {
    display: 'block',
    marginLeft: '$5',
  },
})

export const ChangeInputAvatar = styled('input', {
  display: 'none',
})

export const FormAnnotation = styled(Text, {
  color: '$gray200',
})
