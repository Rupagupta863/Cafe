"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function ReservationCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-sm" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Join Us for a Perfect Cup
          </h2>
          <p className="text-lg text-stone-300 mb-10 leading-relaxed">
            Whether you&apos;re planning a cozy date, a casual meeting, or simply need a quiet spot to work, we&apos;ve got the perfect table waiting for you.
          </p>
          <Link href="/reservations" className={buttonVariants({ size: "lg", className: "bg-amber-600 hover:bg-amber-700 text-white rounded-full px-10 py-6 text-lg h-auto" })}>
            Book Your Table Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
