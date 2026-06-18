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
          <p className="text-muted-foreground mb-8">Last updated: May 28, 2026</p>
          
          <Card>
            <CardContent className="prose prose-sm max-w-none pt-6">
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
                <p className="text-muted-foreground mb-4">
                  By visiting or using PlayArena, you agree to these Terms and Conditions. If you do not accept them, please stop using the service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">2. User Accounts</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>You must be at least 12 years old, or the minimum digital consent age in your region</li>
                  <li>Keep your login details secure and do not share them</li>
                  <li>Provide current, accurate registration information</li>
                  <li>One account per person unless we approve otherwise</li>
                  <li>You are responsible for activity that happens under your account</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">3. Subscription Services</h2>
                <p className="text-muted-foreground mb-4">
                  PlayArena offers optional plans with different features and pricing:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Plans renew automatically unless you cancel before the next billing date</li>
                  <li>Cancellation stops future renewals and access ends at the period finish</li>
                  <li>Refunds may be available within 7 days of purchase, where applicable</li>
                  <li>We will notify you in advance if prices change</li>
                  <li>Keep billing details accurate to avoid service interruptions</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">4. Acceptable Use</h2>
                <p className="text-muted-foreground mb-4">You agree not to:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Break laws or use the service for unlawful activity</li>
                  <li>Probe, scan, or access systems without permission</li>
                  <li>Use bots, scrapers, or automated access that harms performance</li>
                  <li>Copy, modify, or redistribute games or content without permission</li>
                  <li>Harass, threaten, or target other players</li>
                  <li>Upload malware, spam, or disruptive code</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">5. Intellectual Property</h2>
                <p className="text-muted-foreground mb-4">
                  PlayArena and its licensors own the platform, branding, and content you see. You may not reproduce, distribute, or create derivative works without written permission.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">6. User Content</h2>
                <p className="text-muted-foreground mb-4">
                  If you submit content (reviews, comments, feedback), you grant PlayArena a worldwide, non-exclusive license to host, display, and use it to operate and improve the service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">7. Termination</h2>
                <p className="text-muted-foreground mb-4">
                  We may suspend or terminate access if you violate these terms or cause harm to the service or community. Access ends immediately on termination.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">8. Disclaimer of Warranties</h2>
                <p className="text-muted-foreground mb-4">
                  The service is provided "as is" without warranties. We do not guarantee uninterrupted access or that every game will be error-free at all times.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
                <p className="text-muted-foreground mb-4">
                  To the fullest extent permitted by law, PlayArena is not liable for indirect, incidental, or consequential damages related to your use of the service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">10. Changes to Terms</h2>
                <p className="text-muted-foreground mb-4">
                  We may update these terms from time to time. Continued use of PlayArena after updates means you accept the revised terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">11. Contact Information</h2>
                <p className="text-muted-foreground mb-4">
                  For questions about these Terms and Conditions, contact us:
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

export default TermsConditions;
