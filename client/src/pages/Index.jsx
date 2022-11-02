import "../assets/style/index.css";
import image from "../assets/img/car.jpeg";
import logo from "../assets/img/logo.png";
import React from "react";
import { Helmet } from "react-helmet";


function Index() {
  return (
    <>
      <Helmet>
        <title>Easy-Booking</title>
      </Helmet>

      <div className="flex flex-col  mx-auto -mt-20 overflow-hidden bg-gradient-to-r from-blue-500 to-blue-500">
        <div className="relative z-20 flex w-full min-h-screen px-5 pt-20 mx-auto sm:px-12 sm:h-screen max-w-7xl sm:pt-0 lg:px-0">
          <div className="w-full md:w-2/3">
            <div className="flex flex-col items-start justify-center w-full h-full pb-20">
              <div className="relative w-full lg:pl-10">
                <div className="flex items-center justify-center bg-white rounded-lg w-12 h-12 sm:rounded-xl">
                  <img src={logo} alt="logo" />
                </div>
                <h1
                  className="relative z-0 w-full max-w-md py-2 text-4xl font-black text-left text-white sm:py-5 sm:text-6xl"
                  data-unsp-sanitized="clean"
                >
                  Easy-Booking
                </h1>
              </div>

              <div className="flex flex-col items-start my-4 text-left lg:pl-10">
                <p className="max-w-md mb-10 text-base font-extrabold text-gray-200 sm:text-lg lg:text-xl dark:text-dark-200">
                  Easy-Booking is a web application that allows you to book your
                  trips easily and quickly.
                </p>

                <div className="relative flex flex-col items-center justify-start w-full space-y-5 sm:w-auto lg:space-y-0 lg:space-x-5 lg:flex-row">
                  <a
                    href="/login"
                    className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-white text-blue-600 transition duration-150 ease-in-out border border-transparent rounded-lg sm:w-auto sm:rounded-full bg-blue-50 xl:px-10 hover:bg-white focus:outline-none focus:border-blue-700 focus:shadow-outline-blue md:py-4 xl:text-xl"
                    data-unsp-sanitized="clean"
                  >
                    Book Right Now
                  </a>
                  {/* <a
                    href="/register"
                    className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-white text-blue-600 transition duration-150 ease-in-out border border-transparent rounded-lg sm:w-auto sm:rounded-full bg-blue-50 xl:px-10 hover:bg-white focus:outline-none focus:border-blue-700 focus:shadow-outline-blue md:py-4 xl:text-xl"
                    data-unsp-sanitized="clean"
                  >
                    Register
                  </a> */}
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-0 md:w-1/2"></div>
        </div>
        <div className="absolute  top-0 left-0 z-0 flex items-start justify-center w-full h-screen overflow-hidden opacity-75">
          <div className="relative z-20 w-1/2">
            <div className="absolute top-0 left-0 w-full h-screen bg-gradient-to-r from-blue-500 to-blue-500"></div>
          </div>
          <div className="relative z-10 w-1/2 ">
            <div className="absolute top-0 right-0 hidden w-full h-full sm:block">
              <div className="flex items-center justify-center w-screen h-screen transform scale-75 -rotate-12 -translate-x-80 sm:-translate-x-64 sm:scale-125 md:scale-125 min-w-persp md:-translate-x-24">
                <div className="flex flex-col flex-wrap items-start justify-start w-full h-screen mx-auto space-x-3 space-y-3 transformPerspective">
                  <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm mt-3 ml-3">
                    <img src={image} className="object-cover w-full h-auto" />
                  </div>
                  <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                    <img src={image} className="object-cover w-full h-auto" />
                  </div>
                  <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                    <img src={image} className="object-cover w-full h-auto" />
                  </div>
                  <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                    <img src={image} className="object-cover w-full h-auto" />
                  </div>
                  <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                    <img src={image} className="object-cover w-full h-auto" />
                  </div>
                  <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                    <img src={image} className="object-cover w-full h-auto" />
                  </div>
                  <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                    <img src={image} className="object-cover w-full h-auto" />
                  </div>
                  <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                    <img src={image} className="object-cover w-full h-auto" />
                  </div>
                  <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                    <img src={image} className="object-cover w-full h-auto" />
                  </div>
                  <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                    <img src={image} className="object-cover w-full h-auto" />
                  </div>
                  <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                    <img src={image} className="object-cover w-full h-auto" />
                  </div>
                  <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                    <img src={image} className="object-cover w-full h-auto" />
                  </div>
                  <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                    <img src={image} className="object-cover w-full h-auto" />
                  </div>
                  <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                    <img src={image} className="object-cover w-full h-auto" />
                  </div>
                  <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                    <img src={image} className="object-cover w-full h-auto" />
                  </div>
                  <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                    <img src={image} className="object-cover w-full h-auto" />
                  </div>
                  <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                    <img src={image} className="object-cover w-full h-auto" />
                  </div>
                  <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                    <img src={image} className="object-cover w-full h-auto" />
                  </div>
                  <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                    <img src={image} className="object-cover w-full h-auto" />
                  </div>
                  <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                    <img src={image} className="object-cover w-full h-auto" />
                  </div>
                  <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                    <img src={image} className="object-cover w-full h-auto" />
                  </div>
                  <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                    <img src={image} className="object-cover w-full h-auto" />
                  </div>
                  <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                    <img src={image} className="object-cover w-full h-auto" />
                  </div>
                  <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                    <img src={image} className="object-cover w-full h-auto" />
                  </div>
                  <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                    <img src={image} className="object-cover w-full h-auto" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-0 left-0 z-50 w-full h-screen bg-gradient-to-r from-blue-500 t to-transparent"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
