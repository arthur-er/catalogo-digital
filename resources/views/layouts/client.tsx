import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

interface ClientLayoutProps {
  children: any
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <div className="h-full flex flex-col">
      <Navbar />
      <div className="container p-2 flex-grow max-w-screen-lg mx-auto">{children}</div>
      <Footer />
    </div>
  )
}
