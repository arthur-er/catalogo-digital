import CreateProductForm from '@/views/components/CreateProductForm'
import AdminLayout from '@/views/layouts/admin'

interface CreateProductPageProps {
  category: any
}

export default function CreateProductPage({ category }: CreateProductPageProps) {
  return (
    <AdminLayout title={`Adicionando produto a categoria: ${category.name}`}>
      <CreateProductForm category={category} />
    </AdminLayout>
  )
}
