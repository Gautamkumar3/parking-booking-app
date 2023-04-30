const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  slotNo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "slot",
    required: true,
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
  price: { type: Number, required: [true, "Price is missing"] },
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
