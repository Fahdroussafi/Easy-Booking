const express = require("express");
const router = express.Router();
const {
  getAllClients,
  GetUserById,
} = require("../Controllers/usersController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/get-all-users", getAllClients);
router.get("/:userId", GetUserById);

module.exports = router;
