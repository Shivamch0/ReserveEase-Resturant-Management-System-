import React from "react";

export const Button = ({
  children,
  type = "button",
  variant = "primary",
  onClick,
  disabled = false,
  loading = false,
  className = ""
}) => {
  const baseStyle = "font-bold rounded-xl transition-all transform active:scale-[0.98] flex items-center justify-center space-x-2 text-xs tracking-wider uppercase shadow-md disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "gold-gradient text-dark-bg hover:scale-[1.01] shadow-gold-dark/10",
    secondary: "glass hover:bg-white/10 text-white border border-white/10",
    danger: "border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10",
    cyan: "cyan-gradient text-dark-bg hover:scale-[1.01]"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
