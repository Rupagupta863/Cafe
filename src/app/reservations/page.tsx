"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const formStaggerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1
    }
  }
};

const formFieldVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export default function ReservationsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden">
      
      {/* Background radial accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6"
          >
            Book a Table
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-stone-500 text-lg font-light"
          >
            Reserve your spot for an unforgettable coffee experience.
          </motion.p>
        </div>

        {/* Form / Success Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.015)] border border-stone-100/80"
        >
          {isSuccess ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-center py-12"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2, stiffness: 400, damping: 12 }}
                className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100"
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </motion.div>
              
              <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">Reservation Confirmed!</h3>
              <p className="text-stone-500 mb-8 font-light max-w-md mx-auto">
                Thank you for booking with us. We have reserved your table and a confirmation details email has been sent.
              </p>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  onClick={() => setIsSuccess(false)} 
                  className="bg-amber-750 hover:bg-amber-800 text-white rounded-full px-8 py-5 h-auto transition-all shadow-[0_4px_12px_rgba(180,83,9,0.15)]"
                >
                  Make Another Booking
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <motion.div 
                variants={formStaggerVariants} 
                initial="hidden" 
                animate="show" 
                className="space-y-6"
              >
                {/* Row 1: Name & Email */}
                <motion.div variants={formFieldVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 flex flex-col">
                    <label htmlFor="name" className="text-sm font-medium text-stone-750">Full Name</label>
                    <input 
                      id="name" 
                      required 
                      placeholder="John Doe" 
                      className="flex h-12 w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 focus:bg-white transition-all duration-200 md:text-sm" 
                    />
                  </div>
                  <div className="space-y-2 flex flex-col">
                    <label htmlFor="email" className="text-sm font-medium text-stone-750">Email Address</label>
                    <input 
                      id="email" 
                      type="email" 
                      required 
                      placeholder="john@example.com" 
                      className="flex h-12 w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 focus:bg-white transition-all duration-200 md:text-sm" 
                    />
                  </div>
                </motion.div>

                {/* Row 2: Date, Time & Guests */}
                <motion.div variants={formFieldVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2 flex flex-col">
                    <label htmlFor="date" className="text-sm font-medium text-stone-755">Date</label>
                    <input 
                      id="date" 
                      type="date" 
                      required 
                      className="flex h-12 w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 focus:bg-white transition-all duration-200 md:text-sm" 
                    />
                  </div>
                  <div className="space-y-2 flex flex-col">
                    <label htmlFor="time" className="text-sm font-medium text-stone-755">Time</label>
                    <input 
                      id="time" 
                      type="time" 
                      required 
                      className="flex h-12 w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 focus:bg-white transition-all duration-200 md:text-sm" 
                    />
                  </div>
                  <div className="space-y-2 flex flex-col">
                    <label htmlFor="guests" className="text-sm font-medium text-stone-755">Guests</label>
                    <input 
                      id="guests" 
                      type="number" 
                      min="1" 
                      max="10" 
                      required 
                      placeholder="2" 
                      className="flex h-12 w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 focus:bg-white transition-all duration-200 md:text-sm" 
                    />
                  </div>
                </motion.div>

                {/* Row 3: Special Requests */}
                <motion.div variants={formFieldVariants} className="space-y-2 flex flex-col">
                  <label htmlFor="requests" className="text-sm font-medium text-stone-755">Special Requests</label>
                  <textarea 
                    id="requests" 
                    placeholder="Any dietary requirements or special occasions?" 
                    className="flex min-h-[120px] w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 focus:bg-white transition-all duration-200 md:text-sm" 
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div 
                  variants={formFieldVariants}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-amber-700 hover:bg-amber-800 text-white rounded-xl py-6 text-lg mt-4 disabled:bg-amber-700/70 shadow-[0_4px_15px_rgba(180,83,9,0.25)] h-auto transition-all"
                  >
                    {isSubmitting ? "Processing..." : "Confirm Reservation"}
                  </Button>
                </motion.div>
              </motion.div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
