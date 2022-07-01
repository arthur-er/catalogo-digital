import { dinero, multiply } from 'dinero.js'

import config from '@/scripts/config'
import toFormat from '@/scripts/toFormat'
import useCart, { useCartTotal } from '@/scripts/useCart'

import Button from '../components/Button'
import CartProductList from '../components/CartProductList'
import ClientLayout from '../layouts/client'

interface CartPageProps {}

export default function CartPage({}: CartPageProps) {
  const products = useCart(({ products }) => products)

  const total = useCartTotal()
  const formattedPrice = toFormat(total)

  const assembledCart = Object.values(products).reduce<string>((acc, product) => {
    acc += `${product.quantity}x ${product.name}\n`
    return acc
  }, '')

  const finishPurchase = () => {
    const fullText = `Olá, eu gostaria de pedir os seguintes produtos:\n\n${assembledCart}`

    window.open(`https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(fullText)}`)
  }

  return (
    <ClientLayout>
      <div className="space-y-4">
        <CartProductList />
        <hr />
        <div className="flex flex-col space-y-2 w-full">
          <div className="flex justify-between w-full">
            <span className="font-medium">Total</span>
            <span className="font-medium">{formattedPrice}</span>
          </div>
          <Button onClick={finishPurchase}>Realizar Pedido</Button>
        </div>
      </div>
    </ClientLayout>
  )
}
