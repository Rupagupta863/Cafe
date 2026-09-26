"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/shop/ProductCard";

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
  return (
    <section className="py-10 px-8 lg:px-24 bg-white text-center">
      <div className="flex flex-col items-center justify-center mb-12">
        <div className="flex items-center gap-4 mb-3">
          <div className="h-[1px] w-8 sm:w-16 bg-coffee-brown/30"></div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-coffee-brown">
            Menu
          </span>
          <div className="h-[1px] w-8 sm:w-16 bg-coffee-brown/30"></div>
        </div>
        <h3 className="text-2xl md:text-3xl font-serif text-gray-900 tracking-tight capitalize">
          {title.toLowerCase()}
        </h3>
      </div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {items.map((item) => (
          <ProductCard
            key={item.id}
            product={{
              id: item.id,
              name: item.title,
              price: item.price,
              image: item.image,
              description: item.description,
            }}
          />
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
