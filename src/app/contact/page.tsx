"use client";

import { motion } from "framer-motion";
import { contactInfo } from "@/data";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-stone-50 py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-stone-500 text-lg"
          >
            We&apos;d love to hear from you. Drop us a line or visit us at our cafe.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-1/3 flex flex-col gap-8"
          >
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 flex flex-col gap-6">
              <h3 className="text-2xl font-serif font-bold text-gray-900 border-b border-stone-100 pb-4">Contact Info</h3>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center flex-shrink-0 text-amber-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Visit Us</h4>
                  <p className="text-stone-500 text-sm mt-1 leading-relaxed">{contactInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center flex-shrink-0 text-amber-600">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Call Us</h4>
                  <p className="text-stone-500 text-sm mt-1">{contactInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center flex-shrink-0 text-amber-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email Us</h4>
                  <p className="text-stone-500 text-sm mt-1">{contactInfo.email}</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-800 text-white p-8 rounded-3xl shadow-lg">
              <h3 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6" /> Opening Hours
              </h3>
              <ul className="flex flex-col gap-4">
                {contactInfo.hours.map((hour, index) => (
                  <li key={index} className="flex justify-between items-center border-b border-amber-700/50 pb-2 last:border-0 last:pb-0">
                    <span className="font-medium">{hour.days}</span>
                    <span className="text-amber-200">{hour.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:w-2/3 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-100"
          >
            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-8">Send us a Message</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 flex flex-col">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                  <input id="name" required placeholder="John Doe" className="flex h-10 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" />
                </div>
                <div className="space-y-2 flex flex-col">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                  <input id="email" type="email" required placeholder="john@example.com" className="flex h-10 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" />
                </div>
              </div>
              <div className="space-y-2 flex flex-col">
                <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</label>
                <input id="subject" required placeholder="How can we help you?" className="flex h-10 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" />
              </div>
              <div className="space-y-2 flex flex-col">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                <textarea id="message" required placeholder="Your message here..." className="flex min-h-[150px] w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" />
              </div>
              <Button type="submit" className="w-full md:w-auto bg-amber-700 hover:bg-amber-800 text-white rounded-xl px-10 py-6 text-lg mt-4">
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
