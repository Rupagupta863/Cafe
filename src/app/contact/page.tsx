import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen flex flex-col bg-white overflow-x-hidden font-inter">
      <Navbar />

      <div className="flex-1 w-full flex flex-col lg:flex-row">

        {/* Left: Immersive Image & Info Panel */}
        <div className="relative w-full lg:w-1/2 h-[400px] lg:h-auto bg-coffee-dark flex flex-col justify-end">
          <Image
            src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1500&auto=format&fit=crop"
            alt="Cozy cafe interior"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          <div className="relative z-10 p-8 sm:p-10 lg:p-12 text-white w-full max-w-xl mx-auto lg:mx-0 lg:ml-auto">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 tracking-tight drop-shadow-md">
              Let's grab a <span className="text-[#DCA948]">coffee.</span>
            </h1>
            <p className="text-white/80 text-base md:text-lg mb-8 font-light leading-relaxed">
              We'd love to hear from you. Whether you have a question about our roasting process or just want to say hello, drop us a line.
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#DCA948]" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Visit Us</h4>
                  <p className="text-white/70 text-sm mt-1">123 Coffee Lane, Brew District<br />Seattle, WA 98101</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#DCA948]" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Hours</h4>
                  <p className="text-white/70 text-sm mt-1">Mon - Fri: 7am - 8pm<br />Sat - Sun: 8am - 9pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#DCA948]" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Call Us</h4>
                  <p className="text-white/70 text-sm mt-1">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center py-12 px-6 sm:px-10 lg:px-12 xl:px-16 bg-white relative">

          <div className="w-full max-w-lg relative z-10">
            <div className="mb-8 text-center lg:text-left">
              <div className="flex items-center gap-4 mb-3 justify-center lg:justify-start">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-coffee-brown">
                  Contact Us
                </span>
                <div className="h-[1px] w-8 sm:w-16 bg-coffee-brown/30"></div>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-gray-900 tracking-tight capitalize">Send a message</h2>
              <p className="text-gray-500 font-normal mt-3">
                Fill out the form below and we'll get back to you shortly.
              </p>
            </div>

            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                  <input
                    type="text"
                    className="appearance-none rounded-xl block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-coffee-brown/20 focus:border-coffee-brown transition-all sm:text-sm"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                  <input
                    type="text"
                    className="appearance-none rounded-xl block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-coffee-brown/20 focus:border-coffee-brown transition-all sm:text-sm"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    className="appearance-none rounded-xl block w-full pl-11 pr-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-coffee-brown/20 focus:border-coffee-brown transition-all sm:text-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                <select defaultValue="" className="appearance-none rounded-xl block w-full px-4 py-3 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-coffee-brown/20 focus:border-coffee-brown transition-all sm:text-sm bg-white">
                  <option value="" disabled>Select a topic...</option>
                  <option value="order">Order Inquiry</option>
                  <option value="wholesale">Wholesale Partner</option>
                  <option value="support">General Support</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                <textarea
                  rows={3}
                  className="appearance-none rounded-xl block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-coffee-brown/20 focus:border-coffee-brown transition-all sm:text-sm resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  className="group relative w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-coffee-dark hover:bg-coffee-brown focus:outline-none focus:ring-4 focus:ring-coffee-brown/20 shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  Send Message
                  <Send className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
