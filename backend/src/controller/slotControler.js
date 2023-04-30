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
      $and: [{ endDate: { $gte: time } }, { status: "available" }],
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

module.exports = {
  createSlot,
  getAllAvilableSlot,
  getAllSlot,
  bookSlot,
};
