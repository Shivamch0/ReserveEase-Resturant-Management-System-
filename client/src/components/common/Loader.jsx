import React from "react";

export const Loader = ({ fullScreen = false }) => {
  const containerStyle = fullScreen
    ? "fixed inset-0 z-50 bg-dark-bg/85 flex items-center justify-center backdrop-blur-md"
    : "w-full py-12 flex items-center justify-center";

  return (
    <div className={containerStyle}>
      <div className="flex flex-col items-center space-y-4">
        <div className="w-10 h-10 border-2 border-gold-light border-t-transparent rounded-full animate-spin"></div>
        {fullScreen && (
          <span className="text-xs text-gold-light font-bold tracking-widest uppercase animate-pulse">
            Loading ReserveEase
          </span>
        )}
      </div>
    </div>
  );
};

export default Loader;
