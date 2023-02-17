import { NextApiRequest, NextApiResponse } from 'next'
import { Product, StockPrice } from '../../../models/stock-price.model'

import products from '../stock-price.js'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product>
) {
  const { code } = req.query

  const product = (products as StockPrice)[code as any]

  res.status(200).json(product)
}
