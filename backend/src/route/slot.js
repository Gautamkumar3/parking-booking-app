const express = require("express");
const { createSlot } = require("../controller/slotControler");


const slotRouter = express.Router();

slotRouter.post("/create",  createSlot);

module.exports = slotRouter;
