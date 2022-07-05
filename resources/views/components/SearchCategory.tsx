import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-react'
import React from 'react'

import debounce from '@/scripts/debounce'

import Button from './Button'

interface SearchCategoryProps {}

export default function SearchCategory({}: SearchCategoryProps) {
  const query = new URLSearchParams(window.location.search).get('q')
  const handleSearch = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      Inertia.get('/dashboard', { q: e.target.value }, { preserveState: true }),
    250
  )

  return (
    <div className="flex items-center min-w-fit space-x-2">
      <input
        defaultValue={query}
        className="block rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 focus:outline-none sm:text-sm"
        type="text"
        placeholder="Pesquisar..."
        onChange={handleSearch}
      />
      <Link href="/dashboard/categories/create">
        <Button>Criar categoria</Button>
      </Link>
    </div>
  )
}
