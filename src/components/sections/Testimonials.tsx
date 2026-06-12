"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: index * 0.1,
    },
  }),
};

export function Testimonials() {
  return (
    <section className="py-24 bg-stone-50 overflow-hidden relative">
      {/* Decorative blurred backgrounds */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-stone-200/50 rounded-full blur-3xl opacity-60 translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="container relative mx-auto px-4 md:px-8 z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-amber-700 font-semibold tracking-[0.2em] uppercase text-xs sm:text-sm mb-2.5"
          >
            Testimonials
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6"
          >
            What Our Customers Say
          </motion.h3>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              custom={index}
              whileHover={{ 
                y: -6, 
                scale: 1.015,
                boxShadow: "0 20px 30px rgba(45, 27, 22, 0.04)" 
              }}
              className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all duration-300 relative border border-stone-100 flex flex-col justify-between cursor-default"
            >
              {/* Decorative Quote Mark */}
              <Quote className="absolute right-6 top-6 w-12 h-12 text-stone-100 z-0 select-none group-hover:text-amber-100 transition-colors duration-300" />

              <div className="relative z-10">
                {/* Rating stars */}
                <div className="flex gap-1 mb-6 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < testimonial.rating ? "fill-current" : "text-stone-200"}`} 
                    />
                  ))}
                </div>
                
                {/* Review Content */}
                <p className="text-stone-600 mb-8 italic leading-relaxed text-sm sm:text-base font-light">
                  &quot;{testimonial.content}&quot;
                </p>
              </div>

              {/* User Avatar & Details */}
              <div className="flex items-center gap-4 mt-auto relative z-10 border-t border-stone-50 pt-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-100/50">
                  <Image 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base">{testimonial.name}</h4>
                  <p className="text-xs text-stone-400 font-light">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
