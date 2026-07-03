import React from "react";
import { Link } from "react-router-dom";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export const Unauthorized = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-dark-bg">
      <div className="max-w-md w-full glass-premium p-8 rounded-3xl text-center flex flex-col items-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/25 flex items-center justify-center text-red-400">
          <ShieldAlert size={32} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-tight">Access Denied</h2>
          <p className="text-sm text-silver/80">
            You do not have the required permissions to view this administrative page.
          </p>
        </div>
        <Link
          to="/"
          className="gold-gradient text-dark-bg font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-[1.02] flex items-center space-x-2 text-xs tracking-wider uppercase shadow-md shadow-gold-dark/10"
        >
          <ArrowLeft size={14} />
          <span>Back to Safety</span>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
