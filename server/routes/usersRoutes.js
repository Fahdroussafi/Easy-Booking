const express = require("express");
const router = express.Router();
const {
  getAllClients,
  GetUserById,
} = require("../Controllers/usersController");

router.get("/get-all-users", getAllClients);
router.get("/:userId", GetUserById);

module.exports = router;