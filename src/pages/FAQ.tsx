import { Navigation } from "@/components/Navigation";
import { MobileFooterNav } from "@/components/MobileFooterNav";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FAQ = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16 pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground mb-8">Find answers to common questions about PlayArena</p>
          
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <Card>
                <CardContent className="pt-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>What is PlayArena?</AccordionTrigger>
                      <AccordionContent>
                        PlayArena is a premium online gaming platform offering unlimited access to hundreds of games across various categories including action, sports, racing, and more.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>What devices are supported?</AccordionTrigger>
                      <AccordionContent>
                        PlayArena works on all modern web browsers including Chrome, Firefox, Safari, and Edge. Our platform is fully responsive and works on desktops, tablets, and mobile devices.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Do I need to download any software?</AccordionTrigger>
                      <AccordionContent>
                        No downloads required! All games are played directly in your browser. Simply create an account and start playing instantly.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account">
              <Card>
                <CardContent className="pt-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>How do I create an account?</AccordionTrigger>
                      <AccordionContent>
                        Click on the Profile icon in the navigation menu, select "Sign Up", and fill in your details. You'll receive a verification email to complete your registration.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>I forgot my password. What should I do?</AccordionTrigger>
                      <AccordionContent>
                        Click on "Forgot Password" on the login page. Enter your email address and we'll send you instructions to reset your password.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Can I change my email address?</AccordionTrigger>
                      <AccordionContent>
                        Yes, you can update your email address in your profile settings. You'll need to verify your new email address.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>How do I delete my account?</AccordionTrigger>
                      <AccordionContent>
                        Go to Profile Settings and scroll to the bottom to find the "Delete Account" option. Please note this action is permanent and cannot be undone.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subscription">
              <Card>
                <CardContent className="pt-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>What subscription plans are available?</AccordionTrigger>
                      <AccordionContent>
                        We offer three plans: Free (limited access), Premium ($9.99/month), and Ultimate ($19.99/month) with unlimited access and exclusive features.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Can I change my subscription plan?</AccordionTrigger>
                      <AccordionContent>
                        Yes, you can upgrade or downgrade your plan at any time from your profile settings. Changes take effect immediately for upgrades, or at the next billing cycle for downgrades.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>How do I cancel my subscription?</AccordionTrigger>
                      <AccordionContent>
                        Navigate to your Profile settings, find the subscription section, and click "Cancel Subscription". You'll retain access until the end of your billing period.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
                      <AccordionContent>
                        We offer a 7-day money-back guarantee for new subscriptions. Contact our support team if you're not satisfied with your purchase.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="technical">
              <Card>
                <CardContent className="pt-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Games won't load. What should I do?</AccordionTrigger>
                      <AccordionContent>
                        Try clearing your browser cache and cookies, ensure you have a stable internet connection, and check if your browser is up to date. If issues persist, contact support.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Why is my game lagging?</AccordionTrigger>
                      <AccordionContent>
                        Game performance depends on your internet speed and device specifications. Try closing other browser tabs, ensuring a stable connection, or lowering game quality settings if available.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>How do I report a bug?</AccordionTrigger>
                      <AccordionContent>
                        Use the "Contact Us" page to report bugs. Please include details about the issue, your device, browser, and steps to reproduce the problem.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default FAQ;
