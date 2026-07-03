import React from "react";
import { Calendar, Clock, XCircle } from "lucide-react";
import { formatDateString } from "../../utils/formatDate";

export const ReservationCard = ({ reservation, onCancel }) => {
  let badgeStyle = "bg-white/5 text-silver border-white/10";
  if (reservation.status === "Booked") {
    badgeStyle = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  } else if (reservation.status === "Cancelled") {
    badgeStyle = "bg-red-500/10 text-red-400 border-red-500/20";
  } else if (reservation.status === "Completed") {
    badgeStyle = "bg-blue-500/10 text-blue-400 border-blue-500/20";
  }

  return (
    <div className="border border-white/5 bg-white/5 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:bg-white/[0.08]">
      <div className="flex items-start space-x-4">
        <div className="p-3 rounded-xl bg-dark-bg border border-white/5 text-gold-light shrink-0">
          <Calendar size={20} />
        </div>
        <div className="flex flex-col space-y-1 text-left">
          <div className="flex items-center space-x-2.5">
            <span className="text-sm font-bold text-white font-mono">Table {reservation.tableNumber}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-silver font-mono">
              {reservation.guests} guests
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-silver/70">
            <span className="flex items-center space-x-1 font-mono">
              <Calendar size={12} />
              <span>{formatDateString(reservation.reservationDate)}</span>
            </span>
            <span className="flex items-center space-x-1 font-mono">
              <Clock size={12} />
              <span>{reservation.startTime} - {reservation.endTime}</span>
            </span>
          </div>
          {reservation.notes && (
            <span className="text-[10px] text-silver/60 italic block mt-1">
              Note: {reservation.notes}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-3 justify-end shrink-0">
        <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold tracking-wide font-mono ${badgeStyle}`}>
          {reservation.status}
        </span>
        {reservation.status === "Booked" && onCancel && (
          <button
            onClick={() => onCancel(reservation._id)}
            className="p-2 border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors rounded-lg"
            title="Cancel Booking"
          >
            <XCircle size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ReservationCard;
