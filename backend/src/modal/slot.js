const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  slotNo: {
    type: Number,
    required: [true, "Slot number is required"],
    enum: [1, 2, 3],
  },
  status: {
    type: String,
    enum: ["available", "booked"],
    default: "available",
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  price: { type: Number, required: [true, "Price is missing"] },
});

slotSchema.pre("validate", function (next) {
  if (this.startDate > this.endDate) {
    const err = new Error("start date must be less than end date");
    next(err);
  }
  next();
});

const Slot = mongoose.model("slot", slotSchema);

module.exports = Slot;
