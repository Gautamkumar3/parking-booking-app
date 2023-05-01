import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Page/Login";
import Register from "../Page/Register";
import SlotForm from "../Page/SlotForm";
import ParkingLot from "../Page/ParkingLot";
import Reservation from "../Page/Reservation";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={"Home"} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/slot_form" element={<SlotForm />} />
      <Route path="/parking" element={<ParkingLot />} />
      <Route path="/reservation" element={<Reservation />} />
    </Routes>
  );
};

export default AllRoutes;
