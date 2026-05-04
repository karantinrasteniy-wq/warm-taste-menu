import { useApp } from "@/contexts/AppContext";
import { t } from "@/i18n/translations";

export default function AboutSection() {
  const { lang } = useApp();
  const tt = t[lang];
  return (
    <section id="about" className="px-4 pt-12 scroll-mt-20">
      <div className="rounded-3xl bg-brand-green-soft p-6 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-accent-foreground">
          {tt.aboutTitle}
        </h2>
        <p className="mt-3 text-accent-foreground/85 leading-relaxed max-w-2xl">{tt.aboutText}</p>
      </div>
    </section>
  );
}
