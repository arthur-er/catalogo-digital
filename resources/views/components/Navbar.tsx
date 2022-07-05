import { ShoppingCartIcon } from '@heroicons/react/solid'
import { Inertia } from '@inertiajs/inertia'
import { Link, usePage } from '@inertiajs/inertia-react'

import config from '@/scripts/config'
import debounce from '@/scripts/debounce'

interface NavbarProps {}

export default function Navbar({}: NavbarProps) {
  const query = new URLSearchParams(window.location.search).get('q')
  const handleSearch = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      Inertia.get('/', { q: e.target.value }, { preserveState: true }),
    250
  )

  const { url } = usePage()

  return (
    <header className="container px-2 justify-between relative w-full flex-col md:flex-row text-primary max-w-screen-lg mx-auto py-4 flex items-center md:space-x-2">
      <div className="space-x-2 flex items-center">
        <Link href="/cart">
          <ShoppingCartIcon className="w-5 h-5" />
        </Link>
        <Link href="/">
          <h1 className="font-bold text-2xl">{config.appName}</h1>
        </Link>
      </div>

      {url === '/' ? (
        <input
          defaultValue={query || undefined}
          className="block focus:border-primary-500 focus:ring-primary-500 rounded-lg w-full mt-6 md:mt-0 md:w-1/2 border-gray-300 focus:outline-none sm:text-sm"
          type="text"
          placeholder="Pesquisar..."
          onChange={handleSearch}
        />
      ) : undefined}
    </header>
  )
}
