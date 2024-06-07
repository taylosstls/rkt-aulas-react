import Image from "next/image";
import { AuthButton, ContainerButton } from "./styles";

export default function AuthButtons() {
  return (
    <ContainerButton>
      <AuthButton>
        <Image src={'/images/icons/google.svg'} width={32} height={32} alt="Faça login com sua conta do Google" />
        Entrar com Google
      </AuthButton>

      <AuthButton>
        <Image src={'/images/icons/github.svg'} width={32} height={32} alt="Faça login com sua conta do Github" />
        Entrar com Github
      </AuthButton>

      <AuthButton>
        <Image src={'/images/icons/rocket.svg'} width={32} height={32} alt="Entre como visitante" />
        Entrar como visitante
      </AuthButton>
    </ContainerButton>
  )
}