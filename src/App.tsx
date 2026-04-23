import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import { detectBrowserLang, isSupportedLang, SUPPORTED_LANGS } from "@/lib/i18nRoutes";
import type { PageKey } from "@/lib/pages";

const queryClient = new QueryClient();

/** Redirect "/" → "/{detected-lang}" */
const RootRedirect = () => {
  const lang = detectBrowserLang().toLowerCase();
  return <Navigate to={`/${lang}`} replace />;
};

/** Validate :lang segment — if invalid, fallback to FR */
const LangGuard = ({ page }: { page: PageKey }) => {
  const { lang } = useParams<{ lang: string }>();
  if (!lang || !isSupportedLang(lang)) {
    return <Navigate to={`/fr`} replace />;
  }
  return <Index initialPage={page} />;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            {/* Per-language routes — same Index component, page derived from path */}
            <Route path="/:lang" element={<LangGuard page="home" />} />
            <Route path="/:lang/booking" element={<LangGuard page="booking" />} />
            <Route path="/:lang/excursions" element={<LangGuard page="excursions" />} />
            <Route path="/:lang/pricing" element={<LangGuard page="pricing" />} />
            <Route path="/:lang/contact" element={<LangGuard page="contact" />} />
            {/* Legacy redirect: bare slug without lang */}
            <Route path="/booking" element={<Navigate to={`/${detectBrowserLang().toLowerCase()}/booking`} replace />} />
            <Route path="/excursions" element={<Navigate to={`/${detectBrowserLang().toLowerCase()}/excursions`} replace />} />
            <Route path="/pricing" element={<Navigate to={`/${detectBrowserLang().toLowerCase()}/pricing`} replace />} />
            <Route path="/contact" element={<Navigate to={`/${detectBrowserLang().toLowerCase()}/contact`} replace />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

// Suppress unused import warning (SUPPORTED_LANGS used elsewhere)
void SUPPORTED_LANGS;
