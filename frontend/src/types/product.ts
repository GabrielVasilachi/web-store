export type ProductCategory = 'Motorsport' | 'Graphic' | 'Color'

export interface Product {
  id: string
  name: string
  subtitle: string
  price: number
  color: string
  category: ProductCategory
  image: string
  accent: string
  surface: string
  description: string
  badge?: string
  sizes: readonly string[]
}

export interface CartLine {
  product: Product
  size: string
  quantity: number
}
