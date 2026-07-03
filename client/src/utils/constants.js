export const USER_STORAGE_KEY = "reserveease_user";
export const TABLES_STORAGE_KEY = "reserveease_tables";
export const RESERVATIONS_STORAGE_KEY = "reserveease_reservations";

export const DEFAULT_TABLES = [
  { _id: "t1", tableNumber: 1, capacity: 2, isActive: true },
  { _id: "t2", tableNumber: 2, capacity: 2, isActive: true },
  { _id: "t3", tableNumber: 3, capacity: 4, isActive: true },
  { _id: "t4", tableNumber: 4, capacity: 4, isActive: true },
  { _id: "t5", tableNumber: 5, capacity: 6, isActive: true },
  { _id: "t6", tableNumber: 6, capacity: 8, isActive: true }
];

export const DEFAULT_RESERVATIONS = [
  {
    _id: "r1",
    customer: "u1",
    customerName: "John Customer",
    table: "t3",
    tableNumber: 3,
    reservationDate: "2026-07-04",
    startTime: "18:00",
    endTime: "20:00",
    guests: 3,
    status: "Booked",
    notes: "Window seat if possible"
  },
  {
    _id: "r2",
    customer: "u1",
    customerName: "John Customer",
    table: "t1",
    tableNumber: 1,
    reservationDate: "2026-07-02",
    startTime: "12:00",
    endTime: "14:00",
    guests: 2,
    status: "Completed",
    notes: ""
  }
];

export const TIME_SLOTS = [
  { value: "12:00", label: "12:00 PM" },
  { value: "14:00", label: "02:00 PM" },
  { value: "16:00", label: "04:00 PM" },
  { value: "18:00", label: "06:00 PM" },
  { value: "20:00", label: "08:00 PM" },
  { value: "22:00", label: "10:00 PM" }
];

export const RESERVATION_STATUSES = {
  BOOKED: "Booked",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed"
};
