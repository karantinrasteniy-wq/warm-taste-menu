import { useState } from "react";
import { AppProvider } from "@/contexts/AppContext";
import { DataProvider } from "@/contexts/DataContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MenuSection from "@/components/MenuSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import BottomNav from "@/components/BottomNav";
import CartSheet from "@/components/CartSheet";
import ProfileSheet from "@/components/ProfileSheet";
import AdminSheet from "@/components/AdminSheet";
import StickyCheckout from "@/components/StickyCheckout";

const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <DataProvider>
      <AppProvider>
        <div className="min-h-screen bg-background">
          <Header onOpenAdmin={() => setAdminOpen(true)} />
          <main className="container max-w-5xl mx-auto pb-32">
            <Hero />
            <MenuSection />
            <AboutSection />
            <ContactSection />
          </main>
          <StickyCheckout onOpen={() => setCartOpen(true)} />
          <BottomNav onOpenCart={() => setCartOpen(true)} onOpenProfile={() => setProfileOpen(true)} />
          <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
          <ProfileSheet open={profileOpen} onOpenChange={setProfileOpen} />
          <AdminSheet open={adminOpen} onOpenChange={setAdminOpen} />
        </div>
      </AppProvider>
    </DataProvider>
  );
};

export default Index;
