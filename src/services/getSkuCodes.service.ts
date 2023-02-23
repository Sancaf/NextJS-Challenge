/*    (skuCodes: string[]): Promise<ISkuCode[]> */

import { Sku } from '@/models/product.model'

export const getSkuCodes = async (skuCode: Sku) => {
  const url = '/api/stock-price/'
  return fetch(`${url}${skuCode}`)
    .then((response) => response.json())
    .then((data) => {
      return data
    })
}
