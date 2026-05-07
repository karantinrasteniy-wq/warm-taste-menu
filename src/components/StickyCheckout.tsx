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
    <div
      className="md:hidden fixed inset-x-0 z-30 px-3 pointer-events-none"
      style={{ bottom: "calc(5.5rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <button
        onClick={onOpen}
        className="pointer-events-auto w-full max-w-2xl mx-auto flex items-center justify-between gap-2 rounded-full bg-brand-green text-primary-foreground font-semibold pl-2 pr-4 py-2 shadow-soft active:scale-[0.99] transition-transform"
      >
        <span className="flex items-center gap-2 min-w-0">
          <span className="h-9 w-9 shrink-0 grid place-items-center rounded-full bg-black/25 relative">
            <ShoppingBag className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-background text-foreground text-[10px] font-bold grid place-items-center border-2 border-brand-green">
              {totalQty}
            </span>
          </span>
          <span className="truncate text-sm">{tt.checkoutSticky}</span>
        </span>
        <span className="shrink-0 text-sm font-extrabold tabular-nums">{formatPrice(total, lang)}</span>
      </button>
    </div>
  );
}
