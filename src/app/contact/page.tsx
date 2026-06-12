"use client";

import { motion } from "framer-motion";
import { contactInfo } from "@/data";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } 
  }
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden">
      
      {/* Background radial accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-stone-500 text-lg font-light"
          >
            We&apos;d love to hear from you. Drop us a line or visit us at our cafe.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          
          {/* Contact Information (Left Column) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="lg:w-1/3 flex flex-col gap-8"
          >
            {/* Info Cards Container */}
            <motion.div 
              variants={itemVariants}
              className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.015)] border border-stone-100 flex flex-col gap-6"
            >
              <h3 className="text-2xl font-serif font-bold text-gray-900 border-b border-stone-100 pb-4">Contact Info</h3>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center flex-shrink-0 text-amber-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Visit Us</h4>
                  <p className="text-stone-500 text-sm mt-1 leading-relaxed font-light">{contactInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center flex-shrink-0 text-amber-600">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Call Us</h4>
                  <p className="text-stone-500 text-sm mt-1 font-light">{contactInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center flex-shrink-0 text-amber-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email Us</h4>
                  <p className="text-stone-500 text-sm mt-1 font-light">{contactInfo.email}</p>
                </div>
              </div>
            </motion.div>

            {/* Opening Hours Box */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="bg-[#1c0d0a] text-white p-8 rounded-3xl shadow-lg border border-white/5 relative overflow-hidden"
            >
              <div className="absolute right-0 bottom-0 w-32 h-32 bg-amber-600/10 rounded-full blur-2xl pointer-events-none" />
              <h3 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2 text-white">
                <Clock className="w-6 h-6 text-amber-500" /> Opening Hours
              </h3>
              <ul className="flex flex-col gap-4 relative z-10">
                {contactInfo.hours.map((hour, index) => (
                  <li key={index} className="flex justify-between items-center border-b border-white/10 pb-2.5 last:border-0 last:pb-0">
                    <span className="font-medium text-sm text-stone-200">{hour.days}</span>
                    <span className="text-amber-400 font-semibold text-sm">{hour.hours}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Contact Form (Right Column) */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:w-2/3 bg-white p-8 md:p-12 rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.015)] border border-stone-100"
          >
            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-8">Send us a Message</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 flex flex-col">
                  <label htmlFor="name" className="text-sm font-medium text-stone-700">Full Name</label>
                  <input 
                    id="name" 
                    required 
                    placeholder="John Doe" 
                    className="flex h-12 w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2 text-base placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 focus:bg-white transition-all duration-200 md:text-sm" 
                  />
                </div>
                <div className="space-y-2 flex flex-col">
                  <label htmlFor="email" className="text-sm font-medium text-stone-700">Email Address</label>
                  <input 
                    id="email" 
                    type="email" 
                    required 
                    placeholder="john@example.com" 
                    className="flex h-12 w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2 text-base placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 focus:bg-white transition-all duration-200 md:text-sm" 
                  />
                </div>
              </div>
              <div className="space-y-2 flex flex-col">
                <label htmlFor="subject" className="text-sm font-medium text-stone-700">Subject</label>
                <input 
                  id="subject" 
                  required 
                  placeholder="How can we help you?" 
                  className="flex h-12 w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2 text-base placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 focus:bg-white transition-all duration-200 md:text-sm" 
                />
              </div>
              <div className="space-y-2 flex flex-col">
                <label htmlFor="message" className="text-sm font-medium text-stone-700">Message</label>
                <textarea 
                  id="message" 
                  required 
                  placeholder="Your message here..." 
                  className="flex min-h-[150px] w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-3 text-base placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 focus:bg-white transition-all duration-200 md:text-sm" 
                />
              </div>
              
              <motion.div
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Button 
                  type="submit" 
                  className="w-full md:w-auto bg-amber-700 hover:bg-amber-800 text-white rounded-xl px-10 py-6 text-lg h-auto transition-all duration-300 shadow-[0_4px_15px_rgba(180,83,9,0.25)]"
                >
                  Send Message
                </Button>
              </motion.div>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
