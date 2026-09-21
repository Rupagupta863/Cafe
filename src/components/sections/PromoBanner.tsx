import Image from "next/image";

export function PromoBanner() {
  return (
    <section className="relative w-full py-16 bg-coffee-beige overflow-hidden">
      <div className="container mx-auto px-4 sm:px-8 lg:px-24 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left side text and button */}
        <div className="flex flex-col items-start text-left z-10 mb-8 md:mb-0">
          <h3 className="text-2xl md:text-3xl font-bold text-coffee-dark mb-4 leading-tight">
            Check out our best<br />coffee beans
          </h3>
          <button className="bg-[#4D3729] text-white text-sm font-bold py-2.5 px-6 rounded-[20px] hover:bg-coffee-brown hover:scale-105 active:scale-95 hover:shadow-xl transition-all duration-300 shadow-lg flex items-center gap-2">
            Explore Our Products &gt;&gt;
          </button>
        </div>

        {/* Right side image - mimicking the sack of coffee beans */}
        <div className="relative w-64 h-48 md:w-80 md:h-64 z-10">
          <Image 
            src="/images/promo_v2.jpg"
            alt="Coffee beans"
            fill
            className="object-cover rounded-tl-full rounded-br-full shadow-xl opacity-90"
          />
        </div>
        
      </div>
    </section>
  );
}
