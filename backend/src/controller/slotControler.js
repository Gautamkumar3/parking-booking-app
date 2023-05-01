const SlotModal = require("../modal/slot");
const ReservationModal = require("../modal/reservation");
const UserModal = require("../modal/user");

const createSlot = async (req, res) => {
  try {
    const newSlot = new SlotModal({
      ...req.body,
    });
    await newSlot.save();
    return res.status(200).send({
      status: "success",
      message: "Slot created successfully",
      data: newSlot,
    });
  } catch (er) {
    return res.status(500).send({ status: "error", message: er.message });
  }
};

const getAllAvilableSlot = async (req, res) => {
  try {
    let time = new Date();
    let avilableSlot = await SlotModal.find({
      $and: [{ bookedTill: { $gte: time } }, { status: "available" }],
    });

    return res.status(200).send({
      status: "success",
      message: "Slots get successfully",
      data: avilableSlot,
    });
  } catch (er) {
    return res.status(500).send({ status: "error", message: er.message });
  }
};

const getAllSlot = async (req, res) => {
  try {
    let allSlot = await SlotModal.find({});

    return res.status(200).send({
      status: "success",
      message: "Slots get successfully",
      data: allSlot,
    });
  } catch (er) {
    return res.status(500).send({ status: "error", message: er.message });
  }
};

const bookSlot = async (req, res) => {
  const { id } = req.params;
  let slot = await SlotModal.findById(id);
  if (!slot) {
    return res.status(400).send({ status: "error", message: "Slot not found" });
  }

  if (slot.status === "available") {
    const newReservation = new ReservationModal({
      slotNo: slot.slotNo,
      slotId: id,
      user: req.userId,
      status: "Booked",
      bookedFromDate: slot.bookedFromDate,
      bookedTill: slot.bookedTill,
      price: slot.price,
    });
    await newReservation.save();
    slot.status = "booked";
    slot.save();

    const user = await UserModal.findById(req.userId);
    if (user) {
      user.booked.push({ slotId: id });
      user.save();
    }
    return res.status(200).send({
      status: "success",
      message: "Reservation successfull",
      data: newReservation,
    });
  } else {
    return res
      .status(400)
      .send({ status: "error", message: "Slot already booked" });
  }
};

const cancelSlot = async (req, res) => {
  const { id } = req.params;
  let slot = await SlotModal.findById(id);
  if (!slot) {
    return res.status(400).send({ status: "error", message: "Slot not found" });
  }
  let reservation = await ReservationModal.findOne({ slotId: id });

  if (!reservation) {
    return res
      .status(400)
      .send({ status: "error", message: "Reservation not found" });
  }

  if (slot.status === "booked" && reservation.status == "Booked") {
    slot.status = "available";
    slot.save();
    reservation.status = "Cancelled";
    reservation.save();

    await UserModal.updateOne(
      { _id: req.userId },
      {
        $pull: { booked: { slotId: id } },
        $push: { cancelled: { slotId: id } },
      }
    );
    return res.status(200).send({
      status: "success",
      message: "Reservation cancelled successfully",
    });
  } else if (slot.status === "booked" && reservation.status === "Cancelled") {
    slot.status = "available";
    slot.save();
    await UserModal.updateOne(
      { _id: req.userId },
      {
        $pull: { booked: { slotId: id } },
        $push: { cancelled: { slotId: id } },
      }
    );
    return res.status(200).send({
      status: "success",
      message: "Reservation cancelled successfully",
    });
  } else if (slot.status === "available") {
    return res.status(400).send({
      status: "error",
      message: "You couldn't cancel the slot because this is not booked",
    });
  } else {
    return res.status(400).send({
      status: "error",
      message: "Something went wrong",
    });
  }
};

module.exports = {
  createSlot,
  getAllAvilableSlot,
  getAllSlot,
  bookSlot,
  cancelSlot,
};
