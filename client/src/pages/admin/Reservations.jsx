import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReservation } from "../../hooks/useReservation";
import ReservationTable from "../../components/reservation/ReservationTable";

export const Reservations = () => {
  const { reservations, updateReservationStatus } = useReservation();
  const navigate = useNavigate();

  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleStatusChange = async (id, status) => {
    await updateReservationStatus(id, status);
  };

  const handleViewDetails = (id) => {
    navigate(`/admin/reservations/${id}`);
  };

  const filteredReservations = reservations.filter((r) => {
    const matchesDate = filterDate ? r.reservationDate === filterDate : true;
    const matchesStatus = filterStatus === "All" ? true : r.status === filterStatus;
    const matchesSearch = searchQuery
      ? r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.tableNumber.toString() === searchQuery
      : true;
    return matchesDate && matchesStatus && matchesSearch;
  });

  return (
    <div className="flex flex-col space-y-6 text-left">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold text-white tracking-tight">Master Reservations</h2>
        <p className="text-sm text-silver">Filter and oversee customer restaurant table bookings.</p>
      </div>

      <div className="glass p-6 rounded-2xl border border-white/5">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <input
            type="text"
            placeholder="Search customer / table..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-dark-bg border border-white/10 rounded-xl py-2 px-3.5 text-xs text-white outline-none focus:border-gold-light/50 font-sans flex-1 min-w-[200px]"
          />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="bg-dark-bg border border-white/10 rounded-xl py-2 px-3.5 text-xs text-white outline-none focus:border-gold-light/50 font-sans"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-dark-bg border border-white/10 rounded-xl py-2 px-3.5 text-xs text-white outline-none focus:border-gold-light/50 font-sans"
          >
            <option value="All">All Statuses</option>
            <option value="Booked">Booked</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <ReservationTable
          reservations={filteredReservations}
          onStatusChange={handleStatusChange}
          onViewDetails={handleViewDetails}
        />
      </div>
    </div>
  );
};

export default Reservations;
