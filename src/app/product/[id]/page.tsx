import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ProductCustomizer } from '@/components/shop/ProductCustomizer'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, Star, CheckCircle2, Leaf, Box, ArrowRight } from 'lucide-react'
import { ProductCard } from '@/components/shop/ProductCard'

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

  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: id },
      isAvailable: true
    },
    take: 4
  })

  return (
    <main className="w-full min-h-screen flex flex-col overflow-x-hidden font-sans bg-[#FDFBF7]">
      <Navbar />
      
      <div className="w-full pt-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/shop" className="inline-flex items-center text-sm font-medium text-coffee-brown/80 hover:text-coffee-dark transition-colors mb-4 lg:mb-6">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Shop
          </Link>
        </div>
      </div>
      
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 lg:pb-12">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-10 items-start">
          
          {/* Image Gallery */}
          <div className="w-full md:w-1/2">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-sm border border-coffee-beige/20 bg-white">
              <Image 
                src={product.image || '/images/menu_coffee_1.jpg'} 
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Product Info & Customizer */}
          <div className="w-full flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-coffee-brown text-xs font-medium uppercase tracking-wider">
                {product.category.name}
              </span>
            </div>
            
            <h1 className="text-2xl lg:text-3xl font-fredoka font-medium text-coffee-dark mb-3">{product.name}</h1>
            
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current text-coffee-beige/50" />
              </div>
              <div className="text-sm font-medium text-coffee-dark/80">4.8 (128 Reviews)</div>
            </div>
            
            <p className="text-sm text-coffee-dark/70 leading-relaxed mb-6">
              {product.description}
            </p>
            
            <div className="w-full">
              <ProductCustomizer product={product} />
            </div>

            {/* Accordion Details */}
            <div className="mt-5 flex flex-col border-t border-coffee-beige/20">
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-coffee-dark py-4">
                  Product Details
                  <span className="relative w-4 h-4 shrink-0 text-coffee-brown/60 group-hover:text-coffee-dark transition-colors">
                    <span className="absolute inset-0 m-auto h-[1.5px] w-3 bg-current transition-transform group-open:rotate-180"></span>
                    <span className="absolute inset-0 m-auto h-3 w-[1.5px] bg-current transition-transform group-open:rotate-90"></span>
                  </span>
                </summary>
                <div className="pb-4 text-sm text-coffee-dark/70 leading-relaxed">
                  Experience the rich, bold flavors meticulously crafted by our master roasters. This product is sourced from sustainable farms and perfectly balanced to deliver an unforgettable taste profile.
                </div>
              </details>
              
              <div className="w-full h-[1px] bg-coffee-beige/10"></div>

              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-coffee-dark py-4">
                  Brewing Guide
                  <span className="relative w-4 h-4 shrink-0 text-coffee-brown/60 group-hover:text-coffee-dark transition-colors">
                    <span className="absolute inset-0 m-auto h-[1.5px] w-3 bg-current transition-transform group-open:rotate-180"></span>
                    <span className="absolute inset-0 m-auto h-3 w-[1.5px] bg-current transition-transform group-open:rotate-90"></span>
                  </span>
                </summary>
                <div className="pb-4 text-sm text-coffee-dark/70 leading-relaxed">
                  For optimal results, use 2 tablespoons of ground coffee per 6 ounces of water. Best enjoyed with freshly drawn, filtered water just off the boil.
                </div>
              </details>
              
              <div className="w-full h-[1px] bg-coffee-beige/10"></div>

              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-coffee-dark py-4">
                  Pickup & Delivery
                  <span className="relative w-4 h-4 shrink-0 text-coffee-brown/60 group-hover:text-coffee-dark transition-colors">
                    <span className="absolute inset-0 m-auto h-[1.5px] w-3 bg-current transition-transform group-open:rotate-180"></span>
                    <span className="absolute inset-0 m-auto h-3 w-[1.5px] bg-current transition-transform group-open:rotate-90"></span>
                  </span>
                </summary>
                <div className="pb-4 text-sm text-coffee-dark/70 leading-relaxed">
                  Available for in-store pickup or local delivery. Your order will be carefully prepared and ready within 10-15 minutes to ensure you get it fresh and hot.
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
        
      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-16 mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-fredoka font-medium text-coffee-dark tracking-tight">You May Also Like</h2>
            <Link href="/shop" className="group flex items-center text-sm font-medium text-coffee-brown hover:text-coffee-dark transition-colors">
              View all <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {relatedProducts.map(rp => (
                <ProductCard key={rp.id} product={rp} />
              ))}
          </div>
        </div>
      )}
      
      <Footer />
    </main>
  )
}
