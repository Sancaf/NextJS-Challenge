import Img from 'next/image'
import { useRouter } from 'next/router'

import { Product } from '@/models/product.model'

function Card({ product }: { product: Product }) {
  const router = useRouter()
  const handleClick = (productId: number, productBrand: string) => {
    router.push(
      {
        pathname: `/${productId}-${productBrand.replace(/\s+/g, '-')}`,
        query: { data: JSON.stringify(product) },
      },
      `/${productId}-${productBrand.replace(/\s+/g, '-')}`
    )
  }
  return (
    <div
      key={product.id}
      className="card"
      onClick={() => handleClick(product.id, product.brand)}
    >
      <h2>{product.brand}</h2>
      <Img src={product.image} alt={product.brand} width={300} height={200} />
    </div>
  )
}

export default Card
