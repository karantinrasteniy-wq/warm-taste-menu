import { useApp } from "@/contexts/AppContext";
import { useData } from "@/contexts/DataContext";
import { t } from "@/i18n/translations";
import { MapPin, Phone, Clock, MessageCircle, Instagram } from "lucide-react";

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
        <div className="rounded-2xl p-4 bg-card border border-border flex items-start gap-3">
          <div className="h-10 w-10 rounded-full bg-brand-green-soft text-accent-foreground grid place-items-center shrink-0">
            <MapPin className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">{tt.address}</div>
            <div className="font-semibold text-sm mt-0.5 break-words">{branch.address[lang]}</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {branch.twoGisUrl && (
                <a
                  href={branch.twoGisUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#4CB85C] text-white text-xs font-bold px-3 py-1.5 hover:opacity-90 transition-opacity"
                  aria-label="Открыть в 2ГИС"
                >
                  <span className="h-4 w-4 rounded-full bg-white text-[#4CB85C] grid place-items-center text-[10px] font-extrabold">2</span>
                  2ГИС
                </a>
              )}
              {branch.instagramUrl && (
                <a
                  href={branch.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full text-white text-xs font-bold px-3 py-1.5 hover:opacity-90 transition-opacity"
                  style={{ background: "linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)" }}
                  aria-label="Instagram"
                >
                  <Instagram className="h-3.5 w-3.5" />
                  Instagram
                </a>
              )}
            </div>
          </div>
        </div>
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
