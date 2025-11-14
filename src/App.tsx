import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Games from "./pages/Games";
import Favourites from "./pages/Favourites";
import Profile from "./pages/Profile";
import HelpCenter from "./pages/HelpCenter";
import ContactUs from "./pages/ContactUs";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import AboutUs from "./pages/AboutUs";
import CookiePolicy from "./pages/CookiePolicy";
import GamePlayer from "./pages/GamePlayer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* <BrowserRouter basename="/ovalplay"> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/games" element={<Games />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/play/:gameId" element={<GamePlayer />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
