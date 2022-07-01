import { useMemo } from 'react'

import useCart from '@/scripts/useCart'

import CartProductItem from './CartProductItem'

interface CartProductListProps {}

export default function CartProductList({}: CartProductListProps) {
  const { products: productsMap } = useCart()
  const productIds = useMemo(() => Object.keys(productsMap), [productsMap])

  return (
    <div className="grid md:grid-cols-2 gap-4 md:gap-8">
      {productIds.map((id) => (
        <CartProductItem key={id} productId={Number(id)} />
      ))}
    </div>
  )
}
