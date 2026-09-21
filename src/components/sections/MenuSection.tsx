"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/store/cart";
import toast from "react-hot-toast";

interface MenuItem {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
}

interface MenuSectionProps {
  title: string;
  items: MenuItem[];
}

export function MenuSection({ title, items }: MenuSectionProps) {
  const router = useRouter();
  const { addItem } = useCartStore();
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});

  const handleAddToCart = (e: React.MouseEvent, item: MenuItem) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: item.id + '-default',
      productId: item.id,
      name: item.title,
      price: item.price,
      image: item.image,
      quantity: 1,
      customization: "{}"
    });
    toast.success(`${item.title} added to cart!`);
    router.push('/cart');
  };

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));
    if (!likedItems[id]) {
      toast.success("Added to favorites!");
    }
  };

  return (
    <section className="py-10 px-8 lg:px-24 bg-white text-center">
      <h3 className="text-xl font-bold text-coffee-dark tracking-widest mb-8">
        {title}
      </h3>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <Link href={`/product/${item.id}`} key={item.id} className="bg-coffee-cream rounded-xl p-4 flex flex-col relative shadow-sm hover:shadow-md transition-shadow h-full group cursor-pointer block">
            <button 
              onClick={(e) => toggleLike(e, item.id)}
              className={`absolute top-4 right-4 z-10 transition-colors ${likedItems[item.id] ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
            >
              <Heart className={`w-5 h-5 ${likedItems[item.id] ? 'fill-current' : ''}`} />
            </button>
            
            <div className="relative w-full h-36 rounded-lg overflow-hidden mb-3">
              <Image 
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            <div className="w-full text-left flex flex-col flex-1">
              <h4 className="font-bold text-coffee-dark text-base mb-1">{item.title}</h4>
              <p className="text-xs text-gray-700 mb-4 line-clamp-2 flex-1">
                {item.description}
              </p>
              
              <div className="flex justify-end w-full mt-auto">
                <button 
                  onClick={(e) => handleAddToCart(e, item)}
                  className="bg-coffee-dark text-white text-xs font-bold py-2 px-5 rounded-[12px] hover:bg-coffee-brown hover:scale-105 active:scale-95 hover:shadow-md transition-all duration-300 z-10"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto flex justify-end gap-2 mt-6">
        <button className="w-8 h-8 rounded-full bg-coffee-dark text-white flex items-center justify-center hover:bg-coffee-brown hover:scale-110 active:scale-90 transition-all shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button className="w-8 h-8 rounded-full bg-coffee-dark text-white flex items-center justify-center hover:bg-coffee-brown hover:scale-110 active:scale-90 transition-all shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </section>
  );
}
