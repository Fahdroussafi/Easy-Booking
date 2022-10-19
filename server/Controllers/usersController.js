const User = require("../models/usersModel");

// get user by id

const GetUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.send({
      message: "User fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
};


// get all users
const getAllClients = async (req, res) => {
  try {
    const users = await User.find();
    res.send({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
};

module.exports = { GetUserById, getAllClients };
