import { Box, Text, styled } from "@ignite-ui/react";

export const IntervalBox = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column'
})

export const IntervalsContainer = styled('div', {
  border: '1px solid $gray600',
  borderRadius: '$md',
  marginBottom: '$4'
})

export const IntervalItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$3 $4',

  '& + &': {
    borderTop: '1px solid $gray600',
  },
})

export const IntervalDay = styled('div', {
  'label': {
    display: 'flex',
    alignItems: 'center',
    gap: '$3',
    cursor: 'pointer',
  }
})

export const IntervalInputs = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  'input::-webkit-calendar-picker-indicator': {
    filter: 'invert(100%) brightness(30%) saturate(0%)',
  }
})

export const FormError = styled('div', {
  border: '1px solid #f75a68',
  padding: '$3',
  borderRadius: '$md',
  display: 'flex',
  alignItems: 'center',
  marginTop: '$2',
  marginBottom: '$4',
  gap: '$3',
  color: '#f75a68',

  [`> ${Text}`]: {
    color: '#f75a68',
    lineHeight: '$short',
  },
})