import React from "react";
import { useNavigate } from "react-router-dom";

function Bus({ bus }) {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-900 text-white p-3 m-2 rounded-md border-[0.5px] border-blue-600 hover:shadow-2xl duration-300">
      <h1 className="text-xl font-extrabold text-blue-500">{bus.name}</h1>
      <div className="border-[1px] border-blue-600"></div>
      <div className="flex justify-between p-2">
        <div>
          <p className="text-base font-bold">From</p>
          <p className="text-base">{bus.from}</p>
        </div>

        <div>
          <p className="text-base font-bold">To</p>
          <p className="text-base">{bus.to}</p>
        </div>

        <div>
          <p className="text-base font-bold">Price</p>
          <p className="text-base">DH {bus.price} /- </p>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <p className="text-base font-bold">Journey Date</p>
          <p className="text-base">{bus.journeyDate}</p>
        </div>
        <button
          className="text-base text-white underline rounded-full px-5 py-2 bg-blue-600 hover:bg-blue-800 hover:duration-300 hover:text-white"
          onClick={() => {
            if (localStorage.getItem("user_id")) {
              navigate(`/book-now/${bus._id}`);
            } else {
              navigate(`/login`);
            }
            // clear local storage
            localStorage.removeItem("idTrip");
            // set id trip local storage
            localStorage.setItem("idTrip", bus._id);
          }}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export default Bus;
