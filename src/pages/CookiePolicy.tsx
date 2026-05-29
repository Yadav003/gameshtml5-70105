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
          <p className="text-muted-foreground mb-8">Last updated: May 28, 2026</p>
          
          <Card>
            <CardContent className="prose prose-sm max-w-none pt-6">
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">1. What Are Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  Cookies are small text files stored on your device when you visit a website. They help PlayArena remember your choices and understand how the site is used so we can keep it fast, reliable, and easy to navigate.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">2. How We Use Cookies</h2>
                <p className="text-muted-foreground mb-4">We use cookies for the following purposes:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Essential Cookies:</strong> Keep core features working (sign-in, security, sessions)</li>
                  <li><strong>Performance Cookies:</strong> Show us what is working well and what needs improvement</li>
                  <li><strong>Functionality Cookies:</strong> Remember preferences like theme or saved settings</li>
                  <li><strong>Targeting Cookies:</strong> Help deliver relevant ads or content where applicable</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">3. Types of Cookies We Use</h2>
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Essential Cookies</h3>
                  <p className="text-muted-foreground mb-2">
                    These cookies are required for the site to operate and cannot be disabled in our systems:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Sign-in state so you stay logged in</li>
                    <li>Security checks that help prevent abuse</li>
                    <li>Session cookies that keep pages working smoothly</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Analytics Cookies</h3>
                  <p className="text-muted-foreground mb-2">
                    These cookies help us measure performance and usage trends:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Anonymous usage statistics</li>
                    <li>Performance monitoring signals</li>
                    <li>Testing changes to improve the experience</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Functionality Cookies</h3>
                  <p className="text-muted-foreground mb-2">
                    These cookies remember settings and improve personalization:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Theme or display preferences</li>
                    <li>Saved favorites and recent activity</li>
                    <li>Basic UI choices such as layout settings</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">4. Third-Party Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  Some cookies may come from trusted partners that help run PlayArena:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Payment services that secure transactions</li>
                  <li>Analytics providers that measure performance</li>
                  <li>Social tools if you choose to share content</li>
                  <li>Advertising partners that support relevant ads</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">5. Managing Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  You can control and manage cookies in several ways:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Browser settings: Most browsers let you block or delete cookies</li>
                  <li>Device settings: Some devices provide additional privacy controls</li>
                  <li>Third-party opt-outs: Providers may offer their own preference tools</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Disabling cookies may reduce functionality or limit parts of the experience.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">6. Cookie Duration</h2>
                <p className="text-muted-foreground mb-4">
                  We use both session cookies (deleted when you close your browser) and persistent cookies (remain on your device for a set period):
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Session cookies:</strong> Removed when your browser closes</li>
                  <li><strong>Short-term cookies:</strong> Last from a few hours to a few days</li>
                  <li><strong>Long-term cookies:</strong> May remain for up to 12 months</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">7. Updates to This Policy</h2>
                <p className="text-muted-foreground mb-4">
                  We may update this policy to reflect changes in technology, legal requirements, or how PlayArena operates. The "Last updated" date shows the latest revision.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>
                <p className="text-muted-foreground mb-4">
                  If you have questions about cookies on PlayArena, contact us:
                </p>
                <p className="text-muted-foreground">
                  Email: privacy@playarena.com<br />
                  {/* Address: 123 Gaming Street, San Francisco, CA 94102 */}
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
