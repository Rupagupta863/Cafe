import Image from "next/image";
import Link from "next/link";
import { Navbar } from "../layout/Navbar";

export function HeroSection() {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] bg-[#1F1B18] flex items-center overflow-hidden">
      {/* Background texture or overlay can go here */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000&auto=format&fit=crop"
          alt="Coffee beans background"
          fill
          className="object-cover opacity-20"
        />
      </div>

      <Navbar />

      <div className="relative z-10 container mx-auto px-8 lg:px-24 flex flex-col md:flex-row items-center justify-between">
        {/* Text Content */}
        <div className="max-w-xl pt-24 md:pt-0">
          <h2 className="text-white text-2xl md:text-4xl font-bold leading-tight mb-4 tracking-wide">
            Welcome!<br />
            We serve the richest coffee<br />
            in the city!
          </h2>
          <Link href="#coffee" className="inline-block mt-6 bg-white text-coffee-dark font-bold py-3 px-8 rounded-full hover:bg-coffee-beige hover:text-white hover:scale-105 active:scale-95 shadow-md hover:shadow-lg transition-all duration-300">
            Order Now
          </Link>
        </div>

        {/* Hero Image */}
        <div className="hidden md:block relative w-[400px] h-[400px]">
          <Image
            src="/images/hero_v2.jpg"
            alt="Top down view of latte art"
            fill
            className="object-cover rounded-full shadow-2xl border-4 border-coffee-brown"
          />
        </div>
      </div>
    </section>
  );
}
