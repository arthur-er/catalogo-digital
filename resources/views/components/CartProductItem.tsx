import { dinero } from 'dinero.js'

import { Product } from '@/scripts/models'
import toFormat from '@/scripts/toFormat'
import useCart from '@/scripts/useCart'

import Button from './Button'

interface CartProductItemProps {
  productId: number
}

export default function CartProductItem({ productId }: CartProductItemProps) {
  const product = useCart(({ products }) => products[productId])
  const formattedPrice = toFormat(dinero(product.price))
  const { removeProduct, increaseQuantity, decreaseQuantity } = useCart(
    ({ removeProduct, increaseQuantity, decreaseQuantity }) => ({
      removeProduct,
      increaseQuantity,
      decreaseQuantity,
    })
  )

  return (
    <div className="border border-gray-300 shadow flex flex-col md:flex-row rounded-lg">
      <img
        src={product.image.url}
        alt=""
        className="w-full aspect-video rounded-t-lg md:rounded-tr-none md:w-1/3 md:rounded-l-lg md:aspect-square"
      />
      <div className="p-4 flex flex-col space-y-2 md:space-y-4">
        <div className="flex items-center space-x-4">
          <h4 className="text-lg font-medium">{product.name}</h4>
        </div>
        <span>{formattedPrice}</span>
        <div className="flex text-lg font-medium space-x-2">
          <button onClick={() => decreaseQuantity(product.id)}>-</button>
          <span className="font-normal">{product.quantity}</span>
          <button onClick={() => increaseQuantity(product.id)}>+</button>
        </div>
        <div className="flex-grow" />
        <Button
          onClick={() => removeProduct(product.id)}
          size="xs"
          text="danger"
          variant="text"
          bg="transparent"
        >
          Remover do carrinho
        </Button>
      </div>
    </div>
  )
}
