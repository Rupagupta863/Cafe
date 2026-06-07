"use client";

import { motion } from "framer-motion";
import { MenuCard } from "@/components/cards/MenuCard";
import { MenuItem } from "@/types";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FeaturedItemsProps {
  title: string;
  subtitle: string;
  items: MenuItem[];
  viewAllLink?: string;
  bgWhite?: boolean;
}

export function FeaturedItems({ title, subtitle, items, viewAllLink, bgWhite = false }: FeaturedItemsProps) {
  return (
    <section className={`py-24 ${bgWhite ? "bg-white" : "bg-stone-50"}`}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="text-amber-700 font-semibold tracking-widest uppercase text-sm mb-2">{subtitle}</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">{title}</h3>
          </motion.div>
          {viewAllLink && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link href={viewAllLink} className={buttonVariants({ variant: "ghost", className: "text-amber-700 hover:text-amber-800 hover:bg-amber-50 flex items-center gap-2" })}>
                View Full Menu <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <MenuCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
