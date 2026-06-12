"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function ReservationCTA() {
  return (
    <section className="py-28 relative overflow-hidden bg-stone-900">
      
      {/* Background Image with subtle zoom animation */}
      <motion.div 
        initial={{ scale: 1.05, opacity: 0.3 }}
        whileInView={{ scale: 1, opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed pointer-events-none"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=1600&q=80')",
        }}
      />
      
      {/* Backdrop overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#120705]/90 via-[#1c0d0a]/80 to-[#120705]/95 backdrop-blur-[2px] z-0" />

      {/* Floating abstract blobs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-amber-600/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-amber-700/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto flex flex-col items-center gap-6"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-amber-500 font-semibold tracking-[0.2em] uppercase text-xs sm:text-sm"
          >
            Reservations
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2 leading-tight">
            Join Us for a Perfect Cup
          </h2>
          
          <p className="text-stone-300 mb-6 leading-relaxed text-sm sm:text-base font-light">
            Whether you&apos;re planning a cozy date, a casual meeting, or simply need a quiet spot to work, we&apos;ve got the perfect table waiting for you.
          </p>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 450, damping: 15 }}
          >
            <Link 
              href="/reservations" 
              className={buttonVariants({ 
                size: "lg", 
                className: "bg-amber-600 hover:bg-amber-700 text-white rounded-full px-10 py-6 text-lg h-auto shadow-[0_4px_25px_rgba(217,119,6,0.35)] hover:shadow-[0_4px_30px_rgba(217,119,6,0.55)] transition-all duration-300 border border-amber-500/20" 
              })}
            >
              Book Your Table Now
            </Link>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
