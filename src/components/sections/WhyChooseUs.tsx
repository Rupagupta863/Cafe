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

const iconVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.15, 
    rotate: [0, -12, 12, -6, 0],
    transition: { duration: 0.45, ease: "easeInOut" as const }
  }
};

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-gradient-to-b from-stone-900 to-[#120705] text-stone-100 relative overflow-hidden">
      
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-amber-500 font-semibold tracking-[0.2em] uppercase text-xs sm:text-sm mb-2.5"
          >
            Our Philosophy
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-6"
          >
            Why Choose Us
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-stone-400 text-base sm:text-lg font-light leading-relaxed"
          >
            We believe that every cup of coffee tells a story. From the farm to your cup, we are dedicated to excellence, sustainability, and community.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUs.map((feature, index) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              custom={index}
              whileHover="hover"
              className="group bg-stone-800/35 backdrop-blur-sm p-8 rounded-3xl border border-stone-700/40 hover:bg-stone-800/60 hover:border-amber-500/30 transition-colors duration-300 flex flex-col items-start gap-5 cursor-default"
            >
              {/* Icon Container with motion */}
              <motion.div 
                variants={iconVariants}
                className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center group-hover:bg-amber-500 group-hover:text-stone-900 transition-colors duration-300"
              >
                {iconMap[feature.icon] || <Coffee className="w-8 h-8" />}
              </motion.div>
              
              <div>
                <h4 className="text-xl font-serif font-bold text-white mb-2.5 transition-colors duration-300 group-hover:text-amber-400">
                  {feature.title}
                </h4>
                <p className="text-stone-400 leading-relaxed text-sm font-light">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
