import EditCategoryForm from '@/views/components/EditCategoryForm'
import AdminLayout from '@/views/layouts/admin'

interface EditCategoryPageProps {
  category: any
}

export default function EditCategoryPage({ category }: EditCategoryPageProps) {
  return (
    <AdminLayout title={`Editando a categoria: ${category.name}`}>
      <EditCategoryForm category={category} />
    </AdminLayout>
  )
}
