import { Link, usePage } from '@inertiajs/inertia-react'
import clsx from 'clsx'
import { dinero } from 'dinero.js'

import { Product } from '@/scripts/models'
import toFormat from '@/scripts/toFormat'
import useCart from '@/scripts/useCart'

import Button from './Button'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const {
    props: { user },
    component,
  } = usePage()
  const isDashboard = component.startsWith('dashboard')
  const { addProduct } = useCart()
  const formattedPrice = toFormat(dinero(product.price))

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
          {user && isDashboard ? (
            <span
              className={clsx(
                'py-1 px-4 uppercase rounded-full font-medium text-sm bg-primary-500 text-white',
                !product.active && 'bg-opacity-50'
              )}
            >
              {product.active ? 'Visivel' : 'Oculto'}
            </span>
          ) : undefined}
        </div>
        <span>{formattedPrice}</span>
        <div className="flex-grow" />
        {user && isDashboard ? (
          <div className="flex space-x-4">
            <Link
              href={`/dashboard/products/${product.id}/edit`}
              className="font-medium text-sm hover:underline text-primary-500"
            >
              Editar
            </Link>
            <Link
              as="button"
              method="delete"
              href={`/dashboard/products/${product.id}`}
              className="font-medium text-sm hover:underline text-red-500"
            >
              Excluir
            </Link>
          </div>
        ) : (
          <Button
            onClick={() => addProduct(product)}
            size="xs"
            text="primary"
            variant="text"
            bg="transparent"
          >
            Adicionar ao carrinho
          </Button>
        )}
      </div>
    </div>
  )
}
