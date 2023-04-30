const express = require("express");
const {
  createSlot,
  getAllAvilableSlot,
} = require("../controller/slotControler");

const slotRouter = express.Router();

slotRouter.post("/create", createSlot);
slotRouter.get("/avilable", getAllAvilableSlot);

module.exports = slotRouter;
