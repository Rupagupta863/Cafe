import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { LogOut, MapPin, Package, User, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default async function AccountPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      addresses: true,
      orders: {
        orderBy: { createdAt: 'desc' },
        take: 5
      }
    }
  })

  if (!user) {
    redirect('/login')
  }

  return (
    <main className="w-full min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Navbar />
      
      <div className="flex-1 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-24 h-24 bg-coffee-beige rounded-full flex items-center justify-center text-coffee-dark mb-4">
                <User className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-bold text-coffee-dark">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            <nav className="space-y-2">
              <Link href="#profile" className="flex items-center gap-3 px-4 py-3 bg-gray-50 text-coffee-dark rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                <User className="w-5 h-5" /> Profile
              </Link>
              <Link href="#orders" className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                <Package className="w-5 h-5" /> My Orders
              </Link>
              <Link href="#addresses" className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                <MapPin className="w-5 h-5" /> Addresses
              </Link>
              
              <div className="pt-4 mt-4 border-t border-gray-100">
                <form action={async () => {
                  'use server'
                  const { signOut } = await import('@/auth')
                  await signOut({ redirectTo: '/' })
                }}>
                  <button type="submit" className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-600 rounded-xl font-medium hover:bg-red-50 transition-colors">
                    <LogOut className="w-5 h-5" /> Logout
                  </button>
                </form>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="col-span-1 md:col-span-3 space-y-8">
            
            {/* Profile Info */}
            <section id="profile" className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-coffee-dark mb-6">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{user.name}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{user.email}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{user.phone || 'Not provided'}</div>
                </div>
              </div>
              <button className="mt-6 px-6 py-2 bg-coffee-dark text-white text-sm font-bold rounded-xl hover:bg-coffee-brown transition-colors">
                Edit Profile
              </button>
            </section>

            {/* Recent Orders */}
            <section id="orders" className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-coffee-dark">Recent Orders</h3>
                <Link href="/account/orders" className="text-sm font-bold text-coffee-brown hover:text-coffee-dark flex items-center">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              
              {user.orders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">You haven't placed any orders yet.</p>
                  <Link href="/shop" className="inline-block mt-4 px-6 py-2 bg-coffee-dark text-white text-sm font-bold rounded-xl hover:bg-coffee-brown transition-colors">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {user.orders.map(order => (
                    <div key={order.id} className="border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-coffee-beige transition-colors">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-bold text-gray-900">Order #{order.id.slice(-6).toUpperCase()}</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-coffee-cream text-coffee-dark text-xs font-bold">
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                        <span className="font-bold text-lg text-coffee-dark">₹{order.totalAmount.toFixed(2)}</span>
                        <Link href={`/account/orders/${order.id}`} className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                          Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
