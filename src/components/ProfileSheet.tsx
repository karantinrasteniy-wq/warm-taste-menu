import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useApp } from "@/contexts/AppContext";
import { t } from "@/i18n/translations";
import { User } from "lucide-react";

export default function ProfileSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { lang } = useApp();
  const tt = t[lang];
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md bg-background">
        <SheetHeader>
          <SheetTitle>{tt.profileTitle}</SheetTitle>
        </SheetHeader>
        <div className="mt-10 flex flex-col items-center text-center gap-3">
          <div className="h-16 w-16 rounded-full bg-muted grid place-items-center">
            <User className="h-7 w-7 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">{tt.profileSoon}</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
