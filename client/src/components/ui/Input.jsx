import React from "react";

export const Input = ({
  label,
  type = "text",
  required = false,
  value,
  onChange,
  placeholder = "",
  icon: Icon,
  className = "",
  ...props
}) => {
  return (
    <div className={`flex flex-col space-y-1.5 text-left w-full ${className}`}>
      {label && <label className="text-xs text-silver font-medium ml-1">{label}</label>}
      <div className="relative">
        {Icon && (
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-silver/60">
            <Icon size={16} />
          </span>
        )}
        <input
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onClick={(e) => {
            if (type === "date" && typeof e.target.showPicker === "function") {
              e.target.showPicker();
            }
          }}
          className={`w-full bg-dark-bg border border-white/10 rounded-xl py-2.5 text-white text-xs outline-none focus:border-gold-light/50 focus:ring-1 focus:ring-gold-light/30 transition-all font-sans ${
            Icon ? "pl-10 pr-4" : "px-3.5"
          }`}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
