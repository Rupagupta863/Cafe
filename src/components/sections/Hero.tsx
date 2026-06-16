"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { CAFE_NAME, CAFE_TAGLINE } from "@/constants";

export function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-stone-900">
        <video
          src="/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto flex flex-col items-center gap-6"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-amber-500 font-semibold tracking-widest uppercase text-sm"
          >
            Welcome to
          </motion.span>
          <motion.h1 
            className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {CAFE_NAME}
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-stone-200 font-light max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {CAFE_TAGLINE} Experience the finest artisanal coffee and fresh pastries in a warm, inviting atmosphere.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link href="/menu" className={buttonVariants({ size: "lg", className: "bg-amber-700 hover:bg-amber-800 text-white rounded-full px-8 py-6 text-lg" })}>
              View Menu
            </Link>
            <Link href="/reservations" className={buttonVariants({ size: "lg", variant: "outline", className: "bg-white/10 hover:bg-white/20 text-white border-white/30 rounded-full px-8 py-6 text-lg backdrop-blur-md" })}>
              Book a Table
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1 backdrop-blur-sm"
        >
          <div className="w-1 h-2 bg-amber-500 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
