export type ProductCategory =
  | 'Pije'
  | 'Te perditshme'
  | 'Furra'
  | 'Prodhime'
  | 'Snacks'
  | 'Shtepi'
  | 'Te ngrira'
  | 'Bulmet'

export interface Product {
  id: string
  name: string
  category: ProductCategory
  price: number
  stock: number
  unit: string
  imageUrl?: string
  expiresAt?: string
  supplier: string
}
