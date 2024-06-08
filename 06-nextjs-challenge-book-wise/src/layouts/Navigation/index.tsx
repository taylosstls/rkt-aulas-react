import { Binoculars, ChartLineUp, User } from "@phosphor-icons/react";
import { Container, NavItemContainer } from "./styles";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

// Definição dos tipos para os itens de navegação
interface NavItemProps {
  href: string;
  active: boolean;
  icon: JSX.Element;
  text: string;
}

export function Navigation() {
  const router = useRouter();

  const { data } = useSession();

  const navProfile = useMemo(() => {
    if (data) {
      return (
        <NavItem
          href={`/profile/${data.user.id}`}
          active={router.asPath === `/profile/${data.user.avatar_url}`}
          icon={<User size={24} />}
          text="Perfil"
        />
      )
    }
  }, [data, router.asPath])

  function NavItem({ href, active, icon, text }: NavItemProps) {
    return (
      <NavItemContainer href={href} active={active}>
        {icon}
        {text}
      </NavItemContainer>
    );
  }

  return (
    <Container>
      <NavItem
        href="/"
        active={router.asPath === '/'}
        icon={<ChartLineUp size={24} />}
        text="Início"
      />
      <NavItem
        href="/explore"
        active={router.asPath === '/explore'}
        icon={<Binoculars size={24} />}
        text="Explorar"
      />
      {navProfile}
    </Container>
  );
}
