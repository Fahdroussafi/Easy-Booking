import "../assets/style/index.css";
import image from "../assets/img/car.jpeg";
import logo from "../assets/img/logo.png";
import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import Bus from "../components/Bus";
import { Row, Col, message } from "antd";

function Index() {
  const dispatch = useDispatch();
  const [buses, setBuses] = useState([]);
  const [cities, setCities] = useState([]);
  const { user } = useSelector((state) => state.users);
  const [filters, setFilters] = useState({});

  const getBusesByFilter = async () => {
    dispatch(ShowLoading());
    const from = filters.from;
    const to = filters.to;
    const journeyDate = filters.journeyDate;
    try {
      const { data } = await axiosInstance.post(
        `/api/buses/get?from=${from}&to=${to}&journeyDate=${journeyDate}`
      );

      setBuses(data.data);
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.response.data.message);
    }
  };

  const getBuses = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/buses/get-all-buses");
      dispatch(HideLoading());
      if (response.data.success) {
        setBuses(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    axiosInstance.get("/api/cities/get-all-cities").then((response) => {
      setCities(response.data.data);
    });
  }, []);

  useEffect(() => {
    if (filters.from && filters.to && filters.journeyDate) getBuses();
  }, []);

  useEffect(() => {
    if (filters.from && filters.to && filters.journeyDate) {
      getBusesByFilter();
    }
  }, []);

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
                    Check Your Bookings
                  </a>
                </div>
                <div>
                  <div className="full my-5 mx-2 p-2 px-2 py-3 flex justify-center">
                    <Row gutter={10} align="center">
                      <Col lg={12} sm={24}>
                        <select
                          className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={(e) => {
                            setFilters({ ...filters, from: e.target.value });
                          }}
                        >
                          <option value="">From</option>
                          {cities.map((data, index) => {
                            return (
                              <option key={index} value={data.ville}>
                                {data.ville}
                              </option>
                            );
                          })}
                        </select>
                      </Col>
                      <Col lg={12} sm={24}>
                        <select
                          className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={(e) => {
                            setFilters({ ...filters, to: e.target.value });
                          }}
                        >
                          <option value="">To</option>
                          {cities.map((data, index) => {
                            return (
                              <option key={index} value={data.ville}>
                                {data.ville}
                              </option>
                            );
                          })}
                        </select>
                      </Col>
                      <Col lg={24} sm={24}>
                        <input
                          className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          min={new Date().toISOString().split("T")[0]}
                          type="date"
                          placeholder="Date"
                          onChange={(e) => {
                            setFilters({
                              ...filters,
                              journeyDate: e.target.value,
                            });
                          }}
                        />
                      </Col>
                      <Col lg={8} sm={24}>
                        <div className="flex justify-center gap-4">
                          <button
                            className="py-3 px-10 rounded-full bg-blue-600 hover:bg-blue-800 hover:duration-300 hover:shadow-xl text-white"
                            onClick={() => {
                              getBusesByFilter();
                            }}
                          >
                            Search
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="z-20">
                    <Row gutter={[15, 15]}>
                      {buses
                        .filter((bus) => {
                          if (
                            !filters.from &&
                            !filters.to &&
                            !filters.journeyDate
                          ) {
                            return (
                              bus.from === filters.from &&
                              bus.to === filters.to &&
                              bus.journeyDate === filters.journeyDate
                            );
                          } else {
                            return bus;
                          }
                        })
                        .map((bus, index) => {
                          return (
                            <Col key={index} lg={24} sm={24}>
                              <Bus bus={bus} />
                            </Col>
                          );
                        })}
                      {buses.length === 0 && (
                        <div className="flex justify-center w-full">
                          <h1 className="text-2xl font-bold text-gray-500">
                            No buses found
                          </h1>
                        </div>
                      )}
                    </Row>
                  </div>
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
