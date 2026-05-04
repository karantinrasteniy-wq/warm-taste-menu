import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { useData, Dish, Branch } from "@/contexts/DataContext";
import { Category } from "@/data/menu";
import { t } from "@/i18n/translations";
import { Pencil, Trash2, Plus, X } from "lucide-react";

const CATS: Category[] = ["main", "extras", "drinks"];

const emptyDish = (): Dish => ({
  id: `dish-${Date.now()}`,
  category: "main",
  images: [],
  name: { ru: "", kz: "" },
  description: { ru: "", kz: "" },
  price: 0,
});
const emptyBranch = (): Branch => ({
  id: `branch-${Date.now()}`,
  name: { ru: "", kz: "" },
  address: { ru: "", kz: "" },
  hours: "10:00 — 22:00",
});

export default function AdminSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { lang } = useApp();
  const { dishes, branches, saveDish, deleteDish, saveBranch, deleteBranch, whatsappPhone, setWhatsappPhone, resetData } = useData();
  const tt = t[lang].admin;

  const [dishEdit, setDishEdit] = useState<Dish | null>(null);
  const [branchEdit, setBranchEdit] = useState<Branch | null>(null);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-2xl p-0 flex flex-col bg-background">
        <SheetHeader className="px-5 pt-5 pb-3 border-b border-border">
          <SheetTitle className="text-xl">{tt.title}</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="dishes" className="w-full">
            <TabsList className="mx-5 mt-3">
              <TabsTrigger value="dishes">{tt.tabs.dishes}</TabsTrigger>
              <TabsTrigger value="branches">{tt.tabs.branches}</TabsTrigger>
              <TabsTrigger value="settings">{tt.tabs.settings}</TabsTrigger>
            </TabsList>

            <TabsContent value="dishes" className="px-5 py-4 space-y-2">
              <Button onClick={() => setDishEdit(emptyDish())} className="rounded-full gap-1" size="sm">
                <Plus className="h-4 w-4" /> {tt.add}
              </Button>
              {dishes.map((d) => (
                <div key={d.id} className="flex items-center gap-3 bg-card rounded-2xl p-2 border border-border">
                  {d.images[0] ? (
                    <img src={d.images[0]} alt="" className="h-12 w-12 rounded-xl object-cover" />
                  ) : (
                    <div className="h-12 w-12 rounded-xl bg-muted" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{d.name[lang] || d.name.ru}</p>
                    <p className="text-xs text-muted-foreground">{d.price} ₸ · {d.category}</p>
                  </div>
                  <button onClick={() => setDishEdit(d)} className="h-8 w-8 grid place-items-center rounded-full hover:bg-muted">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => { if (confirm(tt.confirmDelete)) deleteDish(d.id); }}
                    className="h-8 w-8 grid place-items-center rounded-full hover:bg-muted text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="branches" className="px-5 py-4 space-y-2">
              <Button onClick={() => setBranchEdit(emptyBranch())} className="rounded-full gap-1" size="sm">
                <Plus className="h-4 w-4" /> {tt.add}
              </Button>
              {branches.map((b) => (
                <div key={b.id} className="flex items-center gap-3 bg-card rounded-2xl p-3 border border-border">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{b.name[lang] || b.name.ru}</p>
                    <p className="text-xs text-muted-foreground truncate">{b.address[lang] || b.address.ru}</p>
                  </div>
                  <button onClick={() => setBranchEdit(b)} className="h-8 w-8 grid place-items-center rounded-full hover:bg-muted">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => { if (confirm(tt.confirmDelete)) deleteBranch(b.id); }}
                    className="h-8 w-8 grid place-items-center rounded-full hover:bg-muted text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="settings" className="px-5 py-4 space-y-3">
              <label className="text-sm font-semibold">{t[lang].admin.fields.phone}</label>
              <Input value={whatsappPhone} onChange={(e) => setWhatsappPhone(e.target.value)} />
              <Button variant="outline" onClick={() => { if (confirm(tt.confirmDelete)) resetData(); }}>
                {tt.reset}
              </Button>
            </TabsContent>
          </Tabs>
        </div>

        {dishEdit && (
          <DishEditor
            dish={dishEdit}
            onClose={() => setDishEdit(null)}
            onSave={(d) => { saveDish(d); setDishEdit(null); }}
            tt={tt}
          />
        )}
        {branchEdit && (
          <BranchEditor
            branch={branchEdit}
            onClose={() => setBranchEdit(null)}
            onSave={(b) => { saveBranch(b); setBranchEdit(null); }}
            tt={tt}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}

function DishEditor({ dish, onClose, onSave, tt }: { dish: Dish; onClose: () => void; onSave: (d: Dish) => void; tt: any }) {
  const [d, setD] = useState<Dish>(dish);
  const f = tt.fields;
  return (
    <div className="absolute inset-0 bg-background z-10 flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 border-b">
        <h3 className="font-bold">{tt.edit}</h3>
        <button onClick={onClose}><X className="h-5 w-5" /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-3">
        <Field label={f.nameRu}><Input value={d.name.ru} onChange={(e) => setD({ ...d, name: { ...d.name, ru: e.target.value } })} /></Field>
        <Field label={f.nameKz}><Input value={d.name.kz} onChange={(e) => setD({ ...d, name: { ...d.name, kz: e.target.value } })} /></Field>
        <Field label={f.descRu}><Textarea value={d.description.ru} onChange={(e) => setD({ ...d, description: { ...d.description, ru: e.target.value } })} /></Field>
        <Field label={f.descKz}><Textarea value={d.description.kz} onChange={(e) => setD({ ...d, description: { ...d.description, kz: e.target.value } })} /></Field>
        <Field label={f.price}><Input type="number" value={d.price} onChange={(e) => setD({ ...d, price: Number(e.target.value) })} /></Field>
        <Field label={f.category}>
          <select value={d.category} onChange={(e) => setD({ ...d, category: e.target.value as Category })} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
            {CATS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label={f.images}>
          <Textarea
            rows={2}
            value={d.images.join(", ")}
            onChange={(e) => setD({ ...d, images: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
          />
        </Field>
      </div>
      <div className="border-t p-4 flex gap-2">
        <Button variant="outline" onClick={onClose} className="flex-1">{tt.cancel}</Button>
        <Button onClick={() => onSave(d)} className="flex-1">{tt.save}</Button>
      </div>
    </div>
  );
}

function BranchEditor({ branch, onClose, onSave, tt }: { branch: Branch; onClose: () => void; onSave: (b: Branch) => void; tt: any }) {
  const [b, setB] = useState<Branch>(branch);
  const f = tt.fields;
  return (
    <div className="absolute inset-0 bg-background z-10 flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 border-b">
        <h3 className="font-bold">{tt.edit}</h3>
        <button onClick={onClose}><X className="h-5 w-5" /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-3">
        <Field label={f.nameRu}><Input value={b.name.ru} onChange={(e) => setB({ ...b, name: { ...b.name, ru: e.target.value } })} /></Field>
        <Field label={f.nameKz}><Input value={b.name.kz} onChange={(e) => setB({ ...b, name: { ...b.name, kz: e.target.value } })} /></Field>
        <Field label={f.addressRu}><Input value={b.address.ru} onChange={(e) => setB({ ...b, address: { ...b.address, ru: e.target.value } })} /></Field>
        <Field label={f.addressKz}><Input value={b.address.kz} onChange={(e) => setB({ ...b, address: { ...b.address, kz: e.target.value } })} /></Field>
        <Field label={f.hours}><Input value={b.hours} onChange={(e) => setB({ ...b, hours: e.target.value })} /></Field>
      </div>
      <div className="border-t p-4 flex gap-2">
        <Button variant="outline" onClick={onClose} className="flex-1">{tt.cancel}</Button>
        <Button onClick={() => onSave(b)} className="flex-1">{tt.save}</Button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold">{label}</label>
      {children}
    </div>
  );
}
