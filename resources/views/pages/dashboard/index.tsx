import CategoryItem from '@/views/components/CategoryItem'
import AdminLayout from '@/views/layouts/admin'

interface DashboardPageProps {}

export default function DashboardPage({}: DashboardPageProps) {
  return (
    <AdminLayout>
      <CategoryItem category={{ name: 'Teste', products: [{ id: 1 }] }} />
    </AdminLayout>
  )
}
