import { DineroSnapshot } from 'dinero.js'

export interface Product {
  price: DineroSnapshot<number>
  id: number
  name: string
  category_id: number
  quantity?: number
  active: boolean
  image: {
    url: string
  }
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
  products?: Product[]
}
