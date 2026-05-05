import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MenuSection from "@/components/MenuSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import BottomNav from "@/components/BottomNav";
import CartSheet from "@/components/CartSheet";
import ProfileSheet from "@/components/ProfileSheet";
import StickyCheckout from "@/components/StickyCheckout";

const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenCart={() => setCartOpen(true)} onOpenProfile={() => setProfileOpen(true)} />
      <main className="container max-w-6xl mx-auto pb-32 md:pb-16">
        <Hero />
        <MenuSection />
        <AboutSection />
        <ContactSection />
      </main>
      <StickyCheckout onOpen={() => setCartOpen(true)} />
      <BottomNav onOpenCart={() => setCartOpen(true)} onOpenProfile={() => setProfileOpen(true)} />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      <ProfileSheet open={profileOpen} onOpenChange={setProfileOpen} />
    </div>
  );
};

export default Index;
