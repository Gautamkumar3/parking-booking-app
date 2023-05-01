const express = require("express");
const { registerUser, userLogin, allBookedAndCancelledSlot } = require("../controller/userControler");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", userLogin);
userRouter.get("/all/reservation", allBookedAndCancelledSlot);

module.exports = userRouter;
