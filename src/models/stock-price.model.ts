export interface StockPrice {
  [key: number]: Product
}

export interface Product {
  stock: number
  price: number
}
