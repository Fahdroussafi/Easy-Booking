const router = require("express").Router();
const Booking = require("../models/bookingsModel");
const Bus = require("../models/busModel");
const authMiddleware = require("../middlewares/authMiddleware");

// book a seat
router.post("/book-seat", authMiddleware, async (req, res) => {
  try {
    const newBooking = new Booking({
      ...req.body, // spread operator to get all the data from the request body
      transactionId: "1234",
      user: req.body.userId,
    });
    await newBooking.save();
    const bus = await Bus.findById(req.body.bus); // get the bus from the request body
    bus.seatsBooked = [...bus.seatsBooked, ...req.body.seats]; // add the booked seats to the bus seatsBooked array in the database
    await bus.save();
    res.status(200).send({
      message: "Seat booked successfully",
      data: newBooking,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Booking failed",
      data: error,
      success: false,
    });
  }
});

// get all bookings
router.get("/get-all-bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).send({
      message: "Bookings fetched successfully",
      data: bookings,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "No Bookings Found",
      data: error,
      success: false,
    });
  }
});

// get all bookings by user
router.get("/get-all-bookings-by-user", async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.body.userId });
    res.status(200).send({
      message: "Bookings fetched successfully",
      data: bookings,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "No Bookings Found",
      data: error,
      success: false,
    });
  }
});

module.exports = router;
