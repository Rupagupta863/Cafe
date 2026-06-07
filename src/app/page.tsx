import { Hero } from "@/components/sections/Hero";
import { FeaturedItems } from "@/components/sections/FeaturedItems";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { Gallery } from "@/components/sections/Gallery";
import { ReservationCTA } from "@/components/sections/ReservationCTA";
import { menuItems } from "@/data";

export default function Home() {
  const featuredDrinks = menuItems.filter(item => item.featured && item.category !== "Food");
  const popularFood = menuItems.filter(item => item.popular && item.category === "Food");

  return (
    <>
      <Hero />
      <FeaturedItems 
        title="Signature Roasts" 
        subtitle="Featured Drinks" 
        items={featuredDrinks} 
        viewAllLink="/menu" 
        bgWhite={true}
      />
      <WhyChooseUs />
      <FeaturedItems 
        title="Artisanal Bites" 
        subtitle="Popular Food" 
        items={popularFood} 
        viewAllLink="/menu" 
      />
      <Testimonials />
      <Gallery />
      <ReservationCTA />
    </>
  );
}
