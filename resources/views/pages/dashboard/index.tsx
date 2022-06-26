import CategoryItem from '@/views/components/CategoryItem'
import SearchCategory from '@/views/components/SearchCategory'
import AdminLayout from '@/views/layouts/admin'

interface DashboardPageProps {
  categories: any[]
}

export default function DashboardPage({ categories }: DashboardPageProps) {
  return (
    <AdminLayout title="Painel do Administrador" action={SearchCategory}>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </AdminLayout>
  )
}
