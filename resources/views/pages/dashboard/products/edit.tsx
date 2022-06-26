import EditProductForm from '@/views/components/EditProductForm'
import AdminLayout from '@/views/layouts/admin'

interface EditProductPageProps {
  product: any
}

export default function EditProductPage({ product }: EditProductPageProps) {
  return (
    <AdminLayout title={`Editando produto: ${product.name}`}>
      <EditProductForm product={product} />
    </AdminLayout>
  )
}
