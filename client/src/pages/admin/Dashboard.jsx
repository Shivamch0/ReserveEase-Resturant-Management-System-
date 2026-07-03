import React from "react";
import { Link } from "react-router-dom";
import { useReservation } from "../../hooks/useReservation";
import { Calendar, Armchair, FileText, Power, ArrowRight } from "lucide-react";

export const Dashboard = () => {
  const { tables, reservations } = useReservation();

  const activeReservations = reservations.filter(r => r.status === "Booked");
  const totalTables = tables.length;
  const activeTablesCount = tables.filter(t => t.isActive).length;

  return (
    <div className="flex flex-col space-y-10">
      <div className="flex flex-col space-y-2 text-left">
        <h2 className="text-3xl font-bold text-white tracking-tight">Admin Overview</h2>
        <p className="text-sm text-silver">Quick statistical snapshot of bookings and system configurations.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass p-5 rounded-2xl border border-white/5 flex items-center space-x-4">
          <div className="p-3.5 rounded-xl bg-gold-light/10 text-gold-light">
            <FileText size={20} />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-silver uppercase font-semibold">Total Reservations</span>
            <span className="text-xl font-bold text-white font-mono mt-0.5">{reservations.length}</span>
          </div>
        </div>

        <div className="glass p-5 rounded-2xl border border-white/5 flex items-center space-x-4">
          <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Calendar size={20} />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-silver uppercase font-semibold">Active Bookings</span>
            <span className="text-xl font-bold text-white font-mono mt-0.5">{activeReservations.length}</span>
          </div>
        </div>

        <div className="glass p-5 rounded-2xl border border-white/5 flex items-center space-x-4">
          <div className="p-3.5 rounded-xl bg-blue-500/10 text-blue-400">
            <Armchair size={20} />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-silver uppercase font-semibold">Total Tables</span>
            <span className="text-xl font-bold text-white font-mono mt-0.5">{totalTables}</span>
          </div>
        </div>

        <div className="glass p-5 rounded-2xl border border-white/5 flex items-center space-x-4">
          <div className="p-3.5 rounded-xl bg-primary-cyan/10 text-primary-cyan">
            <Power size={20} />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-silver uppercase font-semibold">Active Tables</span>
            <span className="text-xl font-bold text-white font-mono mt-0.5">{activeTablesCount}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        <div className="glass p-6 rounded-2xl border border-white/5 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-gold-light/10 border border-gold-light/20 flex items-center justify-center text-gold-light">
              <Calendar size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Manage Guest Bookings</h3>
            <p className="text-silver text-xs leading-relaxed">
              Browse the master timeline of customer reservations. Filter bookings by date/status, complete pending reservations, or view special request notes.
            </p>
          </div>
          <Link
            to="/admin/reservations"
            className="w-full gold-gradient text-dark-bg font-bold py-3 rounded-xl transition-all transform hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center space-x-2 text-xs tracking-wider uppercase"
          >
            <span>View Reservations</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="glass p-6 rounded-2xl border border-white/5 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-silver">
              <Armchair size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Tables Configuration</h3>
            <p className="text-silver text-xs leading-relaxed">
              Add new dining tables, modify guest capacity boundaries, toggle service status, and delete decommissioned seating setups.
            </p>
          </div>
          <Link
            to="/admin/tables"
            className="w-full glass hover:bg-white/10 text-white font-semibold py-3 rounded-xl border border-white/10 transition-colors flex items-center justify-center space-x-2 text-xs tracking-wide"
          >
            <span>Manage Seating</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
