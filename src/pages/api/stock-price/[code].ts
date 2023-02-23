import { NextApiRequest, NextApiResponse } from 'next'

import stockPriceData from '../../../../public/data/stock-price.js'
import { StockPrice } from '../../../models/stock-price.model'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query
  const stockPrice = (stockPriceData as StockPrice)[code as any]

  if (stockPrice) {
    const { stock, price } = stockPrice
    res.status(200).json({ stock, price: (price / 100).toFixed(2) })
  } else {
    res.status(404).json({ message: 'Product not found' })
  }
}
