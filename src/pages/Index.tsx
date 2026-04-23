import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/africana/Navbar";
import BottomNav from "@/components/africana/BottomNav";
import Footer from "@/components/africana/Footer";
import WhatsAppFab from "@/components/africana/WhatsAppFab";
import HomePage from "@/pages/HomePage";
import BookingPage from "@/pages/BookingPage";
import ExcursionsPage from "@/pages/ExcursionsPage";
import PricingPage from "@/pages/PricingPage";
import ContactPage from "@/pages/ContactPage";
import { T, isRTL } from "@/i18n/translations";
import type { Lang } from "@/i18n/types";
import type { PageKey } from "@/lib/pages";
import { BookingProvider } from "@/context/BookingContext";

const Index = () => {
  const [page, setPage] = useState<PageKey>("home");
  const [lang, setLang] = useState<Lang>("FR");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const t = T[lang];
  const dir = isRTL(lang) ? "rtl" : "ltr";

  // SEO: title + meta description per language
  useEffect(() => {
    if (t.seo_title) document.title = t.seo_title;
    if (t.seo_desc) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", t.seo_desc);
    }
    document.documentElement.lang = lang.toLowerCase();
    document.documentElement.dir = dir;
  }, [t, lang, dir]);

  return (
    <BookingProvider>
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

export default Index;
