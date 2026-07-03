import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useReservation } from "../../hooks/useReservation";
import Button from "../../components/ui/Button";
import { Calendar, Clock, User, Armchair, ChevronLeft, Check, AlertCircle } from "lucide-react";
import { formatDateString } from "../../utils/formatDate";

export const ReservationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { reservations, updateReservationStatus } = useReservation();

  const reservation = reservations.find((r) => r._id === id);

  if (!reservation) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <div className="p-3 bg-red-500/10 border border-red-500/25 text-red-400 rounded-full">
          <AlertCircle size={28} />
        </div>
        <h3 className="text-lg font-bold text-white">Booking Not Found</h3>
        <Link to="/admin/reservations" className="text-xs text-gold-light hover:underline">
          Return to list
        </Link>
      </div>
    );
  }

  const handleStatusChange = async (status) => {
    await updateReservationStatus(reservation._id, status);
  };

  let badgeStyle = "bg-white/5 text-silver border-white/10";
  if (reservation.status === "Booked") {
    badgeStyle = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  } else if (reservation.status === "Cancelled") {
    badgeStyle = "bg-red-500/10 text-red-400 border-red-500/20";
  } else if (reservation.status === "Completed") {
    badgeStyle = "bg-blue-500/10 text-blue-400 border-blue-500/20";
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col space-y-6 text-left">
      <button
        onClick={() => navigate("/admin/reservations")}
        className="flex items-center space-x-1.5 text-xs text-silver/70 hover:text-white transition-colors"
      >
        <ChevronLeft size={14} />
        <span>Back to List</span>
      </button>

      <div className="glass-premium p-8 rounded-3xl border border-white/10 shadow-2xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-gold-light/10 border border-gold-light/20 flex items-center justify-center text-gold-light shrink-0">
              <Calendar size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Reservation Details</h2>
              <span className="text-[10px] text-silver font-mono uppercase mt-0.5 block tracking-wider">
                ID: {reservation._id}
              </span>
            </div>
          </div>
          <span className={`text-xs px-3.5 py-1.5 rounded-full border font-bold uppercase tracking-wider font-mono self-start sm:self-center ${badgeStyle}`}>
            {reservation.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-white/5 text-silver border border-white/5 shrink-0">
              <User size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-silver/60 uppercase font-semibold">Customer</span>
              <span className="text-sm font-bold text-white mt-0.5">{reservation.customerName}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-white/5 text-silver border border-white/5 shrink-0">
              <Armchair size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-silver/60 uppercase font-semibold">Assigned Seating</span>
              <span className="text-sm font-bold text-white mt-0.5">
                Table {reservation.tableNumber} ({reservation.guests} Guests)
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-white/5 text-silver border border-white/5 shrink-0">
              <Calendar size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-silver/60 uppercase font-semibold">Booking Date</span>
              <span className="text-sm font-bold text-white mt-0.5">
                {formatDateString(reservation.reservationDate)}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-white/5 text-silver border border-white/5 shrink-0">
              <Clock size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-silver/60 uppercase font-semibold">Time Slot</span>
              <span className="text-sm font-bold text-white font-mono mt-0.5">
                {reservation.startTime} - {reservation.endTime}
              </span>
            </div>
          </div>
        </div>

        {reservation.notes && (
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[10px] text-silver/60 uppercase font-semibold block mb-1">
              Customer Special Requests
            </span>
            <p className="text-xs text-white leading-relaxed italic">
              "{reservation.notes}"
            </p>
          </div>
        )}

        {reservation.status === "Booked" && (
          <div className="flex items-center gap-3 pt-6 border-t border-white/5">
            <Button
              variant="cyan"
              onClick={() => handleStatusChange("Completed")}
              className="flex-1 py-3"
            >
              <Check size={16} />
              <span>Mark Completed</span>
            </Button>
            <Button
              variant="danger"
              onClick={() => handleStatusChange("Cancelled")}
              className="flex-1 py-3"
            >
              <XCircle size={16} />
              <span>Cancel Booking</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationDetails;
