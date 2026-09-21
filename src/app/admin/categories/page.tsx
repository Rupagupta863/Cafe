import prisma from '@/lib/prisma'
import { Layers, Plus, Pencil, Trash2 } from 'lucide-react'

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-coffee-dark flex items-center gap-3">
          <Layers className="w-8 h-8" /> Categories
        </h1>
        <button className="flex items-center gap-2 bg-coffee-dark text-white px-4 py-2 rounded-lg font-bold hover:bg-coffee-brown transition-colors">
          <Plus className="w-5 h-5" /> Add Category
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Description</th>
              <th className="p-4 font-semibold text-center">Products</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 font-bold text-gray-900">{category.name}</td>
                <td className="p-4 text-gray-500 max-w-md truncate">{category.description || 'No description'}</td>
                <td className="p-4 text-center">
                  <span className="bg-coffee-beige/20 text-coffee-dark font-bold px-3 py-1 rounded-full text-sm">
                    {category._count.products}
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
            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
