import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useReservation } from "../../hooks/useReservation";
import { Calendar, User, Clock, UtensilsCrossed, ArrowRight } from "lucide-react";

export const Dashboard = () => {
  const { user } = useAuth();
  const { reservations } = useReservation();
  const navigate = useNavigate();

  const myReservations = reservations.filter((r) => r.customer === user?._id);
  const activeBookings = myReservations.filter((r) => r.status === "Booked").length;
  const completedBookings = myReservations.filter((r) => r.status === "Completed").length;

  return (
    <div className="py-10 px-6 md:py-12 md:px-12 lg:px-24 flex flex-col space-y-10">
      <div className="flex flex-col space-y-2 text-left">
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Welcome back, <span className="text-gold-light">{user?.userName}</span>
        </h2>
        <p className="text-sm text-silver">Browse dining options, schedule reservations, and view booking history.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => navigate("/customer/reservations", { state: { filter: "All" } })}
          className="glass p-5 rounded-2xl border border-white/5 flex items-center space-x-4 cursor-pointer hover:border-gold-light/20 transition-all"
        >
          <div className="p-3.5 rounded-xl bg-gold-light/10 text-gold-light">
            <Calendar size={20} />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-silver uppercase font-semibold">My Bookings</span>
            <span className="text-xl font-bold text-white font-mono mt-0.5">{myReservations.length}</span>
          </div>
        </div>

        <div
          onClick={() => navigate("/customer/reservations", { state: { filter: "Booked" } })}
          className="glass p-5 rounded-2xl border border-white/5 flex items-center space-x-4 cursor-pointer hover:border-gold-light/20 transition-all"
        >
          <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Clock size={20} />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-silver uppercase font-semibold">Active Bookings</span>
            <span className="text-xl font-bold text-white font-mono mt-0.5">{activeBookings}</span>
          </div>
        </div>

        <div
          onClick={() => navigate("/customer/reservations", { state: { filter: "Completed" } })}
          className="glass p-5 rounded-2xl border border-white/5 flex items-center space-x-4 cursor-pointer hover:border-gold-light/20 transition-all"
        >
          <div className="p-3.5 rounded-xl bg-blue-500/10 text-blue-400">
            <UtensilsCrossed size={20} />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-silver uppercase font-semibold">Completed Bookings</span>
            <span className="text-xl font-bold text-white font-mono mt-0.5">{completedBookings}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        <div className="glass-premium p-6 rounded-2xl border border-white/10 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-gold-light/10 border border-gold-light/20 flex items-center justify-center text-gold-light">
              <Calendar size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Book a Table</h3>
            <p className="text-silver text-xs leading-relaxed">
              Plan your dining layout, pick available time slots, choose guest size, and make instant secure table bookings.
            </p>
          </div>
          <Link
            to="/customer/book"
            className="w-full gold-gradient text-dark-bg font-bold py-3 rounded-xl transition-all transform hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center space-x-2 text-xs tracking-wider uppercase"
          >
            <span>Book Table</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="glass p-6 rounded-2xl border border-white/5 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-silver">
              <User size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">My Account Profile</h3>
            <p className="text-silver text-xs leading-relaxed">
              View your registered email details, username metadata, and manage personal notification settings.
            </p>
          </div>
          <Link
            to="/customer/profile"
            className="w-full glass hover:bg-white/10 text-white font-semibold py-3 rounded-xl border border-white/10 transition-colors flex items-center justify-center space-x-2 text-xs tracking-wide"
          >
            <span>View Profile</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
