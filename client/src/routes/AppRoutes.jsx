import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";
import AdminRoute from "../components/common/AdminRoute";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Unauthorized from "../pages/Unauthorized";
import NotFound from "../pages/NotFound";
import CustomerDashboard from "../pages/customer/Dashboard";
import BookReservation from "../pages/customer/BookReservation";
import MyReservations from "../pages/customer/MyReservations";
import Profile from "../pages/customer/Profile";
import AdminDashboard from "../pages/admin/Dashboard";
import Reservations from "../pages/admin/Reservations";
import ReservationDetails from "../pages/admin/ReservationDetails";
import Tables from "../pages/admin/Tables";
import AddTable from "../pages/admin/AddTable";
import EditTable from "../pages/admin/EditTable";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/customer/book" element={<BookReservation />} />
          <Route path="/customer/reservations" element={<MyReservations />} />
          <Route path="/customer/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/reservations" element={<Reservations />} />
            <Route path="/admin/reservations/:id" element={<ReservationDetails />} />
            <Route path="/admin/tables" element={<Tables />} />
            <Route path="/admin/tables/add" element={<AddTable />} />
            <Route path="/admin/tables/edit/:id" element={<EditTable />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
