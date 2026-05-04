import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import type { Lang } from "@/i18n/translations";

interface CartItem { id: string; qty: number; }

interface AppCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  branchId: string;
  setBranchId: (id: string) => void;
  cart: CartItem[];
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  decrement: (id: string) => void;
  clearCart: () => void;
  comment: string;
  setComment: (c: string) => void;
  totalQty: number;
  activeTab: TabId;
  setActiveTab: (t: TabId) => void;
}

export type TabId = "home" | "menu" | "cart" | "profile";

const Ctx = createContext<AppCtx | null>(null);

const LS_KEY = "tandyr-cafe-state-v1";

export function AppProvider({ children }: { children: ReactNode }) {
  const initial = useMemo(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }, []);

  const [lang, setLang] = useState<Lang>(initial?.lang ?? "ru");
  const [branchId, setBranchId] = useState<string>(initial?.branchId ?? "central");
  const [cart, setCart] = useState<CartItem[]>(initial?.cart ?? []);
  const [comment, setComment] = useState<string>(initial?.comment ?? "");
  const [activeTab, setActiveTab] = useState<TabId>("home");

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ lang, branchId, cart, comment }));
  }, [lang, branchId, cart, comment]);

  const addToCart = (id: string) =>
    setCart((c) => {
      const ex = c.find((i) => i.id === id);
      return ex ? c.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)) : [...c, { id, qty: 1 }];
    });
  const decrement = (id: string) =>
    setCart((c) =>
      c.flatMap((i) => (i.id === id ? (i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []) : [i]))
    );
  const removeFromCart = (id: string) => setCart((c) => c.filter((i) => i.id !== id));
  const clearCart = () => { setCart([]); setComment(""); };

  const totalQty = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <Ctx.Provider value={{ lang, setLang, branchId, setBranchId, cart, addToCart, removeFromCart, decrement, clearCart, comment, setComment, totalQty, activeTab, setActiveTab }}>
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
