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

router.post("/book-seat", authMiddleware, BookSeat);
router.get("/get-all-bookings", GetAllBookings);
router.get("/:user_Id", GetAllBookingsByUser);
router.delete("/:id", CancelBooking);
router.post("/make-payment", PayWithStripe);

module.exports = router;
