const router = require("express").Router();
const Bus = require("../models/busModel");
const authMiddleware = require("../middlewares/authMiddleware");

// Add a new bus
router.post("/add-bus", authMiddleware, async (req, res) => {
  try {
    const existingBus = await Bus.findOne({ busNumber: req.body.busNumber });
    if (existingBus) {
      return res.status(400).send({
        message: "Bus already exists",
        success: false,
      });
    }
    const newBus = new Bus(req.body);
    await newBus.save();
    res.status(200).send({
      message: "Bus created successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// get all buses
router.get("/get-all-buses", async (req, res) => {
  try {
    const buses = await Bus.find();
    return res.status(200).send({
      success: true,
      message: "Buses fetched successfully",
      data: buses,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// update a bus
router.put("/update-bus", authMiddleware, async (req, res) => {
  try {
    await Bus.findByIdAndUpdate(req.body._id, req.body);
    res.status(200).send({
      message: "Bus updated successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// delete a bus
router.delete("/delete-bus", authMiddleware, async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.body._id);
    res.status(200).send({
      message: "Bus deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send();
  }
});

// get bus by id
router.post("/get-bus-by-id",  async (req, res) => {
  try {
    const bus = await Bus.findById(req.body._id);
    res.status(200).send({
      message: "Bus fetched successfully",
      success: true,
      data: bus,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

module.exports = router;
