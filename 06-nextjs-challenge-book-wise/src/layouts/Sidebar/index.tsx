import Image from "next/image"
import { Container } from "./styles"
import { Navigation } from "../Navigation"
import { useSession } from "next-auth/react"

export function Sidebar() {
  const { data } = useSession();

  const user = data?.user;

  return (
    <Container>
      <div>
        <Image src={'/images/logo.svg'} width={128} height={32} alt="BookWise Logo" priority />

        <Navigation />
      </div>

      <footer>
        {!user ? (
          <div>sem user</div>
        ) : (
          <div>com user</div>
        )}
      </footer>
    </Container>
  )
}