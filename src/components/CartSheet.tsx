import { useMemo } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useApp } from "@/contexts/AppContext";
import { useData } from "@/contexts/DataContext";
import { formatPrice, t } from "@/i18n/translations";
import { Plus, Minus, Trash2, MessageCircle, ShoppingBag } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function CartSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { lang, cart, addToCart, decrement, removeFromCart, comment, setComment, branchId, clearCart } = useApp();
  const { dishes, branches, whatsappPhone } = useData();
  const tt = t[lang];
  const branch = branches.find((b) => b.id === branchId) ?? branches[0];
  if (!branch) return null;

  const items = useMemo(
    () => cart.map((c) => ({ ...c, dish: dishes.find((d) => d.id === c.id)! })).filter((i) => i.dish),
    [cart]
  );
  const total = items.reduce((s, i) => s + i.dish.price * i.qty, 0);

  const message = useMemo(() => {
    if (!items.length) return "";
    const lines = [
      tt.orderHeader,
      "",
      `📍 ${tt.orderBranch}: ${branch.name[lang]} — ${branch.address[lang]}`,
      "",
      `🧾 ${tt.orderItems}:`,
      ...items.map((i) => `• ${i.dish.name[lang]} × ${i.qty} — ${formatPrice(i.dish.price * i.qty, lang)}`),
      "",
      `💰 ${tt.orderTotal}: ${formatPrice(total, lang)}`,
      ...(comment.trim() ? ["", `💬 ${tt.orderComment}: ${comment.trim()}`] : []),
    ];
    return lines.join("\n");
  }, [items, branch, comment, lang, total, tt]);

  const checkout = () => {
    const url = `https://wa.me/${whatsappPhone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    clearCart();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col bg-background">
        <SheetHeader className="px-5 pt-5 pb-3 border-b border-border">
          <SheetTitle className="text-xl">{tt.cart}</SheetTitle>
          <p className="text-xs text-muted-foreground text-left">
            {tt.pickupAt}: <span className="font-medium text-foreground">{branch.name[lang]}</span>
          </p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 gap-3">
              <div className="h-16 w-16 rounded-full bg-muted grid place-items-center">
                <ShoppingBag className="h-7 w-7 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold">{tt.cartEmpty}</p>
                <p className="text-sm text-muted-foreground mt-1">{tt.cartEmptyHint}</p>
              </div>
            </div>
          ) : (
            <>
              {items.map((i) => (
                <div key={i.id} className="flex gap-3 bg-card rounded-2xl p-2 border border-border">
                  <img src={i.dish.images[0]} alt="" className="h-16 w-16 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <p className="font-semibold text-sm leading-tight">{i.dish.name[lang]}</p>
                      <button onClick={() => removeFromCart(i.id)} className="text-muted-foreground hover:text-destructive shrink-0">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{formatPrice(i.dish.price, lang)}</p>
                    <div className="mt-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full bg-muted p-0.5">
                        <button onClick={() => decrement(i.id)} className="h-6 w-6 grid place-items-center rounded-full hover:bg-background" aria-label="-">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-bold w-5 text-center">{i.qty}</span>
                        <button onClick={() => addToCart(i.id)} className="h-6 w-6 grid place-items-center rounded-full hover:bg-background" aria-label="+">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-bold text-sm">{formatPrice(i.dish.price * i.qty, lang)}</span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <label className="text-sm font-semibold">{tt.comment}</label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={tt.commentPlaceholder}
                  className="mt-1.5 rounded-2xl resize-none bg-card"
                  rows={3}
                />
              </div>

              <div className="pt-2">
                <p className="text-sm font-semibold mb-1.5">{tt.preview}</p>
                <pre className="text-xs whitespace-pre-wrap bg-muted rounded-2xl p-3 font-sans text-foreground/90 max-h-48 overflow-y-auto">
{message}
                </pre>
              </div>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border p-4 space-y-3 bg-background">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{tt.total}</span>
              <span className="text-xl font-extrabold">{formatPrice(total, lang)}</span>
            </div>
            <button
              onClick={checkout}
              className="w-full rounded-full bg-whatsapp text-primary-foreground font-semibold py-3 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="h-5 w-5" />
              {tt.checkout}
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
