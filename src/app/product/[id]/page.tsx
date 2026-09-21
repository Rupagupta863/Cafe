import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ProductCustomizer } from '@/components/shop/ProductCustomizer'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      options: true,
    }
  })

  if (!product || !product.isAvailable) {
    notFound()
  }

  return (
    <main className="w-full min-h-screen flex flex-col bg-[#FDFBF7] overflow-x-hidden">
      <Navbar />
      
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/shop" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-coffee-dark mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Shop
        </Link>
        
        <div className="bg-white rounded-[32px] p-6 sm:p-10 shadow-sm border border-coffee-beige flex flex-col md:flex-row gap-12">
          
          {/* Image Gallery */}
          <div className="w-full md:w-1/2 flex justify-center items-start">
            <div className="relative w-full aspect-square rounded-[24px] overflow-hidden bg-gray-100">
              <Image 
                src={product.image || '/images/menu_coffee_1.jpg'} 
                alt={product.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Product Info & Customizer */}
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="mb-2">
              <span className="text-xs font-bold tracking-widest text-coffee-brown uppercase">{product.category.name}</span>
            </div>
            <h1 className="text-4xl font-extrabold text-coffee-dark mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-8 leading-relaxed text-lg">{product.description}</p>
            
            <div className="flex-1">
              <ProductCustomizer product={product} />
            </div>
          </div>

        </div>
      </div>
      
      <Footer />
    </main>
  )
}
