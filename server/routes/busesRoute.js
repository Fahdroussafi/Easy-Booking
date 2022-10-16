const router = require("express").Router();
const Bus = require("../models/busModel");

// Add a new bus

router.post("/add-bus", async (req, res) => {
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

module.exports = router;
