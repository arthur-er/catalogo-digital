import { Link } from '@inertiajs/inertia-react'

interface ProductCardProps {
  product: any
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border border-gray-300 shadow flex rounded-lg">
      <img src={product.image.url} alt="" className="w-1/3 aspect-square" />
      <div className="p-4 flex flex-col space-y-4">
        <h4 className="text-lg font-medium">{product.name}</h4>
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
