import { ReactNode } from 'react'
import { Container, Content } from './styles'
import Head from 'next/head'

import { Sidebar } from '@/layouts/Sidebar'

type DefaultLayoutProps = {
  children: ReactNode
  title: string
}

export function DefaultLayout({ children, title }: DefaultLayoutProps) {
  return (
    <Container>
      <Head>
        <title>{`${title} | BookWise`}</title>
      </Head>

      <Sidebar />
      <Content>{children}</Content>
    </Container>
  )
}
