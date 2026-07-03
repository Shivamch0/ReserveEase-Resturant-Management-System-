import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Alert from "../ui/Alert";
import { TIME_SLOTS } from "../../utils/constants";
import { getTodayDateString } from "../../utils/formatDate";
import { Calendar } from "lucide-react";

export const ReservationForm = ({ onSubmit, loading, error, success }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("18:00");
  const [guests, setGuests] = useState(2);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date) return;
    onSubmit({
      date,
      time,
      guests: Number(guests),
      notes
    });
    setNotes("");
  };

  return (
    <div className="glass p-6 rounded-2xl border border-white/5 shadow-xl text-left">
      <h3 className="text-lg font-bold text-white mb-5 flex items-center space-x-2">
        <Calendar size={18} className="text-gold-light" />
        <span>Reserve a Table</span>
      </h3>

      <Alert type="error" message={error} className="mb-4" />
      <Alert type="success" message={success} className="mb-4" />

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Select Date"
          type="date"
          required
          value={date}
          min={getTodayDateString()}
          onChange={(e) => setDate(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1.5 text-left">
            <label className="text-xs text-silver font-medium ml-1">Start Time</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-dark-bg border border-white/10 rounded-xl py-2.5 px-3 text-white text-xs outline-none focus:border-gold-light/50 transition-all font-sans"
            >
              {TIME_SLOTS.map((slot) => (
                <option key={slot.value} value={slot.value}>
                  {slot.label}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Guests"
            type="number"
            min="1"
            max="15"
            required
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>

        <div className="flex flex-col space-y-1.5 text-left">
          <label className="text-xs text-silver font-medium ml-1">Special Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-dark-bg border border-white/10 rounded-xl py-2.5 px-3.5 text-white text-xs outline-none focus:border-gold-light/50 transition-all h-20 resize-none font-sans"
            placeholder="Allergies, seating preference, birthday..."
          />
        </div>

        <Button type="submit" loading={loading} className="w-full py-3">
          <span>Book Table</span>
        </Button>
      </form>
    </div>
  );
};

export default ReservationForm;
