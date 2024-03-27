const express = require("express");
const router = express();

const {
  AddBus,
  GetAllBuses,
  UpdateBus,
  DeleteBus,
  GetBusById,
  GetBusesByFromAndTo,
} = require("../Controllers/busController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/add-bus", authMiddleware, AddBus);
router.post("/get-all-buses", authMiddleware, GetAllBuses);
router.put("/:id", authMiddleware, UpdateBus);
router.delete("/:id", authMiddleware, DeleteBus);
router.get("/:id", authMiddleware, GetBusById);
router.post("/get", authMiddleware, GetBusesByFromAndTo);

module.exports = router;
