import { Dish } from "@/data/menu";
import { useApp } from "@/contexts/AppContext";
import { formatPrice, t } from "@/i18n/translations";
import { Plus, Minus } from "lucide-react";

export default function DishCard({ dish }: { dish: Dish }) {
  const { lang, cart, addToCart, decrement } = useApp();
  const tt = t[lang];
  const inCart = cart.find((i) => i.id === dish.id);
  const hasDiscount = typeof dish.oldPrice === "number" && dish.oldPrice > dish.price;

  return (
    <article className="group bg-card rounded-3xl overflow-hidden shadow-card border border-border/50 flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={dish.images[0]}
          alt={dish.name[lang]}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {hasDiscount && (
          <span className="absolute top-2 left-2 rounded-full bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 shadow-sm">
            -{Math.round((1 - dish.price / (dish.oldPrice as number)) * 100)}%
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-bold text-base leading-tight">{dish.name[lang]}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{dish.description[lang]}</p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-extrabold text-lg text-brand-green">{formatPrice(dish.price, lang)}</span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through decoration-destructive/70">
                {formatPrice(dish.oldPrice as number, lang)}
              </span>
            )}
          </div>
          {inCart ? (
            <div className="flex items-center gap-1 rounded-full bg-brand-green text-primary-foreground p-1">
              <button onClick={() => decrement(dish.id)} className="h-7 w-7 grid place-items-center rounded-full hover:bg-black/10" aria-label="-">
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="text-sm font-bold w-5 text-center">{inCart.qty}</span>
              <button onClick={() => addToCart(dish.id)} className="h-7 w-7 grid place-items-center rounded-full hover:bg-black/10" aria-label="+">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(dish.id)}
              className="rounded-full bg-brand-green text-primary-foreground text-sm font-semibold px-3 py-1.5 hover:bg-brand-green/90 flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              {tt.addToCart}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
