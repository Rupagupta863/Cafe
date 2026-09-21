"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";
import { Logo } from "./Logo";
import { useCartStore } from "@/store/cart";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isMounted, setIsMounted] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isHome = pathname === "/";

  return (
    <div className={`${isHome ? 'absolute top-0 bg-transparent' : 'relative bg-[#1F1B18] overflow-hidden'} w-full z-50`}>
      {!isHome && (
        <div className="absolute inset-x-0 -top-20 h-[600px] md:h-[700px] z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000&auto=format&fit=crop"
            alt="Coffee texture"
            className="w-full h-full object-cover opacity-20 object-center"
          />
        </div>
      )}
      <nav className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-2.5 md:py-2.5 text-white flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform">
          <Logo className="w-12 h-12 text-white" dotColor="#DCA948" />
          <span className="font-bold text-lg tracking-wider leading-tight text-white mt-1">
            BREW<br />SPOT
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-medium tracking-widest uppercase">
          <Link href="/" className={`${pathname === "/" ? "text-coffee-beige" : "text-white"} hover:text-coffee-beige hover:scale-105 transition-all`}>HOME</Link>
          <Link href="/shop" className={`${pathname.startsWith("/shop") ? "text-coffee-beige" : "text-white"} hover:text-coffee-beige hover:scale-105 transition-all`}>SHOP</Link>
          <Link href="/about" className={`${pathname.startsWith("/about") ? "text-coffee-beige" : "text-white"} hover:text-coffee-beige hover:scale-105 transition-all`}>ABOUT</Link>
          <Link href="/contact" className={`${pathname.startsWith("/contact") ? "text-coffee-beige" : "text-white"} hover:text-coffee-beige hover:scale-105 transition-all`}>CONTACT</Link>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-6">
          <button className="hover:text-coffee-beige hover:scale-110 transition-all">
            <Search className="w-5 h-5" />
          </button>
          <Link href="/account" className="hover:text-coffee-beige hover:scale-110 transition-all">
            <User className="w-5 h-5" />
          </Link>
          <Link href="/cart" className="relative hover:text-coffee-beige hover:scale-110 transition-all">
            <ShoppingBag className="w-5 h-5" />
            {isMounted && itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-coffee-brown text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </div>
  );
}
