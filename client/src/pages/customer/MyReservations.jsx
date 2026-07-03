import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useReservation } from "../../hooks/useReservation";
import ReservationCard from "../../components/reservation/ReservationCard";
import { Calendar } from "lucide-react";

export const MyReservations = () => {
  const { user } = useAuth();
  const { reservations, cancelReservation } = useReservation();
  const location = useLocation();

  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    if (location.state?.filter) {
      setStatusFilter(location.state.filter);
    }
  }, [location.state]);

  const myReservations = reservations.filter((r) => r.customer === user?._id);

  const filteredReservations = myReservations.filter((r) => {
    if (statusFilter === "All") return true;
    return r.status === statusFilter;
  });

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this reservation?")) {
      await cancelReservation(id);
    }
  };

  return (
    <div className="py-10 px-6 md:py-12 md:px-12 lg:px-24 flex flex-col space-y-8">
      <div className="flex flex-col space-y-2 text-left">
        <h2 className="text-3xl font-bold text-white tracking-tight">My Reservations</h2>
        <p className="text-sm text-silver">Track details, statuses, and history of your table reservations.</p>
      </div>

      <div className="flex space-x-2 border-b border-white/5 pb-4">
        {["All", "Booked", "Completed", "Cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all ${
              statusFilter === status
                ? "gold-gradient text-dark-bg"
                : "glass border border-white/5 text-silver hover:text-white"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="glass p-6 rounded-2xl border border-white/5 text-left max-w-4xl w-full">
        {filteredReservations.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center space-y-3">
            <div className="p-3 bg-white/5 rounded-full text-silver/40">
              <Calendar size={24} />
            </div>
            <span className="text-sm text-silver/50">No reservations found in this category.</span>
          </div>
        ) : (
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {[...filteredReservations].reverse().map((r) => (
              <ReservationCard
                key={r._id}
                reservation={r}
                onCancel={handleCancel}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReservations;
