import { Link } from '@inertiajs/inertia-react'
import clsx from 'clsx'
import { dinero } from 'dinero.js'

import toFormat from '@/scripts/toFormat'

interface ProductCardProps {
  product: any
}

export default function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = toFormat(dinero(product.price))

  return (
    <div className="border border-gray-300 shadow flex rounded-lg">
      <img src={product.image.url} alt="" className="w-1/3 aspect-square" />
      <div className="p-4 flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <h4 className="text-lg font-medium">{product.name}</h4>
          <span
            className={clsx(
              'py-1 px-4 uppercase rounded-full font-medium text-sm bg-primary-500 text-white',
              !product.active && 'bg-opacity-50'
            )}
          >
            {product.active ? 'Visivel' : 'Oculto'}
          </span>
        </div>
        <span>{formattedPrice}</span>
        <div className="flex-grow" />
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
      </div>
    </div>
  )
}
