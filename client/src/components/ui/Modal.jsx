import React from "react";
import { X } from "lucide-react";

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className = ""
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-dark-bg/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className={`relative w-full max-w-lg glass-premium p-6 rounded-3xl shadow-2xl z-10 border border-white/10 ${className}`}>
        <div className="flex justify-between items-center mb-5">
          {title && <h3 className="text-lg font-bold text-white tracking-wide">{title}</h3>}
          <button
            onClick={onClose}
            className="text-silver hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
          >
            <X size={18} />
          </button>
        </div>
        <div className="text-left">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
