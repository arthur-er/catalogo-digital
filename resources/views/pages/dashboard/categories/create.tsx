import CreateCategoryForm from '@/views/components/CreateCategoryForm'
import AdminLayout from '@/views/layouts/admin'

interface CreateCategoryPageProps {}

export default function CreateCategoryPage({}: CreateCategoryPageProps) {
  return (
    <AdminLayout title="Criar nova categoria">
      <CreateCategoryForm />
    </AdminLayout>
  )
}
