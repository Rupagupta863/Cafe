"use client";

import { Mail, Search } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to subscribe');
      
      toast.success(data.message === 'Already subscribed' ? "You're already on the list!" : "Thanks for subscribing!", {
        icon: '☕'
      });
      setEmail('');
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-8 bg-white text-center flex flex-col items-center relative overflow-hidden">
      <Toaster position="top-center" />
      

      <div className="flex flex-col items-center justify-center mb-6">
        <div className="flex items-center gap-4 mb-3">
          <div className="h-[1px] w-8 sm:w-16 bg-coffee-brown/30"></div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-coffee-brown">
            Newsletter
          </span>
          <div className="h-[1px] w-8 sm:w-16 bg-coffee-brown/30"></div>
        </div>
        <h3 className="text-2xl md:text-3xl font-serif text-gray-900 tracking-tight capitalize text-center">
          Join in and get <span className="lining-nums">15%</span> off!
        </h3>
      </div>
      
      <p className="text-gray-500 mb-8 text-sm">
        Subscribe to our newsletter for exclusive offers, new product launches, and cafe updates.
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xl">
        <div className="relative w-full sm:w-2/3">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address" 
            required
            className="w-full pl-12 pr-4 py-3 rounded-[12px] bg-[#BFA88D] text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-coffee-brown font-semibold text-sm"
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full sm:w-1/3 bg-coffee-dark text-white font-bold py-3 px-6 rounded-[12px] hover:bg-coffee-brown transition-colors text-sm disabled:opacity-50"
        >
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
    </section>
  );
}
