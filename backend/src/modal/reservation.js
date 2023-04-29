const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  slotNo: {
    type: Number,
    required: [true, "Slot number is missing"],
    enum: [1, 2, 3],
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  bookedFromDate: {
    type: String,
    required: [true, "bookedFromDate is missing"],
  },
  bookedTill: { type: String, required: [true, "bookedTill is missing"] },
  status: {
    type: String,
    enum: ["Avilable", "Booked", "Cancelled"],
    default: "Avilable",
  },
});

reservationSchema.pre("validate", function (next) {
  if (this.bookedFromDate > this.bookedTill) {
    const err = new Error("bookedFromDate must be less than bookedTillDate");
    next(err);
  }
  next();
});

const Reservation = mongoose.model("reservation", reservationSchema);
module.exports = Reservation;
