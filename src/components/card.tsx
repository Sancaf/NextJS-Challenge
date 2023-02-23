import Img from 'next/image'

import { Product } from '@/models/product.model'
import Link from 'next/link'

function Card({ product }: { product: Product }) {
  return (
    <Link
      rel="stylesheet"
      href={{
        pathname: `/${product.id}-${product.brand.replace(/\s+/g, '-')}`,
      }}
      key={product.id}
      className="card"
    >
      <h2>{product.brand}</h2>
      <Img src={product.image} alt={product.brand} width={300} height={200} />
    </Link>
  )
}

export default Card
