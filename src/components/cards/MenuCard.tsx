"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MenuItem } from "@/types";

interface MenuCardProps {
  item: MenuItem;
  index: number;
}

export function MenuCard({ item, index }: MenuCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.08 }}
      whileHover={{ 
        y: -8,
        scale: 1.015,
        boxShadow: "0 20px 35px rgba(28, 13, 10, 0.06)"
      }}
      className="group bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.015)] transition-all duration-300 border border-stone-100/80 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {item.popular && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md z-20">
            Popular
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c0d0a]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
      </div>

      {/* Info Container */}
      <div className="p-6 flex flex-col flex-grow justify-between gap-3">
        <div>
          <div className="flex justify-between items-start mb-1.5 gap-4">
            <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-amber-700 transition-colors duration-300 leading-snug">
              {item.name}
            </h3>
            <span className="text-amber-700 font-bold text-lg whitespace-nowrap select-none">
              ${item.price.toFixed(2)}
            </span>
          </div>
          <p className="text-stone-500 text-sm leading-relaxed font-light">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
