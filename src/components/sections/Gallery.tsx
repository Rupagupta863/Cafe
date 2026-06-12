"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { galleryImages } from "@/data";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Gallery() {
  const displayImages = galleryImages.slice(0, 4);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <h2 className="text-amber-700 font-semibold tracking-[0.2em] uppercase text-xs sm:text-sm mb-2.5">Our Space</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">Experience the Vibe</h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link 
              href="/gallery" 
              className={buttonVariants({ 
                variant: "ghost", 
                className: "text-amber-700 hover:text-amber-800 hover:bg-amber-50/50 flex items-center gap-2 rounded-full px-5 py-2 transition-all" 
              })}
            >
              View Full Gallery <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className={`relative overflow-hidden rounded-3xl group shadow-[0_4px_15px_rgba(0,0,0,0.01)] ${
                index === 0 || index === 3 
                  ? "md:col-span-2 lg:col-span-2 aspect-[16/9] lg:aspect-auto lg:h-80" 
                  : "aspect-square lg:h-80"
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Overlay with alt text */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/75 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 z-10 pointer-events-none">
                <p className="text-white font-serif text-lg tracking-wide transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 font-medium">
                  {image.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
