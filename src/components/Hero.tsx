import heroImg from "@/assets/hero.jpg";
import { useApp } from "@/contexts/AppContext";
import { t } from "@/i18n/translations";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const { lang, setActiveTab } = useApp();
  const tt = t[lang];

  return (
    <section id="home" className="px-4 pt-4">
      <div className="relative overflow-hidden rounded-3xl shadow-soft">
        <img
          src={heroImg}
          alt={tt.heroTitle}
          width={1536}
          height={1024}
          className="h-[64vh] min-h-[420px] w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 text-primary-foreground">
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight">
              {tt.heroTitle}
            </h1>
            <p className="mt-3 text-base sm:text-lg text-primary-foreground/90">
              {tt.heroSubtitle}
            </p>
            <Button
              size="lg"
              onClick={() => {
                setActiveTab("menu");
                document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-5 rounded-full bg-brand-green hover:bg-brand-green/90 text-primary-foreground font-semibold gap-1"
            >
              {tt.viewMenu}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
