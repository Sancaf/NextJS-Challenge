import Head from 'next/head'
import styles from '@/styles/Home.module.css'

import Card from '@/components/card'
import { Product } from '@/models/product.model'
import products from '../../public/data/products'

export async function getStaticProps() {
  return {
    props: {
      products,
    },
  }
}

export default function Home({ products }: { products: Product[] }) {
  return (
    <>
      <Head>
        <title>NextJS Challenge</title>
        <meta name="description" content="beer e-commerce" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className="products-list-container">
          {products.map((product: Product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </main>
    </>
  )
}
