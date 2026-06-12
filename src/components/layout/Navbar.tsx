"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Coffee } from "lucide-react";
import { NAV_LINKS, CAFE_NAME } from "@/constants";
import { buttonVariants } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine if the current page has a dark hero header at the top
  const isDarkHeroPage = pathname === "/" || pathname === "/about";
  // We use the dark transparent theme only on dark hero pages when they are not scrolled
  const useDarkTheme = isDarkHeroPage && !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        useDarkTheme
          ? "bg-transparent py-6"
          : "bg-white/80 backdrop-blur-md shadow-sm py-4 border-b border-stone-100/50"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        
        {/* Logo and Cafe Name */}
        <Link href="/" className="flex items-center gap-2.5 z-50">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
          >
            <Coffee className={`w-8 h-8 transition-colors duration-300 ${useDarkTheme ? "text-amber-500" : "text-amber-700"}`} />
          </motion.div>
          <span className={`font-serif text-2xl font-bold tracking-tight transition-colors duration-300 ${useDarkTheme ? "text-white" : "text-stone-900"}`}>
            {CAFE_NAME}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 relative py-1.5 ${
                  isActive
                    ? useDarkTheme ? "text-amber-400" : "text-amber-700"
                    : useDarkTheme ? "text-stone-300 hover:text-white" : "text-stone-600 hover:text-amber-700"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${useDarkTheme ? "bg-amber-400" : "bg-amber-700"}`}
                    initial={false}
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
              </Link>
            );
          })}
          
          <Link 
            href="/reservations" 
            className={buttonVariants({ 
              className: useDarkTheme
                ? "bg-amber-600 hover:bg-amber-700 text-white rounded-full px-6 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                : "bg-amber-700 hover:bg-amber-800 text-white rounded-full px-6 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
            })}
          >
            Book a Table
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden z-50 p-2 rounded-lg transition-colors duration-300 ${
            useDarkTheme 
              ? "text-white hover:bg-white/10" 
              : "text-stone-800 hover:bg-stone-100"
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute top-0 left-0 right-0 bg-white shadow-xl pt-24 pb-8 px-6 flex flex-col gap-5 md:hidden rounded-b-3xl border-b border-stone-100"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-medium transition-colors duration-200 py-1 ${
                    pathname === link.href ? "text-amber-700 font-semibold" : "text-stone-800 hover:text-amber-700"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                href="/reservations" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className={buttonVariants({ 
                  className: "bg-amber-700 hover:bg-amber-800 text-white rounded-full mt-3 w-full h-12 text-lg" 
                })}
              >
                Book a Table
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
