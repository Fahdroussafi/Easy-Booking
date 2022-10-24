import React from "react";
import { useNavigate } from "react-router-dom";

function Bus({ bus }) {
  const navigate = useNavigate();
  return (
    <div className="p-3 m-2 rounded-md border-[0.5px] border-black hover:shadow-2xl duration-300">
      <h1 className="text-xl font-semibold">{bus.name}</h1>
      <div className="border-[1px] border-black"></div>
      <div className="flex justify-between p-2">
        <div>
          <p className="text-base font-semibold">From</p>
          <p className="text-base">{bus.from}</p>
        </div>

        <div>
          <p className="text-base font-semibold">To</p>
          <p className="text-base">{bus.to}</p>
        </div>

        <div>
          <p className="text-base font-semibold">Price</p>
          <p className="text-base">DH {bus.price} /- </p>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <p className="text-base font-semibold">Journey Date</p>
          <p className="text-base">{bus.journeyDate}</p>
        </div>
        <h1
          className="text-base underline btn btn-sm btn-primary bg-blue-600 hover:bg-blue-800 hover:duration-300"
          onClick={() => {
            navigate(`/book-now/${bus._id}`);
          }}
        >
          Book Now
        </h1>
      </div>
    </div>
  );
}

export default Bus;
