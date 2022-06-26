import Category from '@/views/components/Category'
import AdminLayout from '@/views/layouts/admin'

interface DashboardPageProps {}

export default function DashboardPage({}: DashboardPageProps) {
  return (
    <AdminLayout>
      <Category category={{ name: 'Teste', products: [{ id: 1 }] }} />
    </AdminLayout>
  )
}
