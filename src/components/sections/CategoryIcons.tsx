import { Coffee, CupSoda, CakeSlice, UtensilsCrossed } from "lucide-react";
import Link from "next/link";

export function CategoryIcons() {
  return (
    <div className="bg-coffee-beige py-6 px-8 flex justify-center w-full">
      <div className="flex items-center gap-12 md:gap-32 text-coffee-dark font-bold text-sm">
        
        <Link href="#coffee" className="flex flex-col items-center gap-2 cursor-pointer hover:text-white transition-colors group">
          <Coffee className="w-8 h-8 group-hover:-translate-y-1 transition-transform" />
          <span>Hot Coffee</span>
        </Link>

        <Link href="#coffee" className="flex flex-col items-center gap-2 cursor-pointer hover:text-white transition-colors group">
          <CupSoda className="w-8 h-8 group-hover:-translate-y-1 transition-transform" />
          <span>Cold Coffee</span>
        </Link>

        <Link href="#coffee" className="flex flex-col items-center gap-2 cursor-pointer hover:text-white transition-colors group">
          <UtensilsCrossed className="w-8 h-8 group-hover:-translate-y-1 transition-transform" />
          <span>Cup Coffee</span>
        </Link>

        <Link href="#bakery" className="flex flex-col items-center gap-2 cursor-pointer hover:text-white transition-colors group">
          <CakeSlice className="w-8 h-8 group-hover:-translate-y-1 transition-transform" />
          <span>Dessert</span>
        </Link>

      </div>
    </div>
  );
}
