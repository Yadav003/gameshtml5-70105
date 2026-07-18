import { Gamepad2, Facebook, Twitter, Instagram, Youtube} from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
const QuoraIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    viewBox="100 90 440 460" /* Tightened viewBox to remove empty padding */
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M536.7 450.7L507.4 450.7C505.9 464.2 496.9 481.5 474.4 481.5C453.9 481.5 439.1 467.3 424.9 445.7C469.1 411.5 499.6 358.2 499.6 292.7C499.7 175.2 403 96 301.2 96C201.5 96 103.5 175.7 103.5 292.7C103.5 426.8 234.8 514.3 352.5 481.7C372.2 515.3 398.2 544 447.7 544C529.5 544 538.5 468.7 536.7 450.7zM393.2 393.2C373.7 364 349.5 341 301.7 341C271.2 341 247.4 351 232.7 363.8L244.9 388.1C251.1 385.1 257.9 384.1 264.7 384.1C300.2 384.1 318.4 414.9 333.9 445.4C323.9 448.4 313.2 449.6 301.2 449.6C226.2 449.6 193.7 396.6 193.7 292.9C193.7 188.5 226.2 135 301.2 135C377.4 135 409.9 188.5 409.9 292.7C410 334.5 404.5 368.3 393.2 393.2z" />
  </svg>
); 

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Gamepad2 className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">PlayArena</span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Your ultimate destination for online gaming entertainment.
            </p>
            <div className="flex gap-4">
              {/* <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a> */}
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.quora.com/profile/Playarena" target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
              <QuoraIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/official_playarena/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@Playarena-web"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/games"
                  onClick={scrollToTop}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  All Games
                </Link>
              </li>
              <li>
                <Link
                  to="/#trending"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Trending
                </Link>
              </li>
              <li>
                <Link
                  to="/#categories"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/favourites"
                  onClick={scrollToTop}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Favourites
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/help-center"
                  onClick={scrollToTop}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  onClick={scrollToTop}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  onClick={scrollToTop}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  FAQ
                </Link>
              </li>
              {/* <li><Link to="/terms-conditions" onClick={scrollToTop} className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li> */}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/privacy-policy"
                  onClick={scrollToTop}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/cookie-policy"
                  onClick={scrollToTop}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-conditions"
                  onClick={scrollToTop}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  onClick={scrollToTop}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2021 - 2026 PlayArena. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
