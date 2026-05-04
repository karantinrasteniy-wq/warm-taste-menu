import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { dishes as defaultDishes, Dish, Category } from "@/data/menu";
import { branches as defaultBranches, Branch, WHATSAPP_PHONE as DEFAULT_PHONE } from "@/data/branches";

interface DataCtx {
  dishes: Dish[];
  branches: Branch[];
  whatsappPhone: string;
  setWhatsappPhone: (p: string) => void;
  saveDish: (d: Dish) => void;
  deleteDish: (id: string) => void;
  saveBranch: (b: Branch) => void;
  deleteBranch: (id: string) => void;
  resetData: () => void;
}

const Ctx = createContext<DataCtx | null>(null);
const LS = "tandyr-data-v1";

interface Persisted { dishes: Dish[]; branches: Branch[]; phone: string }

function load(): Persisted {
  if (typeof window === "undefined") return { dishes: defaultDishes, branches: defaultBranches, phone: DEFAULT_PHONE };
  try {
    const raw = localStorage.getItem(LS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { dishes: defaultDishes, branches: defaultBranches, phone: DEFAULT_PHONE };
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(() => load());

  useEffect(() => {
    localStorage.setItem(LS, JSON.stringify(state));
  }, [state]);

  const saveDish = (d: Dish) =>
    setState((s) => {
      const ex = s.dishes.find((x) => x.id === d.id);
      return { ...s, dishes: ex ? s.dishes.map((x) => (x.id === d.id ? d : x)) : [...s.dishes, d] };
    });
  const deleteDish = (id: string) =>
    setState((s) => ({ ...s, dishes: s.dishes.filter((d) => d.id !== id) }));
  const saveBranch = (b: Branch) =>
    setState((s) => {
      const ex = s.branches.find((x) => x.id === b.id);
      return { ...s, branches: ex ? s.branches.map((x) => (x.id === b.id ? b : x)) : [...s.branches, b] };
    });
  const deleteBranch = (id: string) =>
    setState((s) => ({ ...s, branches: s.branches.filter((b) => b.id !== id) }));
  const setWhatsappPhone = (p: string) => setState((s) => ({ ...s, phone: p }));
  const resetData = () => setState({ dishes: defaultDishes, branches: defaultBranches, phone: DEFAULT_PHONE });

  return (
    <Ctx.Provider
      value={{
        dishes: state.dishes,
        branches: state.branches,
        whatsappPhone: state.phone,
        setWhatsappPhone,
        saveDish,
        deleteDish,
        saveBranch,
        deleteBranch,
        resetData,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useData() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useData must be inside DataProvider");
  return c;
}

export type { Dish, Branch, Category };
