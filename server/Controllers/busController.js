const Bus = require("../models/busModel");

// Add a new bus
const AddBus = async (req, res) => {
  try {
    const existingBus = await Bus.findOne({ busNumber: req.body.busNumber });
    existingBus
      ? res.send({ message: "Bus already exists", success: false, data: null })
      : await new Bus(req.body).save();

    res.status(200).send({
      message: "Bus created successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// get all buses and if the journeyDate is passed 1 hour ago , make the status of the bus to "Completed"
const GetAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    buses.forEach(async (bus) => {
      const journey = new Date(bus.journeyDate);
      // const departure = new Date(bus.departure);

      // turn the departure time from time to date
      const departure = new Date(
        `${journey.getFullYear()}-${
          journey.getMonth() + 1
        }-${journey.getDate()} ${bus.departure}`
      );

      if (departure.getTime() - new Date().getTime() < 3600000) {
        await Bus.findByIdAndUpdate(bus._id, { status: "Completed" });
      }
      console.log("departure time is : ", departure, "journey date");
    });

    res.status(200).send({
      message: "Buses fetched successfully",
      success: true,
      data: buses,
    });
  } catch (error) {
    res.status(500).send({
      message: "No Buses Found",
      success: false,
      data: error,
    });
  }
};

// update a bus
const UpdateBus = async (req, res) => {
  try {
    await Bus.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send({
      message: "Bus updated successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// delete a bus
const DeleteBus = async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.params.id);
    res.status(200).send({
      message: "Bus deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// get bus by id
const GetBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    res.status(200).send({
      message: "Bus fetched successfully",
      success: true,
      data: bus,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = { AddBus, GetAllBuses, UpdateBus, DeleteBus, GetBusById };
