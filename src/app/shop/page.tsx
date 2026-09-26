import prisma from '@/lib/prisma'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'
import { Search, ShoppingBag, Filter } from 'lucide-react'
import Image from 'next/image'
import { ProductCard } from '@/components/shop/ProductCard'

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const categoryId = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : undefined
  const query = typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : undefined

  const page = typeof resolvedSearchParams.page === 'string' ? parseInt(resolvedSearchParams.page) : 1
  const limit = 8 // Show 8 products per page (2 rows of 4)
  const skip = (page - 1) * limit

  // Fetch all categories for the filter sidebar
  const categories = await prisma.category.findMany()

  // Build the where clause
  const where: any = { isAvailable: true }
  if (categoryId) {
    where.categoryId = categoryId
  }
  if (query) {
    where.name = { contains: query }
  }

  // Fetch products and total count concurrently
  const [products, totalCount] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      include: {
        category: true,
      }
    }),
    prisma.product.count({ where })
  ])

  const totalPages = Math.ceil(totalCount / limit)

  return (
    <main className="w-full min-h-screen flex flex-col bg-white font-inter selection:bg-coffee-beige/30">
      <Navbar />

      {/* Premium Image Header */}
      <div className="relative w-full h-36 md:h-44 flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000&auto=format&fit=crop"
          alt="Coffee texture background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#1F1B18]/70"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-coffee-beige mb-2 block font-semibold">
            The Shop
          </span>
          <h1 className="text-2xl lg:text-4xl font-serif font-medium text-white mb-2 tracking-tight drop-shadow-sm">
            Our Collection
          </h1>
          <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed max-w-xl">
            Discover our carefully curated selection of single-origin beans, artisanal blends, and freshly baked pastries.
          </p>
        </div>
      </div>

      <div className="flex-1 max-w-[1440px] mx-auto w-full px-6 lg:px-12 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* Sidebar / Filters */}
          <div className="w-full lg:w-44 shrink-0 lg:ml-8 xl:ml-12">
            <div>
              <div className="flex items-center gap-2 mb-8 text-gray-900 border-b border-gray-100 pb-4">
                <Filter className="w-4 h-4" />
                <h3 className="text-xs uppercase tracking-[0.15em] font-semibold">Categories</h3>
              </div>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/shop"
                    className={`block text-sm transition-colors font-light ${!categoryId ? 'text-coffee-brown font-medium' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    All Products
                  </Link>
                </li>
                {categories.map(cat => (
                  <li key={cat.id}>
                    <Link
                      href={`/shop?category=${cat.id}`}
                      className={`block text-sm transition-colors font-light ${categoryId === cat.id ? 'text-coffee-brown font-medium' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-end mb-8 pb-4 border-b border-gray-100">
              <h2 className="text-2xl font-serif text-gray-900">
                {categoryId ? categories.find(c => c.id === categoryId)?.name : 'All Products'}
              </h2>
              <p className="text-gray-400 text-[10px] tracking-widest uppercase">{totalCount} Items</p>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-32 bg-gray-50 rounded-sm">
                <Search className="w-8 h-8 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-serif text-gray-900 mb-2">No products found</h3>
                <p className="text-sm text-gray-500 font-light mb-8">Try adjusting your category filter.</p>
                <Link href="/shop" className="inline-flex items-center justify-center px-8 py-3 bg-coffee-brown text-white text-xs uppercase tracking-[0.15em] rounded-full hover:bg-coffee-dark transition-colors">
                  Clear Filters
                </Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-14 flex justify-center items-center gap-2">
                    {page > 1 && (
                      <Link
                        href={`/shop?page=${page - 1}${categoryId ? `&category=${categoryId}` : ''}${query ? `&q=${query}` : ''}`}
                        scroll={false}
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:border-coffee-brown hover:text-coffee-brown transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                      </Link>
                    )}

                    <div className="flex gap-1 mx-2">
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <Link
                          key={i}
                          href={`/shop?page=${i + 1}${categoryId ? `&category=${categoryId}` : ''}${query ? `&q=${query}` : ''}`}
                          scroll={false}
                          className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${page === i + 1
                            ? 'bg-coffee-brown text-white'
                            : 'text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                          {i + 1}
                        </Link>
                      ))}
                    </div>

                    {page < totalPages && (
                      <Link
                        href={`/shop?page=${page + 1}${categoryId ? `&category=${categoryId}` : ''}${query ? `&q=${query}` : ''}`}
                        scroll={false}
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:border-coffee-brown hover:text-coffee-brown transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                      </Link>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      </div>

      <Footer />
    </main>
  )
}
