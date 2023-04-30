const SlotModal = require("../modal/slot");

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
    console.log(time)
    let avilableSlot = await SlotModal.find({ endDate: { $gte: time } });
    console.log(avilableSlot)
    return res.status(200).send({
      status: "success",
      message: "Slots get successfully",
      data: avilableSlot,
    });
  } catch (er) {
    return res.status(500).send({ status: "error", message: er.message });
  }
};

module.exports = {
  createSlot,
  getAllAvilableSlot,
};
