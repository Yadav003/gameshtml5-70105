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
import AdminReports from "./Admin-Components/reports/AdminReports.tsx";
import AdminRewardRedemptions from "./Admin-Components/rewards/AdminRewardRedemptions.tsx";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./lib/auth";
import RequireAdmin from "./components/RequireAdmin";
import AuthGate from "./components/AuthGate";
import SpinWheelPage from "./pages/SpinWheelPage";
import RedeemPage from "./pages/RedeemPage";
import ProtectedRedeemRoute from "./components/ProtectedRedeemRoute";
import { RouteSeo } from "./components/RouteSeo";
import {
  createAboutPageSchema,
  createBreadcrumbSchema,
  createCollectionPageSchema,
  createContactPageSchema,
  createFaqPageSchema,
  createOrganizationSchema,
  createWebPageSchema,
  createWebsiteSchema,
} from "./lib/schema";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* <BrowserRouter basename="/PlayArena"> */}
        <BrowserRouter>
          {/* AuthProvider provides `useAuth()` for login state */}
          <AuthProvider>
            <AuthGate>
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <RouteSeo
                        route="home"
                        schema={[
                          createOrganizationSchema(),
                          createWebsiteSchema("https://playarena.co.in"),
                          createWebPageSchema("https://playarena.co.in/", "PlayArena | Free Online Games", "Play free online games instantly in your browser."),
                        ]}
                      />
                      <Index />
                    </>
                  }
                />
                <Route
                  path="/games"
                  element={
                    <>
                      <RouteSeo
                        route="games"
                        schema={[
                          createCollectionPageSchema("https://playarena.co.in/games", "Play Free Games Online | PlayArena Game Library", "Browse the PlayArena game library with free online games across puzzle, arcade, racing, sports, and casual categories."),
                          createWebPageSchema("https://playarena.co.in/games", "Play Free Games Online | PlayArena Game Library", "Browse the PlayArena game library with free online games across puzzle, arcade, racing, sports, and casual categories."),
                          createBreadcrumbSchema([
                            { name: "Home", url: "https://playarena.co.in/" },
                            { name: "Games", url: "https://playarena.co.in/games" },
                          ]),
                        ]}
                      />
                      <Games />
                    </>
                  }
                />
                <Route
                  path="/premium-games"
                  element={
                    <>
                      <RouteSeo route="premiumGames" />
                      <PremiumGamesPage />
                    </>
                  }
                />
                <Route
                  path="/spin-wheel"
                  element={
                    <>
                      <RouteSeo route="spinWheel" />
                      <SpinWheelPage />
                    </>
                  }
                />
                <Route
                  path="/play-and-earn"
                  element={
                    <>
                      <RouteSeo route="spinWheel" />
                      <SpinWheelPage />
                    </>
                  }
                />
                <Route
                  path="/redeem"
                  element={
                    <>
                      <RouteSeo route="redeem" />
                      <ProtectedRedeemRoute>
                        <RedeemPage />
                      </ProtectedRedeemRoute>
                    </>
                  }
                />
                <Route
                  path="/favourites"
                  element={
                    <>
                      <RouteSeo route="favourites" />
                      <Favourites />
                    </>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <>
                      <RouteSeo route="profile" />
                      <Profile />
                    </>
                  }
                />
                <Route
                  path="/help-center"
                  element={
                    <>
                      <RouteSeo route="helpCenter" />
                      <HelpCenter />
                    </>
                  }
                />
                <Route
                  path="/contact-us"
                  element={
                    <>
                      <RouteSeo
                        route="contactUs"
                        schema={[
                          createContactPageSchema("https://playarena.co.in/contact-us", "Contact PlayArena | Support and Feedback", "Get in touch with the PlayArena team for support, feedback, or general questions."),
                          createWebPageSchema("https://playarena.co.in/contact-us", "Contact PlayArena | Support and Feedback", "Get in touch with the PlayArena team for support, feedback, or general questions."),
                          createBreadcrumbSchema([
                            { name: "Home", url: "https://playarena.co.in/" },
                            { name: "Contact Us", url: "https://playarena.co.in/contact-us" },
                          ]),
                        ]}
                      />
                      <ContactUs />
                    </>
                  }
                />
                <Route
                  path="/faq"
                  element={
                    <>
                      <RouteSeo
                        route="faq"
                        schema={[
                          createFaqPageSchema("https://playarena.co.in/faq", "PlayArena FAQ | Common Questions and Answers", "Read the PlayArena FAQ for answers about playing games, accounts, and platform features.", [
                            {
                              "@type": "Question",
                              name: "What is PlayArena?",
                              acceptedAnswer: {
                                "@type": "Answer",
                                text: "PlayArena is a browser-based gaming platform with free online games across action, puzzle, sports, and casual genres.",
                              },
                            },
                            {
                              "@type": "Question",
                              name: "Do I need to download any software?",
                              acceptedAnswer: {
                                "@type": "Answer",
                                text: "No downloads are required. You can play directly in your browser.",
                              },
                            },
                          ]),
                          createWebPageSchema("https://playarena.co.in/faq", "PlayArena FAQ | Common Questions and Answers", "Read the PlayArena FAQ for answers about playing games, accounts, and platform features."),
                          createBreadcrumbSchema([
                            { name: "Home", url: "https://playarena.co.in/" },
                            { name: "FAQ", url: "https://playarena.co.in/faq" },
                          ]),
                        ]}
                      />
                      <FAQ />
                    </>
                  }
                />
                <Route
                  path="/privacy-policy"
                  element={
                    <>
                      <RouteSeo route="privacyPolicy" />
                      <PrivacyPolicy />
                    </>
                  }
                />
                <Route
                  path="/terms-conditions"
                  element={
                    <>
                      <RouteSeo route="termsConditions" />
                      <TermsConditions />
                    </>
                  }
                />
                <Route
                  path="/about-us"
                  element={
                    <>
                      <RouteSeo
                        route="aboutUs"
                        schema={[
                          createAboutPageSchema("https://playarena.co.in/about-us", "About PlayArena | Free Online Game Platform", "Learn about PlayArena, our mission, and the free online gaming experience we offer."),
                          createWebPageSchema("https://playarena.co.in/about-us", "About PlayArena | Free Online Game Platform", "Learn about PlayArena, our mission, and the free online gaming experience we offer."),
                          createBreadcrumbSchema([
                            { name: "Home", url: "https://playarena.co.in/" },
                            { name: "About Us", url: "https://playarena.co.in/about-us" },
                          ]),
                        ]}
                      />
                      <AboutUs />
                    </>
                  }
                />
                <Route
                  path="/cookie-policy"
                  element={
                    <>
                      <RouteSeo route="cookiePolicy" />
                      <CookiePolicy />
                    </>
                  }
                />
                <Route
                  path="/leaderboard"
                  element={
                    <>
                      <RouteSeo route="leaderboard" />
                      <Leaderboard />
                    </>
                  }
                />
                <Route
                  path="/oauth/callback"
                  element={
                    <>
                      <RouteSeo route="oauthCallback" />
                      <OAuthCallback />
                    </>
                  }
                />
                <Route
                  path="/admin/dashboard"
                  element={
                    <>
                      <RouteSeo route="adminDashboard" />
                      <RequireAdmin>
                        <AdminDashboard />
                      </RequireAdmin>
                    </>
                  }
                />
                <Route
                  path="/admin/user-management"
                  element={
                    <>
                      <RouteSeo route="adminUsers" />
                      <RequireAdmin>
                        <AdminUserManagement />
                      </RequireAdmin>
                    </>
                  }
                />
                <Route
                  path="/admin/ads-management"
                  element={
                    <>
                      <RouteSeo route="adminAds" />
                      <RequireAdmin>
                        <AdsManagement />
                      </RequireAdmin>
                    </>
                  }
                />
                <Route
                  path="/admin/reports"
                  element={
                    <>
                      <RouteSeo route="adminReports" />
                      <RequireAdmin>
                        <AdminReports />
                      </RequireAdmin>
                    </>
                  }
                />
                <Route
                  path="/admin/reward-redemptions"
                  element={
                    <>
                      <RouteSeo route="adminRewards" />
                      <RequireAdmin>
                        <AdminRewardRedemptions />
                      </RequireAdmin>
                    </>
                  }
                />
                <Route
                  path="/play/:gameId"
                  element={
                    <>
                      <GamePlayer />
                    </>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <>
                      <RouteSeo route="login" />
                      <Login />
                    </>
                  }
                />
                <Route
                  path="/update-password"
                  element={
                    <>
                      <RouteSeo route="updatePassword" />
                      <UpdatePassword />
                    </>
                  }
                />
                <Route
                  path="/reset-password"
                  element={
                    <>
                      <RouteSeo route="resetPassword" />
                      <ResetPassword />
                    </>
                  }
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route
                  path="*"
                  element={
                    <>
                      <RouteSeo route="notFound" />
                      <NotFound />
                    </>
                  }
                />
              </Routes>
            </AuthGate>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
