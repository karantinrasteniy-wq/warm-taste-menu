import { useMemo, useState } from "react";
import { Category } from "@/data/menu";
import DishCard from "./DishCard";
import { useApp } from "@/contexts/AppContext";
import { useData } from "@/contexts/DataContext";
import { t } from "@/i18n/translations";
import { Search, X } from "lucide-react";

const CATS: Category[] = ["main", "extras", "drinks"];

export default function MenuSection() {
  const { lang } = useApp();
  const { dishes } = useData();
  const [cat, setCat] = useState<Category | "all">("all");
  const [q, setQ] = useState("");
  const tt = t[lang];

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return dishes.filter((d) => {
      if (cat !== "all" && d.category !== cat) return false;
      if (!query) return true;
      return (
        d.name.ru.toLowerCase().includes(query) ||
        d.name.kz.toLowerCase().includes(query) ||
        d.description.ru.toLowerCase().includes(query) ||
        d.description.kz.toLowerCase().includes(query)
      );
    });
  }, [dishes, cat, q]);

  return (
    <section id="menu" className="px-4 pt-10 scroll-mt-20">
      <div className="flex items-end justify-between gap-2 mb-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{tt.menu}</h2>
      </div>

      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={tt.search}
          className="w-full rounded-full bg-card border border-border pl-9 pr-9 py-2.5 text-sm outline-none focus:border-brand-green"
        />
        {q && (
          <button
            onClick={() => setQ("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 grid place-items-center rounded-full hover:bg-muted text-muted-foreground"
            aria-label="Clear"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
        <button
          onClick={() => setCat("all")}
          className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors border ${
            cat === "all"
              ? "bg-foreground text-background border-foreground"
              : "bg-card text-foreground border-border hover:border-foreground/30"
          }`}
        >
          {tt.all}
        </button>
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

      {filtered.length === 0 ? (
        <p className="mt-8 text-center text-muted-foreground text-sm">{tt.nothingFound}</p>
      ) : (
        <div className="mt-5 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {filtered.map((d) => (
            <DishCard key={d.id} dish={d} />
          ))}
        </div>
      )}
    </section>
  );
}
