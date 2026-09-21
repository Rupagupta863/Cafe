import prisma from '@/lib/prisma'
import { Banknote, ShoppingCart, Coffee, Users, TrendingUp } from 'lucide-react'

export default async function AdminDashboard() {
  const [totalOrders, totalRevenue, totalProducts, totalCustomers, recentOrders] = await Promise.all([
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { totalAmount: true } }),
    prisma.product.count(),
    prisma.user.count({ where: { role: 'USER' } }),
    prisma.order.findMany({ 
      take: 5, 
      orderBy: { createdAt: 'desc' },
      include: { user: true }
    })
  ])

  const stats = [
    { name: 'Total Revenue', value: `₹${totalRevenue._sum.totalAmount?.toFixed(2) || '0.00'}`, icon: Banknote, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Total Orders', value: totalOrders.toString(), icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Active Products', value: totalProducts.toString(), icon: Coffee, color: 'text-orange-600', bg: 'bg-orange-100' },
    { name: 'Total Customers', value: totalCustomers.toString(), icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Here's what's happening in your cafe today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-900">Recent Orders</h3>
          <button className="text-sm font-medium text-coffee-brown hover:text-coffee-dark transition-colors">View All Orders</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">#{order.id.slice(-6).toUpperCase()}</td>
                  <td className="px-6 py-4 text-gray-600">{order.user.name}</td>
                  <td className="px-6 py-4 text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">₹{order.totalAmount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
