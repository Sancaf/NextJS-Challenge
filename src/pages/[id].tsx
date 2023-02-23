import { useEffect, useState } from 'react'

import Img from 'next/image'

import { Product } from '@/models/product.model'
import products from '../../public/data/products'

type SkuData = {
  code: string
  stock: number
  price: string
}

export function ProductDetailPage({ product }: any) {
  const [skuData, setSkuData] = useState<SkuData[]>([])

  useEffect(() => {
    const fetchStockAndPrice = async () => {
      const results = await Promise.all(
        product.skus.map(async (sku: any) => {
          const res = await fetch(`/api/stock-price/${sku.code}`)
          const { stock, price } = await res.json()
          return {
            code: sku.code,
            stock,
            price: price,
          }
        })
      )
      setSkuData(results)
    }

    fetchStockAndPrice()
  }, [])

  return (
    <div style={{ height: '100vh' }}>
      {product && (
        <div className="full-info-card">
          <div className="card-header">
            <h2>{product.brand}</h2>
            <pre>
              ({product.substyle} {product.abv})
            </pre>
          </div>
          <div className="card-header">
            <h3>Origin:</h3>
            <h4>{product.origin}</h4>
          </div>
          <Img
            src={product.image}
            alt={product.brand}
            width={300}
            height={200}
          />
          <h3>Description:</h3>
          <p style={{ padding: '0.5 2em' }}>{product.information}</p>
          <h3>Skus:</h3>
          <div style={{ display: 'flex', gap: '1em' }}>
            {skuData.map((sku) => {
              const matchingSku = product.skus.find(
                (s: any) => s.code === sku.code
              )
              return (
                <div key={sku.code} className="buy-sku-card">
                  <h4>{matchingSku?.name}:</h4>
                  <ul>
                    <li>Stock: {sku.stock}</li>
                    <li>Price: ${sku.price}</li>
                  </ul>
                  <button className="buy-beer-btn">Add to cart</button>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetailPage

export async function getStaticPaths() {
  const paths = products.map((product) => ({
    params: { id: `${product.id}-${product.brand.replace(/\s+/g, '-')}` },
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params }: any) {
  const productId = params.id.split('-')[0]
  const product = products.find((product) => product.id === parseInt(productId))

  return { props: { product }, revalidate: 5 }
}
