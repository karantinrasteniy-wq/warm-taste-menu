import { Home, UtensilsCrossed, ShoppingBag, User } from "lucide-react";
import { useApp, TabId } from "@/contexts/AppContext";
import { t } from "@/i18n/translations";

export default function BottomNav({ onOpenCart, onOpenProfile }: { onOpenCart: () => void; onOpenProfile: () => void }) {
  const { lang, totalQty, activeTab, setActiveTab } = useApp();
  const tt = t[lang].nav;

  const go = (id: TabId) => {
    setActiveTab(id);
    if (id === "cart") return onOpenCart();
    if (id === "profile") return onOpenProfile();
    const target = id === "home" ? "home" : "menu";
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  };

  const items: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: "home", label: tt.home, icon: <Home className="h-5 w-5" /> },
    { id: "menu", label: tt.menu, icon: <UtensilsCrossed className="h-5 w-5" /> },
    { id: "cart", label: tt.cart, icon: <ShoppingBag className="h-5 w-5" /> },
    { id: "profile", label: tt.profile, icon: <User className="h-5 w-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 safe-bottom">
      <div className="mx-auto max-w-2xl px-3 pb-3">
        <div className="rounded-full bg-card/95 backdrop-blur border border-border shadow-soft flex items-center justify-around px-2 py-1.5">
          {items.map((it) => {
            const active = activeTab === it.id;
            return (
              <button
                key={it.id}
                onClick={() => go(it.id)}
                className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-full transition-colors ${
                  active ? "text-brand-green" : "text-muted-foreground"
                }`}
              >
                <div className="relative">
                  {it.icon}
                  {it.id === "cart" && totalQty > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold grid place-items-center">
                      {totalQty}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium">{it.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
