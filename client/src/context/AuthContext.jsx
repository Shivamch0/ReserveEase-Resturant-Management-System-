import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
  withCredentials: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tables, setTables] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const checkSession = async () => {
    try {
      const response = await api.get("/users/current-user");
      setUser(response.data.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    try {
      const tableResponse = await api.get("/tables");
      setTables(tableResponse.data.data || []);

      const resUrl =
        user.role === "admin"
          ? "/reservations/all-reservations"
          : "/reservations";

      const reservationResponse = await api.get(resUrl);
      setReservations(reservationResponse.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    if (!user) {
      setTables([]);
      setReservations([]);
      return;
    }
    loadData();
  }, [user]);

  const login = async (email, password) => {
    try {
      const response = await api.post("/users/login", { email, password });
      const info = response.data.data;
      setUser(info);
      toast.success(`Welcome back, ${info.userName}!`);
      return info;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      throw error;
    }
  };

  const register = async (userName, email, password) => {
    try {
      const response = await api.post("/users/register", {
        userName,
        email,
        password,
      });
      const info = response.data.data;
      setUser(info);
      toast.success("Account created successfully!");
      return info;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post("/users/logout");
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const addTable = async (tableNumber, capacity) => {
    try {
      const response = await api.post("/tables", { tableNumber, capacity });
      const newTable = response.data.data;
      setTables((prev) => [...prev, newTable]);
      toast.success("Table added successfully!");
      return newTable;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add table");
    }
  };

  const updateTable = async (id, capacity, isActive) => {
    try {
      await api.patch(`/tables/${id}`, { capacity, isActive });
      setTables((prev) =>
        prev.map((t) => (t._id === id ? { ...t, capacity, isActive } : t)),
      );
      toast.success("Table updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update table");
    }
  };

  const deleteTable = async (id) => {
    try {
      await api.delete(`/tables/${id}`);
      setTables((prev) => prev.filter((t) => t._id !== id));
      toast.success("Table deleted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete table");
    }
  };

  const createReservation = async ({
    reservationDate,
    startTime,
    endTime,
    guests,
    notes,
  }) => {
    try {
      const response = await api.post("/reservations", {
        reservationDate,
        startTime,
        endTime,
        guests,
        notes,
      });
      const newRes = response.data.data;
      setReservations((prev) => [...prev, newRes]);
      toast.success("Table reserved successfully!");
      return newRes;
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
      throw error;
    }
  };

  const cancelReservation = async (id) => {
    try {
      await api.patch(`/reservations/${id}`, { status: "Cancelled" });
      setReservations((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: "Cancelled" } : r)),
      );
      toast.success("Reservation cancelled successfully!");
    } catch (error) {
      toast.error("Failed to cancel reservation");
    }
  };

  const updateReservationStatus = async (id, status) => {
    try {
      const response = await api.patch(`/reservations/${id}`, { status });
      const updatedRes = response.data.data;
      setReservations((prev) =>
        prev.map((r) => (r._id === id ? updatedRes : r)),
      );
      toast.success("Reservation status updated!");
    } catch (error) {
      toast.error("Failed to update reservation");
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    tables,
    reservations,
    addTable,
    updateTable,
    deleteTable,
    createReservation,
    cancelReservation,
    updateReservationStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
