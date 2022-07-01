import { BRL } from '@dinero.js/currencies'
import { add, multiply, Dinero, dinero } from 'dinero.js'
import { useMemo } from 'react'
import create from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { Product } from './models'

interface CartState {
  products: Record<number, Product>
  removeProduct: (id: number) => void
  addProduct: (product: Product) => void
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
}

const useCart = create<CartState>()(
  immer(
    persist(
      (set) => ({
        products: {},
        addProduct: (product: Product) =>
          set((state) => {
            state.products[product.id] = { ...product, quantity: 1 }
            return state
          }),
        removeProduct: (productId: number) =>
          set((state) => {
            delete state.products[productId]
            return state
          }),
        increaseQuantity: (productId: number) =>
          set((state) => {
            const product = state.products[productId]
            state.products[productId] = {
              ...product,
              quantity: product.quantity ? product.quantity + 1 : 1,
            }
            return state
          }),
        decreaseQuantity: (productId: number) =>
          set((state) => {
            const product = state.products[productId]
            state.products[productId] = {
              ...product,
              quantity: product.quantity ? product.quantity - 1 : 1,
            }
            return state
          }),
      }),
      { name: 'cart-storage' }
    )
  )
)

export function useCartTotal(): Dinero<number> {
  const products = useCart(({ products }) => products)

  const total = useMemo(
    () =>
      Object.values(products).reduce(
        (acc, { price, quantity }) => add(acc, multiply(dinero(price), quantity!)),
        dinero({ amount: 0, currency: BRL })
      ),
    [products]
  )

  return total
}
export default useCart
