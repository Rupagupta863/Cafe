"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CAFE_NAME } from "@/constants";

export default function AboutPage() {
  
  const spheres = [
    { size: "w-36 h-36", top: "10%", left: "10%", delay: 0, duration: 8, x: [0, 15, 0], y: [0, -20, 0] },
    { size: "w-24 h-24", top: "50%", right: "8%", delay: 1, duration: 6, x: [0, -10, 0], y: [0, 15, 0] },
  ];

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1c0d0a] via-[#2d1a16] to-[#120705]">
        
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30 mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1495474472201-1e6e58ab5bfa?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-[#120705]/50 z-0" />

        {/* Floating spheres in About Hero */}
        {spheres.map((sphere, idx) => (
          <motion.div
            key={idx}
            className={`glass-sphere absolute z-0 pointer-events-none ${sphere.size} opacity-10`}
            style={{
              top: sphere.top,
              right: sphere.right,
              left: sphere.left,
            }}
            animate={{
              x: sphere.x,
              y: sphere.y,
            }}
            transition={{
              duration: sphere.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: sphere.delay,
            }}
          />
        ))}

        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-serif font-bold text-white mb-4 leading-tight"
          >
            Our Story
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto font-light"
          >
            Passion, precision, and the pursuit of the perfect cup.
          </motion.p>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-24 relative overflow-hidden bg-background">
        
        {/* Decorative subtle ambient light */}
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[90px] -translate-x-1/2 pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Image container on the left */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:w-1/2 w-full"
            >
              <motion.div 
                whileHover={{ scale: 1.015, y: -6 }}
                transition={{ type: "spring", stiffness: 350, damping: 18 }}
                className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-xl border border-stone-100 filter drop-shadow-sm"
              >
                <Image 
                  src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=80"
                  alt="Barista making coffee"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </motion.div>

            {/* Text description on the right */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="lg:w-1/2 flex flex-col gap-6"
            >
              <span className="text-amber-700 font-semibold tracking-[0.2em] uppercase text-xs sm:text-sm">
                The Beginning
              </span>
              <h2 className="text-4xl font-serif font-bold text-stone-900 leading-tight">
                Crafting Moments Since 2018
              </h2>
              <p className="text-stone-600 leading-relaxed text-base sm:text-lg font-light">
                Founded with a simple mission: to bring exceptional specialty coffee to our neighborhood. {CAFE_NAME} started as a small coffee cart and has grown into a community hub where people connect over great food and even better coffee.
              </p>
              <p className="text-stone-600 leading-relaxed text-base sm:text-lg font-light">
                We roast our own beans in small batches to ensure quality and freshness. Our pastry chefs arrive before sunrise every day to bake our artisanal goods from scratch using locally sourced, organic ingredients.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}
