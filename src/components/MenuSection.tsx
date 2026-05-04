import { useState } from "react";
import { dishes, Category } from "@/data/menu";
import DishCard from "./DishCard";
import { useApp } from "@/contexts/AppContext";
import { t } from "@/i18n/translations";

const CATS: Category[] = ["main", "extras", "drinks"];

export default function MenuSection() {
  const { lang } = useApp();
  const [cat, setCat] = useState<Category>("main");
  const tt = t[lang];

  return (
    <section id="menu" className="px-4 pt-10 scroll-mt-20">
      <div className="flex items-end justify-between gap-2 mb-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{tt.menu}</h2>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors border ${
              cat === c
                ? "bg-foreground text-background border-foreground"
                : "bg-card text-foreground border-border hover:border-foreground/30"
            }`}
          >
            {tt.cats[c]}
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {dishes.filter((d) => d.category === cat).map((d) => (
          <DishCard key={d.id} dish={d} />
        ))}
      </div>
    </section>
  );
}
