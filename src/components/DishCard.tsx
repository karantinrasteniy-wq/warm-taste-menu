import { useState } from "react";
import { Dish } from "@/data/menu";
import { useApp } from "@/contexts/AppContext";
import { formatPrice, t } from "@/i18n/translations";
import { Plus, Minus, ChevronLeft, ChevronRight, Check } from "lucide-react";

export default function DishCard({ dish }: { dish: Dish }) {
  const { lang, cart, addToCart, decrement } = useApp();
  const tt = t[lang];
  const [idx, setIdx] = useState(0);
  const inCart = cart.find((i) => i.id === dish.id);

  const prev = () => setIdx((i) => (i - 1 + dish.images.length) % dish.images.length);
  const next = () => setIdx((i) => (i + 1) % dish.images.length);

  return (
    <article className="group bg-card rounded-3xl overflow-hidden shadow-card border border-border/50 flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={dish.images[idx]}
          alt={dish.name[lang]}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {dish.images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Prev"
              className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 grid place-items-center rounded-full bg-background/80 backdrop-blur hover:bg-background"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 grid place-items-center rounded-full bg-background/80 backdrop-blur hover:bg-background"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {dish.images.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${i === idx ? "w-4 bg-background" : "w-1.5 bg-background/60"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-bold text-base leading-tight">{dish.name[lang]}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{dish.description[lang]}</p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="font-extrabold text-lg">{formatPrice(dish.price, lang)}</span>
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
