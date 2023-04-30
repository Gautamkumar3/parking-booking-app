import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Page/Login";
import Register from "../Page/Register";
import ReservationForm from "../Page/ReservationForm";
import SlotForm from "../Page/SlotForm";
import ParkingLot from "../Page/ParkingLot";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={"Home"} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reservation_form" element={<ReservationForm />} />
      <Route path="/slot_form" element={<SlotForm />} />
      <Route path="/parking" element={<ParkingLot />} />
    </Routes>
  );
};

export default AllRoutes;
