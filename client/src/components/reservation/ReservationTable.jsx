import React from "react";
import { Calendar, Clock, Filter, Eye } from "lucide-react";
import Button from "../ui/Button";
import { formatDateString } from "../../utils/formatDate";

export const ReservationTable = ({ reservations, onStatusChange, onViewDetails }) => {
  if (reservations.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center space-y-3">
        <div className="p-3 bg-white/5 rounded-full text-silver/40">
          <Filter size={20} />
        </div>
        <span className="text-sm text-silver/50">No reservations found.</span>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2">
      {[...reservations].reverse().map((r) => {
        let badgeStyle = "bg-white/5 text-silver border-white/10";
        if (r.status === "Booked") {
          badgeStyle = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
        } else if (r.status === "Cancelled") {
          badgeStyle = "bg-red-500/10 text-red-400 border-red-500/20";
        } else if (r.status === "Completed") {
          badgeStyle = "bg-blue-500/10 text-blue-400 border-blue-500/20";
        }

        return (
          <div
            key={r._id}
            className="border border-white/5 bg-white/5 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:bg-white/[0.08]"
          >
            <div className="flex flex-col space-y-1.5 text-left">
              <div className="flex items-center space-x-2.5">
                <span className="text-sm font-bold text-white">{r.customerName}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-silver font-mono">
                  Table {r.tableNumber}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-silver font-mono">
                  {r.guests} guests
                </span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-silver/70 font-mono">
                <span className="flex items-center space-x-1">
                  <Calendar size={12} />
                  <span>{formatDateString(r.reservationDate)}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock size={12} />
                  <span>{r.startTime} - {r.endTime}</span>
                </span>
              </div>
              {r.notes && (
                <span className="text-[10px] text-silver/50 italic block mt-1">
                  Notes: {r.notes}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2.5 justify-end shrink-0">
              <span className={`text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full border font-mono ${badgeStyle}`}>
                {r.status}
              </span>
              
              {r.status === "Booked" && onStatusChange && (
                <div className="flex items-center space-x-1.5">
                  <Button
                    variant="cyan"
                    onClick={() => onStatusChange(r._id, "Completed")}
                    className="px-2.5 py-1 text-[10px] font-bold"
                  >
                    Complete
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => onStatusChange(r._id, "Cancelled")}
                    className="px-2.5 py-1 text-[10px] font-bold"
                  >
                    Cancel
                  </Button>
                </div>
              )}

              {onViewDetails && (
                <button
                  onClick={() => onViewDetails(r._id)}
                  className="p-1.5 border border-white/10 hover:border-gold-light/40 text-silver hover:text-gold-light transition-colors rounded-lg bg-white/5"
                  title="View Details"
                >
                  <Eye size={14} />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReservationTable;
