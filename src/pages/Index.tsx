import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/africana/Navbar";
import BottomNav from "@/components/africana/BottomNav";
import Footer from "@/components/africana/Footer";
import WhatsAppFab from "@/components/africana/WhatsAppFab";
import HomePage from "@/pages/HomePage";
import BookingPage from "@/pages/BookingPage";
import ExcursionsPage from "@/pages/ExcursionsPage";
import PricingPage from "@/pages/PricingPage";
import ContactPage from "@/pages/ContactPage";
import SeoHead from "@/components/seo/SeoHead";
import { T, isRTL } from "@/i18n/translations";
import type { Lang } from "@/i18n/types";
import type { PageKey } from "@/lib/pages";
import { BookingProvider } from "@/context/BookingContext";
import { buildPath, isSupportedLang } from "@/lib/i18nRoutes";

type Props = { initialPage: PageKey };

const Index = ({ initialPage }: Props) => {
  const navigate = useNavigate();
  const { lang: langParam } = useParams<{ lang: string }>();

  // Derive lang from URL (already validated by guard, but be defensive)
  const lang: Lang =
    langParam && isSupportedLang(langParam)
      ? (langParam.toUpperCase() as Lang)
      : "FR";

  const page: PageKey = initialPage;

  // Replace state-based setPage / setLang with router navigation
  const setPage = (p: PageKey) => navigate(buildPath(lang, p));
  const setLang = (l: Lang) => navigate(buildPath(l, page));

  // scrolled state via simple effect (kept inside component, used by Navbar)
  const [scrolled, setScrolled] = useScrolled();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const t = T[lang];
  const dir = isRTL(lang) ? "rtl" : "ltr";

  return (
    <BookingProvider>
      <SeoHead page={page} lang={lang} />
      <Navbar page={page} setPage={setPage} lang={lang} setLang={setLang} scrolled={scrolled} />
      <AnimatePresence mode="wait">
        <motion.main key={page + lang} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} dir={dir}>
          {page === "home" && <HomePage setPage={setPage} lang={lang} t={t} />}
          {page === "booking" && <BookingPage lang={lang} t={t} />}
          {page === "excursions" && <ExcursionsPage setPage={setPage} lang={lang} t={t} />}
          {page === "pricing" && <PricingPage setPage={setPage} lang={lang} t={t} />}
          {page === "contact" && <ContactPage setPage={setPage} lang={lang} t={t} />}
        </motion.main>
      </AnimatePresence>
      <Footer setPage={setPage} lang={lang} t={t} />
      <BottomNav page={page} setPage={setPage} t={t} />
      <WhatsAppFab />
    </BookingProvider>
  );
};

// Tiny inline hook to keep the file self-contained
import { useState } from "react";
function useScrolled(): [boolean, (v: boolean) => void] {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return [scrolled, setScrolled];
}

export default Index;
