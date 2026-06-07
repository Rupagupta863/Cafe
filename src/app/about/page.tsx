"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CAFE_NAME } from "@/constants";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1495474472201-1e6e58ab5bfa?w=1600&q=80')" }}
        >
          <div className="absolute inset-0 bg-stone-900/60" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white mb-4"
          >
            Our Story
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-stone-200 max-w-2xl mx-auto"
          >
            Passion, precision, and the pursuit of the perfect cup.
          </motion.p>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=80"
                  alt="Barista making coffee"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 flex flex-col gap-6"
            >
              <h2 className="text-amber-700 font-semibold tracking-widest uppercase text-sm">The Beginning</h2>
              <h3 className="text-4xl font-serif font-bold text-gray-900">Crafting Moments Since 2018</h3>
              <p className="text-stone-600 leading-relaxed text-lg">
                Founded with a simple mission: to bring exceptional specialty coffee to our neighborhood. {CAFE_NAME} started as a small coffee cart and has grown into a community hub where people connect over great food and even better coffee.
              </p>
              <p className="text-stone-600 leading-relaxed text-lg">
                We roast our own beans in small batches to ensure quality and freshness. Our pastry chefs arrive before sunrise every day to bake our artisanal goods from scratch using locally sourced, organic ingredients.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
