import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Page/Login";
import Register from "../Page/Register";
import SlotForm from "../Page/SlotForm";
import ParkingLot from "../Page/ParkingLot";
import Reservation from "../Page/Reservation";
import PrivateRoute from "../Components/PrivateRoute";

const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <ParkingLot />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/slot_form"
        element={
          <PrivateRoute>
            <SlotForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/reservation"
        element={
          <PrivateRoute>
            <Reservation />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
