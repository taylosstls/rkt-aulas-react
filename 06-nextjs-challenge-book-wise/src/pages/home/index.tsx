import { NextPageWithLayout } from '@/pages/_app.page'
import { DefaultLayout } from '@/layouts/DefaultLayout'
import Ratings from '@/components/Ratings'

import { HomeContainer } from './styles'
import PopularBooks from '@/components/PopularBooks'

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <HomeContainer>
        <Ratings />
        <PopularBooks />
      </HomeContainer>
    </>
  )
}

HomePage.getLayout = (page) => {
  return <DefaultLayout title="Início">{page}</DefaultLayout>
}

export default HomePage
