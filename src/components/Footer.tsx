import { Gamepad2, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Gamepad2 className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">OvalPlay</span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Your ultimate destination for online gaming entertainment.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#games" className="text-muted-foreground hover:text-foreground transition-colors">All Games</a></li>
              <li><a href="#trending" className="text-muted-foreground hover:text-foreground transition-colors">Trending</a></li>
              <li><a href="#categories" className="text-muted-foreground hover:text-foreground transition-colors">Categories</a></li>
              <li><a href="#subscription" className="text-muted-foreground hover:text-foreground transition-colors">Subscribe</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/help-center" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="/contact-us" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</a></li>
              <li><a href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
              <li><a href="/terms-conditions" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="/cookie-policy" className="text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</a></li>
              <li><a href="/terms-conditions" className="text-muted-foreground hover:text-foreground transition-colors">Terms & Conditions</a></li>
              <li><a href="/about-us" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 OvalPlay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
