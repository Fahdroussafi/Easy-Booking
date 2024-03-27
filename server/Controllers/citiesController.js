// get all cities from json file

const fs = require("fs");
const path = require("path");
const cities = require("../data/cities.json");

const GetAllCities = (req, res) => {
  res.status(200).send({
    status: "success",
    data: cities,
  });
};


module.exports = { GetAllCities };
