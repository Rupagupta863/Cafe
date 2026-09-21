import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import Link from 'next/link'
import { LayoutDashboard, ShoppingCart, Coffee, Users, Tag, Truck, LogOut, Layers } from 'lucide-react'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-coffee-dark text-white flex flex-col hidden md:flex shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <span className="font-bold text-lg tracking-wider">BREW SPOT ADMIN</span>
        </div>
        
        <nav className="flex-1 py-6 space-y-1 px-3">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-coffee-brown/50 text-white font-medium">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white font-medium transition-colors">
            <ShoppingCart className="w-5 h-5" /> Orders
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white font-medium transition-colors">
            <Coffee className="w-5 h-5" /> Products
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white font-medium transition-colors">
            <Layers className="w-5 h-5" /> Categories
          </Link>
          <Link href="/admin/customers" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white font-medium transition-colors">
            <Users className="w-5 h-5" /> Customers
          </Link>
          <Link href="/admin/coupons" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white font-medium transition-colors">
            <Tag className="w-5 h-5" /> Coupons
          </Link>
          <Link href="/admin/delivery" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white font-medium transition-colors">
            <Truck className="w-5 h-5" /> Delivery Settings
          </Link>
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <form action={async () => {
            'use server'
            const { signOut } = await import('@/auth')
            await signOut({ redirectTo: '/' })
          }}>
            <button type="submit" className="flex items-center gap-3 px-3 py-2.5 w-full text-left text-red-400 hover:bg-white/5 rounded-lg font-medium transition-colors">
              <LogOut className="w-5 h-5" /> Logout Admin
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
          <div className="font-semibold text-gray-900 md:hidden">BREW SPOT ADMIN</div>
          <div className="flex-1" />
          <div className="flex items-center gap-4 text-sm font-medium text-gray-600">
            Welcome, {session.user.name}
            <Link href="/" className="px-3 py-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              View Store
            </Link>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
