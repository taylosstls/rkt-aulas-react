import { ComponentProps } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

import { Container } from "./styles";

type LinkProps = Omit<ComponentProps<typeof Container>, 'href'> & {
  text: string
  href?: string
  onClick?: () => void
  withoutIcon?: boolean
}

export default function Link({ text, href, onClick, iconSide = 'right', withoutIcon, ...props }: LinkProps) {
  return (
    <Container {...props} href={href!} iconSide={iconSide} onClick={onClick} as={onClick ? 'button' : undefined}>
      {text}
      {!withoutIcon && (iconSide === 'right' ? <CaretRight /> : <CaretLeft />)}
    </Container>
  )
}