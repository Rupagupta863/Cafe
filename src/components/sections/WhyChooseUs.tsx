"use client";

import { motion } from "framer-motion";
import { Coffee, Leaf, Croissant, Sofa } from "lucide-react";
import { whyChooseUs } from "@/data";

const iconMap: Record<string, React.ReactNode> = {
  Leaf: <Leaf className="w-8 h-8" />,
  Coffee: <Coffee className="w-8 h-8" />,
  Croissant: <Croissant className="w-8 h-8" />,
  Sofa: <Sofa className="w-8 h-8" />,
};

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-stone-900 text-stone-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-amber-500 font-semibold tracking-widest uppercase text-sm mb-2"
          >
            Our Philosophy
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-6"
          >
            Why Choose Us
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-stone-400 text-lg"
          >
            We believe that every cup of coffee tells a story. From the farm to your cup, we are dedicated to excellence, sustainability, and community.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUs.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
              className="bg-stone-800/50 backdrop-blur-sm p-8 rounded-2xl border border-stone-700/50 hover:bg-stone-800 transition-colors duration-300"
            >
              <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mb-6">
                {iconMap[feature.icon] || <Coffee className="w-8 h-8" />}
              </div>
              <h4 className="text-xl font-serif font-semibold text-white mb-3">{feature.title}</h4>
              <p className="text-stone-400 leading-relaxed text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
