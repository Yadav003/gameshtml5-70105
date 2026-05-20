import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Games from "./pages/Games";
import PremiumGamesPage from "./components/PremiumGames.tsx";
import Favourites from "./pages/Favourites";
import Profile from "./pages/Profile";
import Login from "./Login-Components/Login.tsx";
import UpdatePassword from "./Login-Components/UpdatePassword.tsx";
import ResetPassword from "./Login-Components/ResetPassword.tsx";
import HelpCenter from "./pages/HelpCenter";
import ContactUs from "./pages/ContactUs";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import AboutUs from "./pages/AboutUs";
import CookiePolicy from "./pages/CookiePolicy";
import Leaderboard from "./pages/Leaderboard";
import GamePlayer from "./pages/GamePlayer";
import OAuthCallback from "./pages/OAuthCallback";
import AdminDashboard from "./Admin-Components/dashboard/AdminDashboard.tsx";
import AdminUserManagement from "./Admin-Components/user-management/AdminUserManagement.tsx";
import AdsManagement from "./Admin-Components/Ads-Management/AdsManagement.tsx";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./lib/auth";
import RequireAdmin from "./components/RequireAdmin";
import AuthGate from "./components/AuthGate";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* <BrowserRouter basename="/PlayVerse"> */}
        <BrowserRouter>
          {/* AuthProvider provides `useAuth()` for login state */}
          <AuthProvider>
            <AuthGate>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/games" element={<Games />} />
                <Route path="/premium-games" element={<PremiumGamesPage />} />
                <Route path="/favourites" element={<Favourites />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/help-center" element={<HelpCenter />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/oauth/callback" element={<OAuthCallback />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <RequireAdmin>
                      <AdminDashboard />
                    </RequireAdmin>
                  }
                />
                <Route
                  path="/admin/user-management"
                  element={
                    <RequireAdmin>
                      <AdminUserManagement />
                    </RequireAdmin>
                  }
                />
                <Route
                  path="/admin/ads-management"
                  element={
                    <RequireAdmin>
                      <AdsManagement />
                    </RequireAdmin>
                  }
                />
                <Route path="/play/:gameId" element={<GamePlayer />} />
                <Route path="/login" element={<Login />} />
                <Route path="/update-password" element={<UpdatePassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthGate>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
