import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import { Leaf, Heart, Users, Coffee } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen bg-white font-inter text-gray-800 selection:bg-coffee-beige/30">
      <Navbar />

      <article className="max-w-5xl mx-auto px-6 lg:px-12 pt-6 pb-12 lg:pt-10 lg:pb-20">
        
        {/* Editorial Header */}
        <header className="mb-12 text-center lg:text-left flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8 border-b border-gray-200 pb-10">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.2em] text-coffee-brown mb-4 block font-semibold">
              Our Story
            </span>
            <h1 className="text-3xl lg:text-4xl font-serif font-medium text-gray-900 leading-tight">
              Crafting the perfect cup, <br className="hidden sm:block" />
              <span className="italic text-coffee-brown">one bean at a time.</span>
            </h1>
          </div>
          <div className="text-sm text-gray-500 max-w-sm text-center lg:text-right leading-relaxed font-light">
            Founded in 2024, Brew Spot began with a simple mission: to elevate the daily coffee ritual.
          </div>
        </header>

        {/* Editorial Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-3 font-serif">The art of the roast</h2>
              <p className="text-sm text-gray-600 leading-loose font-light">
                We believe that great coffee starts at the source. That's why we partner directly with sustainable farms across the globe to source the highest quality Arabica beans, ensuring ethical practices and exceptional flavor profiles.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-3 font-serif">More than just coffee</h2>
              <p className="text-sm text-gray-600 leading-loose font-light">
                Our master roasters carefully roast each batch locally to bring out the unique flavor profiles of every origin. Complementing our coffee, our artisanal bakery serves up fresh, handmade pastries and desserts daily.
              </p>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <p className="text-base italic font-serif text-gray-800 leading-relaxed">
                "Whether you're stopping by for a quick morning espresso or settling in for an afternoon of work, Brew Spot is your destination."
              </p>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-[4/3] bg-gray-50 rounded-sm overflow-hidden">
              <Image 
                src="/images/hero_v2.jpg"
                alt="Brew Spot Cafe Process"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="mt-4 flex justify-between items-center text-[10px] uppercase tracking-[0.15em] text-gray-400">
              <span>Locally Roasted</span>
              <span>100% Organic Beans</span>
            </div>
          </div>

        </div>

        {/* Image Gallery Section */}
        <div className="mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative aspect-square bg-gray-50 rounded-sm overflow-hidden">
              <Image src="/images/menu_coffee_1.jpg" alt="Barista working" fill className="object-cover" />
            </div>
            <div className="relative aspect-square bg-gray-50 rounded-sm overflow-hidden md:mt-12">
              <Image src="/images/hero.jpg" alt="Coffee beans" fill className="object-cover" />
            </div>
            <div className="relative aspect-square bg-gray-50 rounded-sm overflow-hidden">
              <Image src="/images/coffee_v2.jpg" alt="Cafe atmosphere" fill className="object-cover" />
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold">Every detail matters</p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-24 pt-16 border-t border-gray-200">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.2em] text-coffee-brown mb-4 block font-semibold">
              The People
            </span>
            <h3 className="text-2xl lg:text-3xl font-serif font-medium text-gray-900">
              Behind the beans.
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            
            <div className="flex flex-col items-center text-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6 bg-gray-50">
                <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" alt="Head Roaster" fill className="object-cover" />
              </div>
              <h4 className="text-base font-medium text-gray-900 font-serif mb-1">Elias Vance</h4>
              <p className="text-[11px] uppercase tracking-widest text-coffee-brown">Head Roaster</p>
              <p className="text-sm text-gray-500 mt-4 leading-relaxed font-light">With over 15 years of sourcing experience, Elias ensures every bean meets our rigorous standards.</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6 bg-gray-50">
                <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop" alt="Lead Barista" fill className="object-cover" />
              </div>
              <h4 className="text-base font-medium text-gray-900 font-serif mb-1">Clara Reed</h4>
              <p className="text-[11px] uppercase tracking-widest text-coffee-brown">Lead Barista</p>
              <p className="text-sm text-gray-500 mt-4 leading-relaxed font-light">Clara brings artistry and precision to every cup, training our staff in the fine details of espresso.</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6 bg-gray-50">
                <Image src="https://images.unsplash.com/photo-1581349485608-9469926a8e5e?q=80&w=400&auto=format&fit=crop" alt="Pastry Chef" fill className="object-cover" />
              </div>
              <h4 className="text-base font-medium text-gray-900 font-serif mb-1">Mateo Silva</h4>
              <p className="text-[11px] uppercase tracking-widest text-coffee-brown">Pastry Chef</p>
              <p className="text-sm text-gray-500 mt-4 leading-relaxed font-light">Mateo bakes our artisanal goods fresh every morning, complementing our coffee profiles perfectly.</p>
            </div>

          </div>
        </div>

        {/* Minimal Commitments Section */}
        <div className="mt-24 pt-16 border-t border-gray-200">
          <h3 className="text-center text-[10px] uppercase tracking-[0.2em] text-coffee-brown mb-10 font-semibold">
            Our Commitments
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            
            <div className="flex flex-col items-center text-center">
              <Leaf className="w-5 h-5 text-coffee-brown mb-3 stroke-[1.5]" />
              <h4 className="text-sm font-medium text-gray-900 mb-2 font-serif">Ethical Sourcing</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-light">Fair-trade verified farms.</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <Coffee className="w-5 h-5 text-coffee-brown mb-3 stroke-[1.5]" />
              <h4 className="text-sm font-medium text-gray-900 mb-2 font-serif">Fresh Daily</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-light">Small-batch artisanal roasts.</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <Users className="w-5 h-5 text-coffee-brown mb-3 stroke-[1.5]" />
              <h4 className="text-sm font-medium text-gray-900 mb-2 font-serif">Community</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-light">Warm, inclusive spaces.</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <Heart className="w-5 h-5 text-coffee-brown mb-3 stroke-[1.5]" />
              <h4 className="text-sm font-medium text-gray-900 mb-2 font-serif">Eco-Friendly</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-light">Zero-waste practices.</p>
            </div>

          </div>
        </div>

      </article>

      <Footer />
    </main>
  )
}
