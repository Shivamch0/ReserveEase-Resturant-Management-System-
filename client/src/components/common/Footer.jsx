import React from "react";
import { UtensilsCrossed } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="glass border-t border-white/5 py-8 px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0 text-xs">
      <div className="flex items-center space-x-2">
        <div className="gold-gradient p-1.5 rounded-lg text-dark-bg">
          <UtensilsCrossed size={14} />
        </div>
        <span className="font-semibold text-white tracking-wider">
          Reserve<span className="text-gold-light">Ease</span>
        </span>
        <span className="text-silver/50">| &copy; {new Date().getFullYear()} Shivam</span>
      </div>

      <div className="flex items-center space-x-6 text-silver/60">
        <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
        <a href="#contact" className="hover:text-white transition-colors">Contact Support</a>
      </div>
    </footer>
  );
};

export default Footer;
