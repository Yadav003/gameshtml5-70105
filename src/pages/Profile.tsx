import { Navigation } from "@/components/Navigation";
import { MobileFooterNav } from "@/components/MobileFooterNav";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Calendar, Crown } from "lucide-react";

const Profile = () => {
  // Mock profile data - in a real app, this would come from authentication
  const userProfile = {
    name: "Gaming Pro",
    email: "gamer@playarena.com",
    memberSince: "January 2024",
    subscription: {
      plan: "Premium",
      status: "Active",
      nextBilling: "December 15, 2024",
      price: "$9.99/month",
    },
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16 pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">My Profile</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Info Card */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Profile Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                      {userProfile.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">{userProfile.name}</h2>
                    <Badge variant="secondary" className="mt-2">
                      <Crown className="w-3 h-3 mr-1" />
                      {userProfile.subscription.plan} Member
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{userProfile.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Member Since</p>
                      <p className="font-medium">{userProfile.memberSince}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Username</p>
                      <p className="font-medium">{userProfile.name}</p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Subscription Card */}
            <Card>
              <CardHeader>
                <CardTitle>Active Subscription</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                  <Crown className="w-12 h-12 mx-auto mb-3 text-primary" />
                  <h3 className="text-2xl font-bold mb-2">{userProfile.subscription.plan}</h3>
                  <Badge variant="default" className="mb-4">
                    {userProfile.subscription.status}
                  </Badge>
                  <p className="text-3xl font-bold text-primary">
                    {userProfile.subscription.price}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Next Billing Date</span>
                    <span className="font-medium">{userProfile.subscription.nextBilling}</span>
                  </div>
                  
                  <div className="space-y-2 pt-4 border-t">
                    <h4 className="font-semibold mb-3">Premium Benefits:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="text-primary">✓</span>
                        Unlimited game access
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">✓</span>
                        Ad-free experience
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">✓</span>
                        Early access to new games
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">✓</span>
                        Priority support
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    Change Plan
                  </Button>
                  <Button variant="ghost" className="w-full text-muted-foreground">
                    Cancel Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default Profile;
