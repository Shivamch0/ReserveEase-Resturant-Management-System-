import React, { useState } from "react";
import { useReservation } from "../../hooks/useReservation";
import ReservationForm from "../../components/reservation/ReservationForm";
import { Armchair, Clock, Info } from "lucide-react";
import { calculateEndTime } from "../../utils/helpers";

export const BookReservation = () => {
  const { tables, reservations, createReservation } = useReservation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("18:00");
  const [selectedGuests, setSelectedGuests] = useState(2);

  const handleFormChange = (values) => {
    setSelectedDate(values.date);
    setSelectedTime(values.time);
    setSelectedGuests(values.guests);
  };

  const handleBookingSubmit = async (formData) => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const endTime = calculateEndTime(formData.time);
      await createReservation({
        reservationDate: formData.date,
        startTime: formData.time,
        endTime,
        guests: formData.guests,
        notes: formData.notes
      });
      setSuccess("Reservation booked successfully!");
    } catch (err) {
      setError(err.message || "Failed to make reservation.");
    } finally {
      setLoading(false);
    }
  };

  const getTableBookingStatus = (tableId) => {
    if (!selectedDate) return "select-date";
    const endTime = calculateEndTime(selectedTime);
    const isBooked = reservations.some(res => {
      if (res.table !== tableId || res.reservationDate !== selectedDate || res.status !== "Booked") {
        return false;
      }
      return (selectedTime >= res.startTime && selectedTime < res.endTime) ||
             (endTime > res.startTime && endTime <= res.endTime) ||
             (selectedTime <= res.startTime && endTime >= res.endTime);
    });
    return isBooked ? "booked" : "available";
  };

  return (
    <div className="py-10 px-6 md:py-12 md:px-12 lg:px-24 flex flex-col space-y-10">
      <div className="flex flex-col space-y-2 text-left">
        <h2 className="text-3xl font-bold text-white tracking-tight">Book a Reservation</h2>
        <p className="text-sm text-silver">Pick a time slot, verify layouts, and lock your restaurant booking.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4">
          <ReservationForm
            onSubmit={handleBookingSubmit}
            loading={loading}
            error={error}
            success={success}
            onChange={handleFormChange}
          />
        </div>

        <div className="lg:col-span-8 flex flex-col space-y-6">
          <div className="glass p-6 rounded-2xl border border-white/5 text-left">
            <div className="flex items-center space-x-2.5 mb-6">
              <Armchair size={18} className="text-gold-light" />
              <h3 className="text-lg font-bold text-white">Interactive Table Availability Layout</h3>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-silver/70 text-xs flex items-center space-x-2 mb-6">
              <Clock size={14} />
              <span>Select configuration details in the booking scheduler to verify table slot availability.</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {tables.map((t) => {
                const status = getTableBookingStatus(t._id);
                const isMatchingCapacity = t.capacity >= selectedGuests;

                let cardStyle = "border-white/5 bg-white/5 text-silver";
                let statusBadge = "Available";

                if (!t.isActive) {
                  cardStyle = "border-red-500/25 bg-red-950/10 text-red-400 opacity-60";
                  statusBadge = "Out of Service";
                } else if (status === "booked") {
                  cardStyle = "border-red-500/20 bg-red-500/5 text-red-400";
                  statusBadge = "Occupied";
                } else if (!isMatchingCapacity) {
                  cardStyle = "border-white/5 bg-white/5 text-silver/40 opacity-50";
                  statusBadge = `Cap ${t.capacity}`;
                } else {
                  cardStyle = "border-emerald-500/30 bg-emerald-500/5 text-emerald-400 shadow-md shadow-emerald-500/5";
                  statusBadge = "Available";
                }

                return (
                  <div
                    key={t._id}
                    className={`border p-4 rounded-xl transition-all duration-300 flex flex-col justify-between items-start space-y-4 ${cardStyle}`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="text-xs font-bold font-mono tracking-wider uppercase">Table {t.tableNumber}</span>
                      <span className="text-[10px] font-semibold bg-white/5 border border-white/10 px-2 py-0.5 rounded-full capitalize">
                        {statusBadge}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${
                        status === "available" && isMatchingCapacity && t.isActive ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-silver"
                      }`}>
                        <Armchair size={20} />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-xs text-silver/60 leading-none">Capacity</span>
                        <span className="text-sm font-bold text-white font-mono mt-1">{t.capacity} Guests</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookReservation;
