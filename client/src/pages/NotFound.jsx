import React from "react";
import { Link } from "react-router-dom";
import { HelpCircle, ArrowLeft } from "lucide-react";

export const NotFound = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-dark-bg">
      <div className="max-w-md w-full glass p-8 rounded-3xl text-center flex flex-col items-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold-light">
          <HelpCircle size={32} />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">404</h2>
          <h3 className="text-lg font-bold text-white/95">Page Not Found</h3>
          <p className="text-sm text-silver/70">
            The page you are looking for does not exist or has been relocated.
          </p>
        </div>
        <Link
          to="/"
          className="glass hover:bg-white/10 text-white font-semibold py-3 px-6 rounded-xl border border-white/10 transition-colors text-xs tracking-wider uppercase flex items-center space-x-2"
        >
          <ArrowLeft size={14} />
          <span>Go Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
