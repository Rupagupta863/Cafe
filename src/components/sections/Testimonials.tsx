"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";
import { testimonials } from "@/data";

export function Testimonials() {
  return (
    <section className="py-24 bg-stone-50 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-stone-200 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />
      
      <div className="container relative mx-auto px-4 md:px-8 z-10">
        <div className="flex flex-col items-center justify-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-3"
          >
            <div className="h-[1px] w-8 sm:w-16 bg-coffee-brown/30"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-coffee-brown">
              Testimonials
            </span>
            <div className="h-[1px] w-8 sm:w-16 bg-coffee-brown/30"></div>
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl md:text-3xl font-serif text-gray-900 tracking-tight capitalize text-center"
          >
            What our customers say
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 relative border border-stone-100"
            >
              <div className="flex gap-1 mb-6 text-amber-500">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-stone-600 mb-8 italic relative z-10 leading-relaxed text-sm lg:text-base">
                &quot;{testimonial.content}&quot;
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-100">
                  <Image 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-xs text-stone-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
