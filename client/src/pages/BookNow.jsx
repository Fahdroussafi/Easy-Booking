import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { Row, Col, message } from "antd";
import { useParams } from "react-router-dom";
import SeatSelection from "../components/SeatSelection";

function BookNow() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  const [bus, setBus] = useState(null);
  const getBus = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.get(`/api/buses/${params.id}`);
      dispatch(HideLoading());
      if (response.data.success) {
        setBus(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const bookNow = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/bookings/book-seat", {
        bus: bus._id,
        seats: selectedSeats,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBus();
  }, []);
  return (
    <div>
      {bus && (
        <Row className="m-3 p-5" gutter={20}>
          <Col lg={12} xs={24} sm={24}>
            <h1 className="text-xl text-blue-500">{bus.name}</h1>
            <h1 className="text-lg">
              {bus.from} - {bus.to}
            </h1>
            <hr />

            <div className="flex flex-col gap-1 ">
              <h1 className="text-lg">
                <b>Journey Date</b> : {bus.journeyDate}
              </h1>
              <h1 className="text-lg">
                <b>Price</b> : DH {bus.price} /-
              </h1>
              <h1 className="text-lg">
                <b>Departure Time</b> : {bus.departure}
              </h1>
              <h1 className="text-lg">
                <b>Arrival Time</b> : {bus.arrival}
              </h1>
            </div>
            <hr />

            <div className="flex w-48 flex-col ">
              <h1 className="text-lg mt-2">
                Capacity : <b>{bus.capacity}</b>
              </h1>
              <h1 className="text-lg mt-2">
                Seats Left :<b>{bus.capacity - bus.seatsBooked.length}</b>
              </h1>
            </div>
            <hr />

            <div className="flex flex-col gap-2 w-48 ">
              <h1 className="text-xl">
                <b>Selected Seats</b> : {selectedSeats.join(", ")}
              </h1>
              <h1 className="text-xl mt-2">
                <b> Price :</b> DH {bus.price * selectedSeats.length}
              </h1>

              <button
                className={`btn btn-primary bg-blue-600 hover:bg-blue-800 ${
                  selectedSeats.length === 0 &&
                  "btn btn-primary cursor-not-allowed "
                }`}
                disabled={selectedSeats.length === 0}
                onClick={bookNow}
              >
                Book Now
              </button>
            </div>
          </Col>
          <Col lg={12} xs={24} sm={24}>
            <SeatSelection
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              bus={bus}
            />
          </Col>
        </Row>
      )}
    </div>
  );
}

export default BookNow;
