// import { useSession } from 'next-auth/react'

import { NextPageWithLayout } from '@/pages/_app.page'
import { DefaultLayout } from '@/layouts/DefaultLayout'
import Ratings from '@/components/Ratings'

import { HomeContainer } from './styles'

const HomePage: NextPageWithLayout = () => {
  // const { data } = useSession()
  return (
    <>
      <HomeContainer>
        <Ratings></Ratings>
      </HomeContainer>
    </>
  )
}

HomePage.getLayout = (page) => {
  return <DefaultLayout title="Início">{page}</DefaultLayout>
}

export default HomePage
