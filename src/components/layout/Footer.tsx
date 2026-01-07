import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-foreground flex items-center justify-center">
                <span className="text-primary font-heading font-bold text-xl">C</span>
              </div>
              <span className="font-heading text-xl font-semibold">ColorCraft</span>
            </div>
            <p className="font-body text-sm text-primary-foreground/80 leading-relaxed">
              Premium paints for modern Indian homes. Crafted with care, designed to last, and made to inspire.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["About Us", "Our Products", "Color Catalog", "Find a Dealer"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="font-body text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Products</h4>
            <ul className="space-y-3">
              {["Interior Paints", "Exterior Paints", "Waterproofing", "Wood Finishes"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="font-body text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm text-primary-foreground/80">
                  123 Paint Street, Mumbai, Maharashtra 400001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="flex-shrink-0" />
                <a
                  href="tel:+911234567890"
                  className="font-body text-sm text-primary-foreground/80 hover:text-primary-foreground"
                >
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="flex-shrink-0" />
                <a
                  href="mailto:info@colorcraft.com"
                  className="font-body text-sm text-primary-foreground/80 hover:text-primary-foreground"
                >
                  info@colorcraft.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm text-primary-foreground/70">
            © {new Date().getFullYear()} ColorCraft Paints. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground">
              Privacy Policy
            </a>
            <a href="#" className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
