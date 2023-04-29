const ReservationModal = require("../modal/reservation");

const createReservation = async (req, res) => {
  try {
    const newReservation = new ReservationModal({
      ...req.body,
      user: req.userId,
    });
    await newReservation.save();
    return res.status(200).send({
      status: "success",
      message: "Reservation created successfully",
      data: newReservation,
    });
  } catch (er) {
    return res.status(500).send({ status: "error", message: er.message });
  }
};

module.exports = {
  createReservation,
};
