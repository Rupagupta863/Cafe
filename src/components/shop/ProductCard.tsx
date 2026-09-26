import Image from 'next/image'
import Link from 'next/link'

export interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image?: string | null;
    description?: string | null;
    category?: {
      name: string;
    } | null;
  };
  href?: string;
}

export function ProductCard({ product, href }: ProductCardProps) {
  const linkHref = href || `/product/${product.id}`;

  return (
    <Link href={linkHref} className="group flex flex-col bg-white border border-gray-100 hover:border-coffee-beige/40 rounded-2xl overflow-hidden shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_20px_-10px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 h-full text-left">
      <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden shrink-0">
        <Image
          src={product.image || '/images/menu_coffee_1.jpg'}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
      </div>

      <div className="flex flex-col px-4 py-2 flex-1">
        <div className="flex justify-between items-start gap-2 mb-1">
          <span className="text-[10px] uppercase tracking-[0.2em] text-coffee-brown/80 font-semibold line-clamp-1">
            {product.category?.name || 'Item'}
          </span>
          <span className="text-xs font-medium text-gray-900 bg-[#faf8f5] px-2 py-0.5 rounded-full whitespace-nowrap">
            ₹{product.price}
          </span>
        </div>

        <h3 className="text-lg font-serif text-gray-900 group-hover:text-coffee-brown transition-colors leading-snug line-clamp-1">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500 line-clamp-2 mt-1 min-h-[32px]">
          {product.description || ''}
        </p>

        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between opacity-70 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] uppercase text-gray-500 font-semibold tracking-wider">
            View details
          </span>
          <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-coffee-brown group-hover:text-white transition-colors duration-300">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </div>
        </div>
      </div>
    </Link>
  )
}
