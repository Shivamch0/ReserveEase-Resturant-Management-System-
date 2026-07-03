import React from "react";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";

export const Alert = ({
  type = "error",
  message,
  className = ""
}) => {
  if (!message) return null;

  const styles = {
    error: "bg-red-500/10 border-red-500/20 text-red-400",
    success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    info: "bg-blue-500/10 border-blue-500/20 text-blue-400"
  };

  const Icons = {
    error: AlertCircle,
    success: CheckCircle2,
    info: Info
  };

  const IconComponent = Icons[type];

  return (
    <div className={`p-4 rounded-xl border text-xs flex items-center space-x-2.5 ${styles[type]} ${className}`}>
      {IconComponent && <IconComponent size={16} className="shrink-0" />}
      <span>{message}</span>
    </div>
  );
};

export default Alert;
