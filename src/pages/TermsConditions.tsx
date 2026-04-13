import { Navigation } from "@/components/Navigation";
import { MobileFooterNav } from "@/components/MobileFooterNav";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const TermsConditions = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16 pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 1, 2025</p>
          
          <Card>
            <CardContent className="prose prose-sm max-w-none pt-6">
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
                <p className="text-muted-foreground mb-4">
                  By accessing and using PlayVerse, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">2. User Accounts</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>You must be at least 13 years old to create an account</li>
                  <li>You are responsible for maintaining the security of your account</li>
                  <li>You must provide accurate and complete information</li>
                  <li>One person or entity may not maintain more than one account</li>
                  <li>You are responsible for all activities that occur under your account</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">3. Subscription Services</h2>
                <p className="text-muted-foreground mb-4">
                  PlayVerse offers various subscription plans with different features and pricing:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Subscriptions automatically renew unless cancelled</li>
                  <li>You can cancel your subscription at any time</li>
                  <li>Refunds are available within 7 days of purchase</li>
                  <li>Prices are subject to change with 30 days notice</li>
                  <li>Payment information must be kept current and accurate</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">4. Acceptable Use</h2>
                <p className="text-muted-foreground mb-4">You agree not to:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Use the service for any illegal purposes</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Share your account credentials with others</li>
                  <li>Use automated systems to access the service</li>
                  <li>Reverse engineer or copy any games or content</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Upload malicious code or viruses</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">5. Intellectual Property</h2>
                <p className="text-muted-foreground mb-4">
                  All content on PlayVerse, including games, graphics, logos, and text, is owned by PlayVerse or its licensors. You may not reproduce, distribute, or create derivative works without express written permission.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">6. User Content</h2>
                <p className="text-muted-foreground mb-4">
                  If you submit content to PlayVerse (reviews, comments, etc.), you grant us a worldwide, non-exclusive license to use, reproduce, and display that content.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">7. Termination</h2>
                <p className="text-muted-foreground mb-4">
                  We reserve the right to suspend or terminate your account if you violate these terms. Upon termination, your right to use the service will immediately cease.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">8. Disclaimer of Warranties</h2>
                <p className="text-muted-foreground mb-4">
                  The service is provided "as is" without warranties of any kind. We do not guarantee uninterrupted access or error-free operation.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
                <p className="text-muted-foreground mb-4">
                  PlayVerse shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">10. Changes to Terms</h2>
                <p className="text-muted-foreground mb-4">
                  We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">11. Contact Information</h2>
                <p className="text-muted-foreground mb-4">
                  For questions about these Terms and Conditions, contact us at:
                </p>
                <p className="text-muted-foreground">
                  Email: legal@playverse.com<br />
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

export default TermsConditions;
