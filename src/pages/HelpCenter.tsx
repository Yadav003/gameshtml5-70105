import { Navigation } from "@/components/Navigation";
import { MobileFooterNav } from "@/components/MobileFooterNav";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle, Mail, Phone, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const HelpCenter = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16 pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-muted-foreground mb-8">Find answers to common questions and get support</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <MessageCircle className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Live Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Chat with our support team</p>
                <Button className="w-full">Start Chat</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Mail className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Email Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">support@playarena.com</p>
                <Button variant="outline" className="w-full">Send Email</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Phone className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Phone Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">+1 (555) 123-4567</p>
                <Button variant="outline" className="w-full">Call Now</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-6 h-6" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I create an account?</AccordionTrigger>
                  <AccordionContent>
                    Click on the Profile icon in the navigation menu and select "Sign Up". Fill in your details and verify your email address to complete the registration process.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I subscribe to a plan?</AccordionTrigger>
                  <AccordionContent>
                    Visit the subscription page from the home page, choose your preferred plan, and complete the payment process. Your subscription will be activated immediately.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I cancel my subscription anytime?</AccordionTrigger>
                  <AccordionContent>
                    Yes, you can cancel your subscription at any time from your profile settings. You'll continue to have access until the end of your billing period.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>How do I add games to my favourites?</AccordionTrigger>
                  <AccordionContent>
                    Click the heart icon on any game card to add it to your favourites. You can view all your favourite games in the Favourites page.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                  <AccordionContent>
                    We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and various local payment methods depending on your region.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default HelpCenter;
