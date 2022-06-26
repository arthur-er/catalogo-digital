import { Link } from '@inertiajs/inertia-react'

interface ProductCardProps {
  product: any
}

export default function ProductCard({}: ProductCardProps) {
  return (
    <div className="border border-gray-300 shadow flex rounded-lg">
      <img src="http://picsum.photos/400" alt="" className="w-1/3" />
      <div className="p-4 flex flex-col space-y-4">
        <h4 className="text-lg font-medium">Joens</h4>
        <div className="flex space-x-4">
          <Link href="#" className="font-medium text-sm hover:underline text-primary-500">
            Editar
          </Link>
          <Link href="#" className="font-medium text-sm hover:underline text-red-500">
            Excluir
          </Link>
        </div>
      </div>
    </div>
  )
}
