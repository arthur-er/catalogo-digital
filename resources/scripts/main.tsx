import '@/css/tailwind.css'
import '@/css/app.css'

import { createInertiaApp } from '@inertiajs/inertia-react'
import { createRoot } from 'react-dom/client'

import resolvePageComponent from './resolvePageComponent'

createInertiaApp({
  resolve: (name) => resolvePageComponent(name),
  setup: ({ el, App, props }) => createRoot(el).render(<App {...props} />),
})
