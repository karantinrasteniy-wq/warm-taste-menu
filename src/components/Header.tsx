import { useApp } from "@/contexts/AppContext";
import { useData } from "@/contexts/DataContext";
import { t } from "@/i18n/translations";
import { ChevronDown, MapPin, UtensilsCrossed } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { lang, setLang, branchId, setBranchId } = useApp();
  const { branches } = useData();
  const branch = branches.find((b) => b.id === branchId) ?? branches[0];
  const tt = t[lang];
  if (!branch) return null;

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="container flex items-center gap-2 py-3 px-4">
        <a href="#home" className="flex items-center gap-2 mr-auto">
          <div className="h-9 w-9 rounded-full bg-brand-green text-primary-foreground grid place-items-center">
            <UtensilsCrossed className="h-5 w-5" />
          </div>
          <span className="font-extrabold text-lg tracking-tight">Tandyr</span>
        </a>

        <DropdownMenu>
          <DropdownMenuTrigger className="hidden sm:flex items-center gap-1.5 text-sm rounded-full px-3 py-1.5 bg-muted hover:bg-secondary transition-colors max-w-[220px]">
            <MapPin className="h-4 w-4 text-brand-green shrink-0" />
            <span className="truncate">{branch.name[lang]}</span>
            <ChevronDown className="h-4 w-4 opacity-60 shrink-0" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            {branches.map((b) => (
              <DropdownMenuItem key={b.id} onClick={() => setBranchId(b.id)} className="flex-col items-start gap-0.5 py-2">
                <span className="font-medium">{b.name[lang]}</span>
                <span className="text-xs text-muted-foreground">{b.address[lang]}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mobile branch button */}
        <DropdownMenu>
          <DropdownMenuTrigger className="sm:hidden flex items-center gap-1 text-xs rounded-full px-2.5 py-1.5 bg-muted">
            <MapPin className="h-3.5 w-3.5 text-brand-green" />
            <ChevronDown className="h-3.5 w-3.5 opacity-60" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            {branches.map((b) => (
              <DropdownMenuItem key={b.id} onClick={() => setBranchId(b.id)} className="flex-col items-start gap-0.5 py-2">
                <span className="font-medium">{b.name[lang]}</span>
                <span className="text-xs text-muted-foreground">{b.address[lang]}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center text-xs font-semibold rounded-full bg-muted p-0.5">
          {(["ru", "kz"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-2.5 py-1 rounded-full transition-colors ${
                lang === l ? "bg-brand-green text-primary-foreground" : "text-muted-foreground"
              }`}
              aria-label={`Switch to ${l}`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        {onOpenAdmin && (
          <button
            onClick={onOpenAdmin}
            aria-label="Admin"
            className="h-8 w-8 grid place-items-center rounded-full bg-muted hover:bg-secondary text-foreground"
          >
            <Settings className="h-4 w-4" />
          </button>
        )}
      </div>
    </header>
  );
}
