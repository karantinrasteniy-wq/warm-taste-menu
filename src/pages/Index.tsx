import { useState } from "react";
import { AppProvider } from "@/contexts/AppContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MenuSection from "@/components/MenuSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import BottomNav from "@/components/BottomNav";
import CartSheet from "@/components/CartSheet";
import ProfileSheet from "@/components/ProfileSheet";

const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <AppProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container max-w-5xl mx-auto pb-32">
          <Hero />
          <MenuSection />
          <AboutSection />
          <ContactSection />
        </main>
        <BottomNav onOpenCart={() => setCartOpen(true)} onOpenProfile={() => setProfileOpen(true)} />
        <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
        <ProfileSheet open={profileOpen} onOpenChange={setProfileOpen} />
      </div>
    </AppProvider>
  );
};

export default Index;
