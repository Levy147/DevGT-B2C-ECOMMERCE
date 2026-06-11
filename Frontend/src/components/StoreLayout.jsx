import Navbar from './Navbar'
import SlideCart from './SlideCart'
import FloatingBackground from './FloatingBackground'
import WhatsAppButton from './WhatsAppButton'

export default function StoreLayout({ children }) {
  return (
    <div className="min-h-screen relative">
      <FloatingBackground />
      <Navbar />
      <main>{children}</main>
      <SlideCart />
      <WhatsAppButton />
    </div>
  )
}
