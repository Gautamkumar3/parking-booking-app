const express = require("express");
const { createReservation } = require("../controller/ReservationController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

const reservationRouter = express.Router();

reservationRouter.post("/create", AuthMiddleware, createReservation);

module.exports = reservationRouter;
