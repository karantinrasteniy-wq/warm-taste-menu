import { useApp } from "@/contexts/AppContext";
import { useData } from "@/contexts/DataContext";
import { t } from "@/i18n/translations";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";

export default function ContactSection() {
  const { lang, branchId } = useApp();
  const { branches, whatsappPhone } = useData();
  const tt = t[lang];
  const branch = branches.find((b) => b.id === branchId) ?? branches[0];
  if (!branch) return null;
  const waLink = `https://wa.me/${whatsappPhone.replace(/\D/g, "")}`;

  return (
    <section id="contacts" className="px-4 pt-12 scroll-mt-20">
      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{tt.contactsTitle}</h2>
      <div className="mt-4 grid sm:grid-cols-2 gap-3">
        <Info icon={<MapPin className="h-5 w-5" />} label={tt.address} value={branch.address[lang]} />
        <Info icon={<Phone className="h-5 w-5" />} label={tt.phone} value={`+${whatsappPhone}`} />
        <Info icon={<Clock className="h-5 w-5" />} label={tt.hours} value={branch.hours} />
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl p-4 bg-whatsapp text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          <MessageCircle className="h-5 w-5" />
          {tt.whatsapp}
        </a>
      </div>
    </section>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl p-4 bg-card border border-border flex items-start gap-3">
      <div className="h-10 w-10 rounded-full bg-brand-green-soft text-accent-foreground grid place-items-center shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="font-semibold text-sm mt-0.5 break-words">{value}</div>
      </div>
    </div>
  );
}
