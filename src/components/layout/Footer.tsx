import Link from "next/link";
import { Logo } from "./Logo";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white text-gray-600 pt-10 pb-6 border-t border-gray-200 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-10">
          
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity inline-flex">
              <Logo className="w-10 h-10 text-coffee-dark" dotColor="#DCA948" />
              <span className="font-bold text-xl tracking-wider leading-tight font-fredoka text-gray-900">
                BREW<br />SPOT
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-4 max-w-sm">
              Elevating your daily ritual with ethically sourced, masterfully roasted coffee. Experience perfection in every cup.
            </p>
            <div className="flex gap-5">
              <a href="#" className="text-gray-400 hover:text-coffee-brown transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-coffee-brown transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-coffee-brown transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-medium text-sm text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/about" className="hover:text-coffee-brown transition-colors">About Us</Link></li>
              <li><Link href="/shop" className="hover:text-coffee-brown transition-colors">Shop Coffee</Link></li>
              <li><Link href="/menu" className="hover:text-coffee-brown transition-colors">Cafe Menu</Link></li>
              <li><Link href="/contact" className="hover:text-coffee-brown transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-medium text-sm text-gray-900 mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="#" className="hover:text-coffee-brown transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-coffee-brown transition-colors">Shipping & Returns</Link></li>
              <li><Link href="#" className="hover:text-coffee-brown transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-coffee-brown transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-sm text-gray-900 mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gray-400" />
                <span>123 Coffee Lane<br />Seattle, WA 98101</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0 text-gray-400" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0 text-gray-400" />
                <span>hello@brewspot.com</span>
              </li>
            </ul>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Brew Spot. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-coffee-brown transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-coffee-brown transition-colors">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
