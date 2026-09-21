import prisma from '@/lib/prisma'
import { Package, Plus, Pencil, Trash2 } from 'lucide-react'

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-coffee-dark flex items-center gap-3">
          <Package className="w-8 h-8" /> Products
        </h1>
        <button className="flex items-center gap-2 bg-coffee-dark text-white px-4 py-2 rounded-lg font-bold hover:bg-coffee-brown transition-colors">
          <Plus className="w-5 h-5" /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
              <th className="p-4 font-semibold">Image</th>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Category</th>
              <th className="p-4 font-semibold">Price</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4">
                  <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                </td>
                <td className="p-4 font-bold text-gray-900">{product.name}</td>
                <td className="p-4 text-gray-500">{product.category.name}</td>
                <td className="p-4 font-semibold">₹{product.price.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${product.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {product.isAvailable ? 'Available' : 'Out of Stock'}
                  </span>
                </td>
                <td className="p-4 flex justify-end gap-2">
                  <button className="p-2 text-gray-400 hover:text-coffee-dark bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  No products found. Add your first product!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
