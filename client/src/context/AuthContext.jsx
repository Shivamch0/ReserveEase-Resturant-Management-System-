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

  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    localStorage.setItem(
      RESERVATIONS_STORAGE_KEY,
      JSON.stringify(reservations),
    );
  }, [reservations]);

  const login = async ({ email, password }) => {
    try {
      const response = await api.post("/users/login", { email, password });
      const info = response.data.data;
      setUser(info);
      return info;
    } catch (error) {
      console.log(error);
    }
  };

  const register = async ({ userName, email, password }) => {
    try {
      const response = await api.post("/users/register", {
        userName,
        email,
        password,
      });
      const info = response.data.data;
      setUser(info);
      return info;
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await api.post("/users/logout");
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const addTable = async ({ tableNumber, capacity }) => {
    try {
      const response = await api.post("/tables", { tableNumber, capacity });
      const newTable = response.data.data;
      setTables((prev) => [...prev, newTable]);
      return newTable;
    } catch (error) {
      console.log(error);
    }
  };

  const updateTable = async (id, capacity, isActive) => {
    try {
      await api.patch(`/tables/${id}`, { capacity, isActive });
      setTables((prev) =>
        prev.map((t) => (t._id === id ? { ...t, capacity, isActive } : t)),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTable = async (id) => {
    try {
      await api.delete(`/tables/${id}`);
      setTables((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.log(error);
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
      setReservations(prev => [...prev , newRes]);
      return newRes;
    } catch (error) {
      console.log(error);
    }
  };

  const cancelReservation = async (id) => {
    try {
      await api.patch(`/reservations/${id}` , {status : "Cancelled"});
      setReservations(prev => prev.map(r => r._id === id ? {...r , status : "Cancelled"} : r));
    } catch (error) {
      console.log(error)
    }
  };

  const updateReservationStatus  = async (id, status) => {
   try {
    const response = await api.patch(`/reservations/${id}` , {status});
    const updatedRes = response.data.data;
    setReservations(prev => prev.map(r => r._id === id ? updatedRes : r))
   } catch (error) {
    console.log(error)
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
        updateReservationStatus ,
      }

  return (
    <AuthContext.Provider
      value={value}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
