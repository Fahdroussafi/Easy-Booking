const express = require("express");
const router = express();
const authMiddleware = require("../middlewares/authMiddleware");

const {
  BookSeat,
  GetAllBookings,
  GetAllBookingsByUser,
  CancelBooking,
  PayWithStripe,
} = require("../Controllers/bookingController");

router.post("/book-seat/:userId", BookSeat);
router.get("/get-all-bookings", authMiddleware, GetAllBookings);
router.get("/:user_Id", authMiddleware, GetAllBookingsByUser);
router.delete("/:booking_id/:user_id/:bus_id", authMiddleware, CancelBooking);
router.post("/make-payment", PayWithStripe);

module.exports = router;
