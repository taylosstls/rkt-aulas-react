import Image from "next/image";
import { LoginContainer, LogoSection, WelcomeSection } from "./styles";
import { Heading, Text } from "@/components/Typography";
import AuthButtons from "@/components/AuthButtons";
import Head from "next/head";

export default function Login() {
  return (
    <>
      <LoginContainer>
        <Head>
          <title>Login | BookWise</title>
        </Head>
        <LogoSection>
          <Image src={'/images/logo.svg'} width={232} height={58} alt="BookWise Logo" priority />
        </LogoSection>

        <WelcomeSection>
          <Heading size={"lg"} color={'gray-100'}>Boas vindas</Heading>
          <Text color={'gray-200'}>Faça seu login ou acesse como visitante.</Text>

          <AuthButtons />
        </WelcomeSection>
      </LoginContainer>
    </>
  )
}