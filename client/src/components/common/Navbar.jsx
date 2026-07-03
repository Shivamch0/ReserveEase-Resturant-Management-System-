import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { UtensilsCrossed, LogOut, LayoutDashboard, Menu, X } from "lucide-react";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center shrink-0">
      <Link to="/" className="flex items-center space-x-2">
        <div className="gold-gradient p-2 rounded-lg text-dark-bg">
          <UtensilsCrossed size={22} className="stroke-[2.5]" />
        </div>
        <span className="font-bold text-xl tracking-wider text-white">
          Reserve<span className="text-gold-light">Ease</span>
        </span>
      </Link>

      <div className="hidden md:flex items-center space-x-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `transition-colors font-medium text-sm tracking-wide ${
              isActive ? "text-gold-light" : "text-silver hover:text-white"
            }`
          }
        >
          Home
        </NavLink>

        {user && (
          <NavLink
            to={user.role === "admin" ? "/admin" : "/customer"}
            className={({ isActive }) =>
              `transition-colors font-medium text-sm tracking-wide flex items-center space-x-1.5 ${
                isActive ? "text-gold-light" : "text-silver hover:text-white"
              }`
            }
          >
            <LayoutDashboard size={15} />
            <span>Dashboard</span>
          </NavLink>
        )}

        {user ? (
          <div className="flex items-center space-x-6 border-l border-white/10 pl-6">
            <Link to={user.role === "admin" ? "/admin" : "/customer/profile"} className="flex items-center space-x-2.5 hover:opacity-90">
              <div className="w-8 h-8 rounded-full bg-dark-card border border-gold-light/35 flex items-center justify-center text-gold-light text-sm font-bold">
                {user.userName.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold text-white leading-none">{user.userName}</span>
                <span className="text-[10px] text-silver capitalize leading-normal mt-0.5">
                  {user.role}
                </span>
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="text-silver hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-white/5 animate-none"
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="gold-gradient text-dark-bg font-semibold text-xs tracking-wider uppercase px-5 py-2.5 rounded-lg transition-all transform hover:scale-[1.03] active:scale-[0.98] shadow-md shadow-gold-dark/10"
          >
            Sign In
          </Link>
        )}
      </div>

      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden text-silver hover:text-white transition-colors"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 glass border-b border-white/10 py-6 px-8 flex flex-col space-y-4 md:hidden">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-left py-2 font-medium text-base text-silver hover:text-gold-light"
          >
            Home
          </Link>

          {user && (
            <Link
              to={user.role === "admin" ? "/admin" : "/customer"}
              onClick={() => setMobileMenuOpen(false)}
              className="text-left py-2 font-medium text-base text-silver hover:text-gold-light flex items-center space-x-2"
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>
          )}

          {user ? (
            <div className="pt-4 border-t border-white/5 flex flex-col space-y-4">
              <Link
                to={user.role === "admin" ? "/admin" : "/customer/profile"}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-3 text-left"
              >
                <div className="w-10 h-10 rounded-full bg-dark-card border border-gold-light/30 flex items-center justify-center text-gold-light text-base font-bold">
                  {user.userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{user.userName}</div>
                  <div className="text-silver text-xs capitalize">{user.role}</div>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left py-2 text-red-400 font-medium text-base flex items-center space-x-2"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full gold-gradient text-dark-bg font-bold py-3 rounded-lg text-center tracking-wider text-sm uppercase block"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
