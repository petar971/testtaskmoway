import cover from '../assets/cover1440.png'
import Head from 'next/head'
import MainBanner from '../blocks/mainBanner'
import CategoryBlock from '../blocks/categoryBlock'
import ProductBlock from '../blocks/productBlock'
import RecipesBlock from '../blocks/recipesBlock'
import ProductCarouselBlock from '../blocks/productCarouselBlock'
export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <MainBanner/>
        <CategoryBlock/>
        <ProductBlock title={"Най-нови продукти"}/>
        <RecipesBlock  title={"Нашите рецепти"}/>
        <ProductBlock title={"Намалени продукти"}/>

      </main>

    </div>
  )
}
