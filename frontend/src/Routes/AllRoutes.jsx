import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Page/Login";
import Register from "../Page/Register";
import ReservationForm from "../Page/ReservationForm";
import SlotForm from "../Page/SlotForm";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={"Home"} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reservation_form" element={<ReservationForm />} />
      <Route path="/slot_form" element={<SlotForm />} />
    </Routes>
  );
};

export default AllRoutes;
