const express = require("express");
const router = express();
const {
  BookSeat,
  GetAllBookings,
  GetAllBookingsByUser,
  CancelBooking,
} = require("../Controllers/bookingController");

router.post("/book-seat", BookSeat);
router.get("/get-all-bookings", GetAllBookings);
router.get("/:id", GetAllBookingsByUser);
router.delete("/:id", CancelBooking);

module.exports = router;
