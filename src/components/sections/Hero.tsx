"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { CAFE_NAME, CAFE_TAGLINE } from "@/constants";

export function Hero() {
  const verticalText = "FUEL YOUR DAY";
  
  const spheres = [
    { size: "w-28 h-28", top: "8%", left: "18%", delay: 0, duration: 9, xRange: [0, 12, 0], yRange: [0, -20, 0], opacity: 0.12 },
    { size: "w-44 h-44", top: "55%", right: "12%", delay: 1, duration: 11, xRange: [0, -18, 0], yRange: [0, 25, 0], opacity: 0.09 },
    { size: "w-20 h-20", bottom: "12%", left: "22%", delay: 2, duration: 8, xRange: [0, 8, 0], yRange: [0, -12, 0], opacity: 0.15 },
    { size: "w-36 h-36", top: "22%", right: "35%", delay: 1.5, duration: 10, xRange: [0, 15, 0], yRange: [0, -18, 0], opacity: 0.08 },
    { size: "w-24 h-24", top: "4%", right: "7%", delay: 3, duration: 7, xRange: [0, -8, 0], yRange: [0, 12, 0], opacity: 0.14 },
    { size: "w-16 h-16", bottom: "38%", left: "10%", delay: 0.5, duration: 6, xRange: [0, 6, 0], yRange: [0, -8, 0], opacity: 0.18 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1c0d0a] via-[#2d1a16] to-[#120705] py-20 lg:py-0">
      
      {/* Background Subtle Noise Overlay (Optional/Styled) */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(45,26,22,0.3)_0%,transparent_70%)] pointer-events-none" />
      
      {/* Drifting Glassmorphic Spheres */}
      {spheres.map((sphere, idx) => (
        <motion.div
          key={idx}
          className={`glass-sphere absolute z-0 pointer-events-none ${sphere.size}`}
          style={{
            top: sphere.top,
            bottom: sphere.bottom,
            left: sphere.left,
            right: sphere.right,
            opacity: sphere.opacity,
          }}
          animate={{
            x: sphere.xRange,
            y: sphere.yRange,
          }}
          transition={{
            duration: sphere.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: sphere.delay,
          }}
        />
      ))}

      {/* Left Vertical Banner (mockup theme) */}
      <div className="hidden xl:flex absolute left-0 top-0 bottom-0 w-20 bg-[#160907]/50 border-r border-white/5 flex-col justify-center items-center z-20 pointer-events-none">
        <div className="flex flex-col gap-6 text-stone-400/80 font-mono tracking-[0.5em] text-sm uppercase text-vertical select-none font-medium">
          {verticalText.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.05, duration: 0.4 }}
              className={char === " " ? "h-6" : ""}
            >
              {char === " " ? "" : char}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:pl-32 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Column: Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl lg:w-1/2 gap-6"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-amber-500 font-semibold tracking-[0.25em] uppercase text-xs sm:text-sm bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20 backdrop-blur-sm"
            >
              Welcome to Lumière
            </motion.span>
            
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Artisanal <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600">
                Coffee Craft
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-base sm:text-lg text-stone-300 font-light leading-relaxed max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {CAFE_TAGLINE} Every cup is roasted in-house in small batches, bringing you rich flavor profiles and a warm, inviting community space.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Link 
                href="/menu" 
                className={buttonVariants({ 
                  size: "lg", 
                  className: "bg-amber-600 hover:bg-amber-700 text-white rounded-full px-8 py-6 text-lg shadow-[0_4px_20px_rgba(217,119,6,0.25)] hover:shadow-[0_4px_25px_rgba(217,119,6,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300" 
                })}
              >
                View Menu
              </Link>
              <Link 
                href="/reservations" 
                className={buttonVariants({ 
                  size: "lg", 
                  variant: "outline", 
                  className: "bg-white/5 hover:bg-white/10 text-white border-white/20 hover:border-white/40 rounded-full px-8 py-6 text-lg backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300" 
                })}
              >
                Book a Table
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: Floating Splash Coffee Cup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center lg:w-1/2 w-full mt-8 lg:mt-0"
          >
            {/* Background Glow */}
            <div className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] bg-amber-600/15 rounded-full blur-[70px] pointer-events-none" />
            
            {/* Float Container */}
            <motion.div
              animate={{
                y: [0, -18, 0],
                rotate: [0, 1.5, -1.5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[400px] md:h-[400px] lg:w-[440px] lg:h-[440px] z-10 rounded-full overflow-hidden border-4 border-amber-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] filter drop-shadow-[0_15px_30px_rgba(217,119,6,0.2)] bg-[#1c0d0a]"
            >
              <video
                src="https://assets.mixkit.co/videos/preview/mixkit-fresh-coffee-pouring-from-a-machine-into-a-cup-12498-large.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover scale-[1.05]"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1 cursor-pointer hover:border-white/60 transition-colors duration-300"
        >
          <div className="w-1 h-2.5 bg-amber-500 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
