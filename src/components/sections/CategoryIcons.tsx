import { Coffee, CupSoda, CakeSlice, UtensilsCrossed } from "lucide-react";
import Link from "next/link";

export function CategoryIcons() {
  return (
    <div className="bg-coffee-beige py-4 sm:py-6 px-2 sm:px-8 flex justify-center w-full">
      <div className="flex justify-around items-center w-full max-w-3xl text-coffee-dark font-bold">
        
        <Link href="#coffee" className="flex flex-col items-center gap-1 sm:gap-2 cursor-pointer hover:text-white transition-colors group">
          <Coffee className="w-6 h-6 sm:w-8 sm:h-8 group-hover:-translate-y-1 transition-transform" />
          <span className="text-[10px] sm:text-sm whitespace-nowrap">Hot Coffee</span>
        </Link>

        <Link href="#coffee" className="flex flex-col items-center gap-1 sm:gap-2 cursor-pointer hover:text-white transition-colors group">
          <CupSoda className="w-6 h-6 sm:w-8 sm:h-8 group-hover:-translate-y-1 transition-transform" />
          <span className="text-[10px] sm:text-sm whitespace-nowrap">Cold Coffee</span>
        </Link>

        <Link href="#coffee" className="flex flex-col items-center gap-1 sm:gap-2 cursor-pointer hover:text-white transition-colors group">
          <UtensilsCrossed className="w-6 h-6 sm:w-8 sm:h-8 group-hover:-translate-y-1 transition-transform" />
          <span className="text-[10px] sm:text-sm whitespace-nowrap">Cup Coffee</span>
        </Link>

        <Link href="#bakery" className="flex flex-col items-center gap-1 sm:gap-2 cursor-pointer hover:text-white transition-colors group">
          <CakeSlice className="w-6 h-6 sm:w-8 sm:h-8 group-hover:-translate-y-1 transition-transform" />
          <span className="text-[10px] sm:text-sm whitespace-nowrap">Dessert</span>
        </Link>

      </div>
    </div>
  );
}
