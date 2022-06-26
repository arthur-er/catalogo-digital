import { ArrowRightIcon } from '@heroicons/react/solid'
import { Link } from '@inertiajs/inertia-react'

import ProductCard from './ProductCard'

interface CategoryItemProps {
  category: any
}

export default function CategoryItem({ category }: CategoryItemProps) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="py-6 border-b items-center flex justify-between border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
        <div className="flex space-x-4">
          <Link
            className="text-primary-500 inline-flex items-center hover:underline font-medium text-sm"
            href={`/dashboard/categories/${category.id}/products/create`}
          >
            Adicionar produtos
          </Link>
          <Link
            className="text-primary-500 inline-flex items-center hover:underline font-medium text-sm"
            href={`/dashboard/categories/${category.id}/edit`}
          >
            Editar
          </Link>
          <Link
            as="button"
            method="delete"
            className="text-red-500 inline-flex items-center hover:underline font-medium text-sm"
            href={`/dashboard/categories/${category.id}`}
          >
            Excluir
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        {category.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
