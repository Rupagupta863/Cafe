"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

export function OfferPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Force show the popup for testing
    setIsOpen(true);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    toast.success("Offer claimed! Check your email for the code.");
    closePopup();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-3xl transform transition-transform duration-500 scale-100">
        
        {/* Left Side: Image */}
        <div className="relative w-full md:w-1/2 h-48 md:h-auto hidden md:block">
          <Image 
            src="https://images.unsplash.com/photo-1551030173-122aabc4489c?q=80&w=600&auto=format&fit=crop" 
            alt="Delicious coffee offer"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Side: Content */}
        <div className="relative w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-center bg-coffee-cream">
          <button 
            onClick={closePopup}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-coffee-dark bg-white/50 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-coffee-brown font-bold tracking-widest text-sm uppercase mb-2">Limited Time Offer</span>
          <h2 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-4">Get 20% Off!</h2>
          <p className="text-gray-700 mb-6 text-sm md:text-base">
            Join our coffee club today and receive an exclusive 20% discount on your first order. Plus, get early access to new blends!
          </p>

          <form onSubmit={handleClaim} className="flex flex-col gap-3">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-coffee-brown/30 focus:outline-none focus:ring-2 focus:ring-coffee-brown bg-white text-coffee-dark placeholder:text-gray-400"
            />
            <button 
              type="submit"
              className="w-full bg-coffee-dark text-white font-bold py-3 px-6 rounded-xl hover:bg-coffee-brown hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              Claim My 20% Off
            </button>
          </form>
          
          <button 
            onClick={closePopup}
            className="mt-4 text-xs text-gray-500 hover:text-coffee-dark underline underline-offset-4"
          >
            No thanks, I'll pay full price
          </button>
        </div>

      </div>
    </div>
  );
}
