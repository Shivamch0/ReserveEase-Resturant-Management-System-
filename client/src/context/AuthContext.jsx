import React, { createContext, useState, useEffect } from "react";
import {
  USER_STORAGE_KEY,
  TABLES_STORAGE_KEY,
  RESERVATIONS_STORAGE_KEY,
  DEFAULT_TABLES,
  DEFAULT_RESERVATIONS
} from "../utils/constants";
import { delay } from "../utils/helpers";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(USER_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const [tables, setTables] = useState(() => {
    const saved = localStorage.getItem(TABLES_STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_TABLES;
  });

  const [reservations, setReservations] = useState(() => {
    const saved = localStorage.getItem(RESERVATIONS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_RESERVATIONS;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(TABLES_STORAGE_KEY, JSON.stringify(tables));
  }, [tables]);

  useEffect(() => {
    localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(reservations));
  }, [reservations]);

  const login = async (email, password) => {
    setLoading(true);
    await delay(500);
    try {
      let loggedUser;
      if (email === "admin@reserveease.com" && password === "admin123") {
        loggedUser = {
          _id: "u2",
          userName: "Sarah Admin",
          email: "admin@reserveease.com",
          role: "admin"
        };
      } else if (email === "customer@reserveease.com" && password === "customer123") {
        loggedUser = {
          _id: "u1",
          userName: "John Customer",
          email: "customer@reserveease.com",
          role: "customer"
        };
      } else {
        const namePart = email.split("@")[0];
        loggedUser = {
          _id: "u_" + Date.now(),
          userName: namePart.charAt(0).toUpperCase() + namePart.slice(1),
          email,
          role: "customer"
        };
      }
      setUser(loggedUser);
      return loggedUser;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userName, email, password) => {
    setLoading(true);
    await delay(500);
    try {
      const newUser = {
        _id: "u_" + Date.now(),
        userName,
        email,
        role: "customer"
      };
      setUser(newUser);
      return newUser;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    await delay(300);
    setUser(null);
    setLoading(false);
  };

  const addTableState = async (tableNumber, capacity) => {
    await delay(500);
    const parsedNumber = Number(tableNumber);
    const parsedCapacity = Number(capacity);
    if (tables.some(t => t.tableNumber === parsedNumber)) {
      throw new Error("Table with this number already exists");
    }
    const newTable = {
      _id: "t_" + Date.now(),
      tableNumber: parsedNumber,
      capacity: parsedCapacity,
      isActive: true
    };
    setTables(prev => [...prev, newTable]);
    return newTable;
  };

  const updateTableState = async (id, capacity, isActive) => {
    await delay(500);
    setTables(prev => prev.map(t => {
      if (t._id === id) {
        return { ...t, capacity: Number(capacity), isActive };
      }
      return t;
    }));
  };

  const deleteTableState = async (id) => {
    await delay(500);
    if (reservations.some(r => r.table === id)) {
      throw new Error("Cannot delete table because reservations exist for it");
    }
    setTables(prev => prev.filter(t => t._id !== id));
  };

  const createReservationState = async ({ reservationDate, startTime, endTime, guests, notes }) => {
    await delay(500);
    const guestCount = Number(guests);
    const activeTables = tables.filter(t => t.isActive && t.capacity >= guestCount);
    if (activeTables.length === 0) {
      throw new Error("No active table has enough capacity for this guest count");
    }
    const sorted = [...activeTables].sort((a, b) => a.capacity - b.capacity);
    let selectedTable = null;
    for (const tbl of sorted) {
      const conflict = reservations.some(res => {
        if (res.table !== tbl._id || res.reservationDate !== reservationDate || res.status !== "Booked") {
          return false;
        }
        return (startTime >= res.startTime && startTime < res.endTime) ||
               (endTime > res.startTime && endTime <= res.endTime) ||
               (startTime <= res.startTime && endTime >= res.endTime);
      });
      if (!conflict) {
        selectedTable = tbl;
        break;
      }
    }
    if (!selectedTable) {
      throw new Error("No tables of sufficient capacity are available for the selected date and time slot");
    }
    const newRes = {
      _id: "r_" + Date.now(),
      customer: user ? user._id : "guest",
      customerName: user ? user.userName : "Guest",
      table: selectedTable._id,
      tableNumber: selectedTable.tableNumber,
      reservationDate,
      startTime,
      endTime,
      guests: guestCount,
      status: "Booked",
      notes: notes || ""
    };
    setReservations(prev => [...prev, newRes]);
    return newRes;
  };

  const cancelReservationState = async (id) => {
    await delay(400);
    setReservations(prev => prev.map(r => {
      if (r._id === id) {
        return { ...r, status: "Cancelled" };
      }
      return r;
    }));
  };

  const updateReservationStatusState = async (id, status) => {
    await delay(400);
    setReservations(prev => prev.map(r => {
      if (r._id === id) {
        return { ...r, status };
      }
      return r;
    }));
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      tables,
      reservations,
      addTable: addTableState,
      updateTable: updateTableState,
      deleteTable: deleteTableState,
      createReservation: createReservationState,
      cancelReservation: cancelReservationState,
      updateReservationStatus: updateReservationStatusState
    }}>
      {children}
    </AuthContext.Provider>
  );
};
