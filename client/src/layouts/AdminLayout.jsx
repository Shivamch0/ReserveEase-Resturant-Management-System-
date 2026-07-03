import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Sidebar from "../components/common/Sidebar";
import { Menu, X, LogOut, UtensilsCrossed } from "lucide-react";

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-dark-bg text-silver flex flex-col font-sans">
      <header className="sticky top-0 z-50 glass border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center shrink-0">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-silver hover:text-white p-1 rounded-lg hover:bg-white/5"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <Link to="/" className="flex items-center space-x-2">
            <div className="gold-gradient p-2 rounded-lg text-dark-bg">
              <UtensilsCrossed size={18} className="stroke-[2.5]" />
            </div>
            <span className="font-bold text-lg tracking-wider text-white">
              Reserve<span className="text-gold-light">Ease</span>
              <span className="ml-2 text-[10px] uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-gold-light">
                Admin
              </span>
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-semibold text-white leading-none">{user?.userName}</span>
            <span className="text-[10px] text-silver mt-0.5 capitalize">{user?.role}</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-silver hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-white/5 border border-white/5"
            title="Sign Out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-[2px] md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
        <div className={`md:block shrink-0 ${sidebarOpen ? "block" : "hidden"} z-40`}>
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
