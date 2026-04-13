import { Gamepad2, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Gamepad2 className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">PlayVerse</span>
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
              <li><Link to="/games" onClick={scrollToTop} className="text-muted-foreground hover:text-foreground transition-colors">All Games</Link></li>
              <li><Link to="/#trending" className="text-muted-foreground hover:text-foreground transition-colors">Trending</Link></li>
              <li><Link to="/#categories" className="text-muted-foreground hover:text-foreground transition-colors">Categories</Link></li>
              <li><Link to="/favourites" onClick={scrollToTop} className="text-muted-foreground hover:text-foreground transition-colors">Favourites</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/help-center" onClick={scrollToTop} className="text-muted-foreground hover:text-foreground transition-colors">Help Center</Link></li>
              <li><Link to="/contact-us" onClick={scrollToTop} className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" onClick={scrollToTop} className="text-muted-foreground hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link to="/terms-conditions" onClick={scrollToTop} className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy-policy" onClick={scrollToTop} className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/cookie-policy" onClick={scrollToTop} className="text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</Link></li>
              <li><Link to="/terms-conditions" onClick={scrollToTop} className="text-muted-foreground hover:text-foreground transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/about-us" onClick={scrollToTop} className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 PlayVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
