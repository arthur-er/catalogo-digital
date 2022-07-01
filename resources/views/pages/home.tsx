import CategoryItem from '../components/CategoryItem'
import ClientLayout from '../layouts/client'

interface HomePageProps {
  categories: any[]
}

export default function HomePage({ categories }: HomePageProps) {
  return (
    <ClientLayout>
      {categories.map((category) => (
        <CategoryItem category={category} key={category.id} />
      ))}
    </ClientLayout>
  )
}
