import { Navigation } from "@/components/Navigation";
import { MobileFooterNav } from "@/components/MobileFooterNav";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16 pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 1, 2025</p>
          
          <Card>
            <CardContent className="prose prose-sm max-w-none pt-6">
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">1. What Are Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">2. How We Use Cookies</h2>
                <p className="text-muted-foreground mb-4">We use cookies for the following purposes:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Essential Cookies:</strong> Required for the website to function properly (login, security)</li>
                  <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website</li>
                  <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
                  <li><strong>Targeting Cookies:</strong> Deliver relevant advertisements and content</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">3. Types of Cookies We Use</h2>
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Essential Cookies</h3>
                  <p className="text-muted-foreground mb-2">
                    These cookies are necessary for the website to function and cannot be switched off:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Authentication cookies to keep you logged in</li>
                    <li>Security cookies to prevent fraud</li>
                    <li>Session cookies for basic functionality</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Analytics Cookies</h3>
                  <p className="text-muted-foreground mb-2">
                    Help us understand how visitors use our website:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Google Analytics for usage statistics</li>
                    <li>Performance monitoring cookies</li>
                    <li>A/B testing cookies</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Functionality Cookies</h3>
                  <p className="text-muted-foreground mb-2">
                    Remember your preferences and personalize your experience:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Language preferences</li>
                    <li>Game favorites and history</li>
                    <li>Display settings and preferences</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">4. Third-Party Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  We may also use third-party cookies from our partners and service providers:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Payment processors for secure transactions</li>
                  <li>Analytics providers to measure performance</li>
                  <li>Social media platforms for sharing features</li>
                  <li>Advertising networks for relevant ads</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">5. Managing Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  You can control and manage cookies in several ways:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Browser settings: Most browsers allow you to refuse or delete cookies</li>
                  <li>Cookie preferences: Use our cookie consent tool to manage your preferences</li>
                  <li>Opt-out links: Third-party services may provide opt-out mechanisms</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Please note that disabling certain cookies may affect your experience on our website and limit some functionality.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">6. Cookie Duration</h2>
                <p className="text-muted-foreground mb-4">
                  We use both session cookies (deleted when you close your browser) and persistent cookies (remain on your device for a set period):
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Session cookies:</strong> Expire when you close your browser</li>
                  <li><strong>Short-term cookies:</strong> Expire after a few hours or days</li>
                  <li><strong>Long-term cookies:</strong> May remain for up to 1 year</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">7. Updates to This Policy</h2>
                <p className="text-muted-foreground mb-4">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons. The "Last updated" date at the top indicates when this policy was last revised.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>
                <p className="text-muted-foreground mb-4">
                  If you have questions about our use of cookies, please contact us at:
                </p>
                <p className="text-muted-foreground">
                  Email: privacy@playverse.com<br />
                  Address: 123 Gaming Street, San Francisco, CA 94102
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default CookiePolicy;
