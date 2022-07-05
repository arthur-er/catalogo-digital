import { Link, usePage } from '@inertiajs/inertia-react'

import Button from './Button'
import ProductCard from './ProductCard'

interface CategoryItemProps {
  category: {
    [key: string]: any
    products: any[]
  }
}

export default function CategoryItem({ category }: CategoryItemProps) {
  const {
    props: { user },
    component,
  } = usePage()
  const isDashboard = component.startsWith('dashboard')
  return (
    <div className="flex flex-col space-y-4">
      <div className="py-6 border-b items-center flex justify-between border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
        {user && isDashboard ? (
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
        ) : undefined}
      </div>
      <div className="grid md:grid-cols-2 gap-4 md:gap-8">
        {category.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
