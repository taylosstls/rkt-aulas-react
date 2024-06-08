import { styled } from "../../../stitches.config";

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