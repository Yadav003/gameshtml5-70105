import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    id: 1,
    name: "Free",
    price: "$0",
    period: "/month",
    features: [
      "Access to 50+ free games",
      "Standard quality graphics",
      "Ads included",
      "Community support",
    ],
    highlighted: false,
  },
  {
    id: 2,
    name: "Premium",
    price: "$9.99",
    period: "/month",
    features: [
      "Access to 500+ premium games",
      "HD quality graphics",
      "Ad-free experience",
      "Priority support",
      "Early access to new games",
    ],
    highlighted: true,
  },
  {
    id: 3,
    name: "Ultimate",
    price: "$19.99",
    period: "/month",
    features: [
      "Access to all games",
      "4K quality graphics",
      "Ad-free experience",
      "24/7 VIP support",
      "Early access to new games",
      "Exclusive tournaments",
      "Monthly rewards",
    ],
    highlighted: false,
  },
];

export const SubscriptionPlans = () => {
  return (
    <section id="subscription" className="py-16 px-4 bg-card/50">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          CHOOSE YOUR PLAN
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Unlock premium features and get access to thousands of games
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative p-8 ${
                plan.highlighted
                  ? "border-primary border-2 shadow-lg shadow-primary/20"
                  : "border-border"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.highlighted ? "hero" : "outline"}
                className="w-full"
                size="lg"
              >
                {plan.price === "$0" ? "Get Started" : "Subscribe Now"}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
