import { HeroSection } from "@/components/sections/HeroSection";
import { CategoryIcons } from "@/components/sections/CategoryIcons";
import { MenuSection } from "@/components/sections/MenuSection";
import { PromoBanner } from "@/components/sections/PromoBanner";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { Footer } from "@/components/layout/Footer";
import prisma from "@/lib/prisma";

export default async function Home() {
  // Fetch real products from the database for the homepage
  const coffeeProducts = await prisma.product.findMany({
    where: { category: { name: { in: ['Espresso & Classic', 'Cold Coffee', 'Frappuccino'] } } },
    take: 8,
  });

  const dessertProducts = await prisma.product.findMany({
    where: { category: { name: { in: ['Desserts', 'Bakery & Pastries'] } } },
    take: 8,
  });

  // Map to the format expected by MenuSection
  const coffeeMenu = coffeeProducts.map(p => ({
    id: p.id,
    title: p.name,
    description: p.description,
    image: p.image,
    price: p.price
  }));

  const dessertMenu = dessertProducts.map(p => ({
    id: p.id,
    title: p.name,
    description: p.description,
    image: p.image,
    price: p.price
  }));

  return (
    <main className="w-full min-h-screen flex flex-col bg-white overflow-x-hidden">
      <div id="home"><HeroSection /></div>
      <CategoryIcons />
      <div id="coffee"><MenuSection title="OUR SPECIAL COFFEE" items={coffeeMenu} /></div>
      <div id="bakery"><MenuSection title="OUR SPECIAL DESSERT" items={dessertMenu} /></div>
      <div id="shop"><PromoBanner /></div>
      <div id="about"><NewsletterSection /></div>
      <Footer />
    </main>
  );
}
