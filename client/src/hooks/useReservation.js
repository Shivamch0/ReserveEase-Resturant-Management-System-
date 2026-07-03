import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useReservation = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useReservation must be used within an AuthProvider");
  }
  return {
    tables: context.tables,
    reservations: context.reservations,
    addTable: context.addTable,
    updateTable: context.updateTable,
    deleteTable: context.deleteTable,
    createReservation: context.createReservation,
    cancelReservation: context.cancelReservation,
    updateReservationStatus: context.updateReservationStatus
  };
};
