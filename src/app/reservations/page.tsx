"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen bg-stone-50 py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6"
          >
            Book a Table
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-stone-500 text-lg"
          >
            Reserve your spot for an unforgettable coffee experience.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-stone-100"
        >
          {isSuccess ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">Reservation Confirmed!</h3>
              <p className="text-stone-600 mb-8">Thank you for booking with us. We will send you a confirmation email shortly.</p>
              <Button onClick={() => setIsSuccess(false)} className="bg-amber-700 hover:bg-amber-800 text-white rounded-full px-8">
                Make Another Booking
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2 flex flex-col">
                  <label htmlFor="date" className="text-sm font-medium text-gray-700">Date</label>
                  <input id="date" type="date" required className="flex h-10 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" />
                </div>
                <div className="space-y-2 flex flex-col">
                  <label htmlFor="time" className="text-sm font-medium text-gray-700">Time</label>
                  <input id="time" type="time" required className="flex h-10 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" />
                </div>
                <div className="space-y-2 flex flex-col">
                  <label htmlFor="guests" className="text-sm font-medium text-gray-700">Guests</label>
                  <input id="guests" type="number" min="1" max="10" required placeholder="2" className="flex h-10 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" />
                </div>
              </div>

              <div className="space-y-2 flex flex-col">
                <label htmlFor="requests" className="text-sm font-medium text-gray-700">Special Requests</label>
                <textarea id="requests" placeholder="Any dietary requirements or special occasions?" className="flex min-h-[120px] w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-amber-700 hover:bg-amber-800 text-white rounded-xl py-6 text-lg mt-4 disabled:bg-amber-700/70"
              >
                {isSubmitting ? "Processing..." : "Confirm Reservation"}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
