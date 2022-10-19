const express = require("express");
const router = express();
const { CreateUser, Login } = require("../Controllers/authController");

router.post("/create-user", CreateUser);
router.post("/login", Login);

module.exports = router;
