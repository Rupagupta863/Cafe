import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

async function updateOrderStatus(formData: FormData) {
  'use server'
  const orderId = formData.get('orderId') as string
  const status = formData.get('status') as string

  await prisma.order.update({
    where: { id: orderId },
    data: { status }
  })
  
  revalidatePath('/admin/orders')
}

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { user: true }
  })

  const statuses = ['PLACED', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED']

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Manage Orders</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Payment</th>
                <th className="px-6 py-4 font-medium">Status Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">#{order.id.slice(-6).toUpperCase()}</td>
                  <td className="px-6 py-4 text-gray-600">
                    <p className="font-medium text-gray-900">{order.user.name}</p>
                    <p className="text-xs">{order.user.email}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{new Date(order.createdAt).toLocaleString()}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">₹{order.totalAmount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-600">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${order.paymentStatus === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {order.paymentMethod} - {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <form action={updateOrderStatus} className="flex gap-2">
                      <input type="hidden" name="orderId" value={order.id} />
                      <select 
                        name="status" 
                        defaultValue={order.status}
                        className="text-xs border border-gray-200 rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-coffee-brown"
                      >
                        {statuses.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <button type="submit" className="text-xs bg-coffee-dark text-white px-3 py-1 rounded hover:bg-coffee-brown transition-colors">
                        Update
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
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
