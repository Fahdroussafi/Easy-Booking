import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import moment from "moment";

function Bus({ bus }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="max-w-full bg-white flex flex-col rounded overflow-hidden shadow-lg">
        <div className="flex flex-row items-baseline flex-nowrap bg-gray-100 p-2">
          <img className="h-10 w-10 rounded-full mr-4" src={logo} alt="Logo" />
          <h1 className="ml-2 uppercase font-bold">Journey Date</h1>
          <p className="ml-2 font-base text-gray-500">{bus.journeyDate}</p>
        </div>
        <div className="mt-2 flex justify-start bg-white p-2"></div>
        <div className="mt-2 flex sm:flex-row mx-6 sm:justify-between flex-wrap ">
          <div className="flex flex-row place-items-center p-2">
            <div className="flex flex-col ml-2">
              <p className="text-base font-bold">{bus.name}</p>
            </div>
          </div>

          <div className="flex flex-col p-2">
            <p className="font-bold">Departure Time</p>
            <p className="font-base">
              {moment(bus.departure, "HH:mm").format("hh:mm A")}
            </p>

            <p className="font-bold">From </p>
            <p className="text-gray-500">{bus.from}</p>
          </div>
          <div className="flex flex-col flex-wrap p-2">
            <p className="font-bold">Arrival Time</p>
            <p className="font-base">
              {moment(bus.arrival, "HH:mm").format("hh:mm A")}
            </p>

            <p className="font-bold">To</p>

            <p className="text-gray-500">{bus.to}</p>
          </div>
        </div>
        <div className="mt-4 bg-gray-100 flex flex-row flex-wrap md:flex-nowrap justify-between items-baseline">
          <div className="flex mx-6 py-4 flex-row flex-wrap">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>

            <div className="text-sm mx-2 flex flex-col">
              <p className="font-bold text-base">Price</p>
              <p className="font-base">{bus.price} DH</p>
            </div>
          </div>
          <div className="md:border-l-2 mx-6 md:border-dotted flex flex-row py-4 mr-6 flex-wrap">
            <svg
              className="w-12 h-10 p-2 mx-2 self-center bg-green-800 rounded-full fill-current text-white"
              viewBox="0 0 64 64"
              pointerEvents="all"
              aria-hidden="true"
              role="presentation"
              style={{
                display: "block",
                height: "2em",
                width: "2em",
                fill: "currentcolor",
              }}
            >
              <path d="M62.917 38.962C59.376 53.71 47.207 64 31.833 64a31.93 31.93 0 01-21.915-8.832l-5.376 5.376a2.65 2.65 0 01-1.874.789A2.685 2.685 0 010 58.668V40a2.687 2.687 0 012.667-2.667h18.666A2.687 2.687 0 0124 40a2.645 2.645 0 01-.793 1.877L17.5 47.58a21.244 21.244 0 0032.665-4.414 33.706 33.706 0 002.208-4.873 1.292 1.292 0 011.25-.96h8a1.342 1.342 0 011.333 1.337.738.738 0 01-.041.293M64 24a2.687 2.687 0 01-2.667 2.668H42.667A2.687 2.687 0 0140 24a2.654 2.654 0 01.793-1.877l5.749-5.746a21.336 21.336 0 00-32.706 4.457 33.224 33.224 0 00-2.208 4.873 1.293 1.293 0 01-1.25.96H2.085A1.342 1.342 0 01.752 25.33v-.293C4.334 10.247 16.626 0 32 0a32.355 32.355 0 0122.041 8.832l5.419-5.376a2.644 2.644 0 011.872-.789A2.685 2.685 0 0164 5.333z"></path>
            </svg>
            <button
              className="relative inline-flex items-center justify-start
                px-10 py-3 overflow-hidden font-bold rounded-full
                group"
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
              <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
              <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-blue-600 opacity-100 group-hover:-translate-x-8"></span>
              <span className="relative w-full text-left text-black transition-colors duration-200 ease-in-out group-hover:text-white">
                Book Now
              </span>
              <span className="absolute inset-0 border-2 border-blue-600 rounded-full"></span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bus;
