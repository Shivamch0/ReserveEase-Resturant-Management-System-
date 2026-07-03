import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Calendar, Armchair } from "lucide-react";

export const Sidebar = ({ onClose }) => {
  const links = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/admin/reservations", label: "Reservations", icon: Calendar },
    { to: "/admin/tables", label: "Tables Layout", icon: Armchair }
  ];

  return (
    <aside className="w-64 h-full glass border-r border-white/5 py-8 px-4 flex flex-col justify-between absolute md:relative z-40 bg-dark-bg md:bg-transparent">
      <div className="flex flex-col space-y-6 text-left">
        <span className="text-[10px] text-silver/40 uppercase tracking-widest font-semibold px-4">
          Management
        </span>
        <nav className="flex flex-col space-y-1.5">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center space-x-3.5 px-4 py-3 rounded-xl transition-all text-sm font-semibold tracking-wide ${
                    isActive
                      ? "gold-gradient text-dark-bg shadow-md shadow-gold-dark/10"
                      : "text-silver hover:text-white hover:bg-white/5"
                  }`
                }
              >
                <Icon size={16} />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
