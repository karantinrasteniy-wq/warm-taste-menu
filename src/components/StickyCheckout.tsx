import { useApp } from "@/contexts/AppContext";
import { useData } from "@/contexts/DataContext";
import { formatPrice, t } from "@/i18n/translations";
import { ShoppingBag } from "lucide-react";

export default function StickyCheckout({ onOpen }: { onOpen: () => void }) {
  const { lang, cart, totalQty } = useApp();
  const { dishes } = useData();
  const tt = t[lang];

  if (totalQty === 0) return null;

  const total = cart.reduce((s, i) => {
    const d = dishes.find((x) => x.id === i.id);
    return s + (d ? d.price * i.qty : 0);
  }, 0);

  return (
    <div className="md:hidden fixed bottom-20 inset-x-0 z-30 px-3 pointer-events-none">
      <button
        onClick={onOpen}
        className="pointer-events-auto w-full max-w-2xl mx-auto flex items-center justify-between gap-3 rounded-full bg-brand-green text-primary-foreground font-semibold px-5 py-3 shadow-soft hover:opacity-95"
      >
        <span className="flex items-center gap-2">
          <span className="h-7 w-7 grid place-items-center rounded-full bg-black/20 text-xs font-bold">{totalQty}</span>
          {tt.checkoutSticky}
        </span>
        <span>{formatPrice(total, lang)}</span>
      </button>
    </div>
  );
}
