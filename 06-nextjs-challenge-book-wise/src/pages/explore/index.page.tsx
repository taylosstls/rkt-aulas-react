import { DefaultLayout } from "@/layouts/DefaultLayout"
import { NextPageWithLayout } from "../_app.page"
import { ExploreContainer } from "./styles"

const ExplorePage: NextPageWithLayout = () => {

  return (
    <>
      <ExploreContainer>

      </ExploreContainer>
    </>
  )
}

ExplorePage.getLayout = (page) => {
  return <DefaultLayout title="Explorar">{page}</DefaultLayout>
}

export default ExplorePage