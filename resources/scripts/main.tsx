import '@/css/tailwind.css'

import { createInertiaApp } from '@inertiajs/inertia-react'
import { createRoot } from 'react-dom/client'

createInertiaApp({
  resolve: (name) => import(`../views/pages/${name}`),
  setup: ({ el, App, props }) => createRoot(el).render(<App {...props} />),
})
