import { Navigation } from "@/components/Navigation";
import { MobileFooterNav } from "@/components/MobileFooterNav";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16 pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: May 28, 2026</p>
          
          <Card>
            <CardContent className="prose prose-sm max-w-none pt-6">
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground mb-4">
                  PlayArena respects your privacy and aims to be clear about how data is handled. This policy explains what we collect, why we collect it, and the choices you have when using the platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
                <p className="text-muted-foreground mb-4">We collect the following types of information:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Account Details:</strong> Name, email, and sign-in credentials</li>
                  <li><strong>Usage Data:</strong> Games played, favorites, and basic activity history</li>
                  <li><strong>Device Data:</strong> IP address, browser type, device info, and cookies</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">We use your information to:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Run the site, keep sessions secure, and deliver gameplay</li>
                  <li>Manage subscriptions and account access</li>
                  <li>Personalize recommendations and saved lists</li>
                  <li>Share updates you opt in to receive</li>
                  <li>Improve performance and develop new features</li>
                  <li>Detect abuse and protect the community</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">4. Data Sharing and Disclosure</h2>
                <p className="text-muted-foreground mb-4">
                  We do not sell your personal data. We may share limited data with:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Hosting and infrastructure providers</li>
                  <li>Analytics partners that help us improve PlayArena</li>
                  <li>Authorities when required by law</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
                <p className="text-muted-foreground mb-4">
                  We use appropriate safeguards such as encryption, access controls, and secure infrastructure. No system is 100% secure, but we work to protect your information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
                <p className="text-muted-foreground mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Access the data we hold about you</li>
                  <li>Request corrections to inaccurate information</li>
                  <li>Request deletion where applicable</li>
                  <li>Object to certain processing activities</li>
                  <li>Request a copy of your data</li>
                  <li>Withdraw consent when processing depends on it</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">7. Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  We use cookies to keep you signed in, analyze usage, and personalize the experience. You can control cookies through browser settings.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">8. Changes to This Policy</h2>
                <p className="text-muted-foreground mb-4">
                  We may update this policy as PlayArena evolves. Changes are posted here and the "Last updated" date is refreshed.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
                <p className="text-muted-foreground mb-4">
                  If you have questions about this policy, contact us:
                </p>
                <p className="text-muted-foreground">
                  Email: playarena.support@gmail.com<br />
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

export default PrivacyPolicy;
