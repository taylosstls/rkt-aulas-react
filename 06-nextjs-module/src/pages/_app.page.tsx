import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { QueryClientProvider } from '@tanstack/react-query'

import { globalStyles } from '../styles/global'
import { queryClient } from '../lib/react-query'
import '../lib/dayjs'

globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <title>Ignite Call: Aplicativo de agendamento de Calls</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </QueryClientProvider>
    </>
  )
}
