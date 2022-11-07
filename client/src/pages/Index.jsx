import "../assets/style/index.css";
import logo from "../assets/img/logo.png";
import { Helmet } from "react-helmet";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import Bus from "../components/Bus";
import { Row, Col, message } from "antd";

function Index() {
  const dispatch = useDispatch();
  const [buses, setBuses] = useState([]);
  const [cities, setCities] = useState([]);
  // const { user } = useSelector((state) => state.users);
  const [filters, setFilters] = useState({});

  const getBusesByFilter = useCallback(async () => {
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
  }, [filters, dispatch]);

  const getBuses = useCallback(async () => {
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
  }, [dispatch]);

  useEffect(() => {
    axiosInstance.get("/api/cities/get-all-cities").then((response) => {
      setCities(response.data.data);
    });
  }, []);

  useCallback(() => {
    if (filters.from && filters.to && filters.journeyDate) {
      getBuses();
    } else {
      getBusesByFilter();
    }
  }, [
    filters.from,
    filters.to,
    filters.journeyDate,
    getBuses,
    getBusesByFilter,
  ]);

  return (
    <>
      <Helmet>
        <title>Easy-Booking</title>
      </Helmet>
      <div className="h-screen flex bg-gray-900">
        <div
          className="hero min-h-screen lg:flex w-full lg:w-3/4"
          style={{
            backgroundImage: `url("https://cdn.dribbble.com/users/1976094/screenshots/4687414/buss_trvl.gif")`,
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="flex items-center h-full w-full">
            <div className="h-screen overflow-auto overflow-x-hidden">
              <div className="bg-opacity-80">
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
                        <Col key={index} lg={8} sm={24}>
                          <Bus bus={bus} />
                        </Col>
                      );
                    })}
                </Row>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md ">
            <div className="flex justify-center">
              <img
                className=" text-center w-20 h-20 rounded-full"
                src={logo}
                alt="logo"
              />
            </div>

            <h1 className="mb-5 text-5xl text-white font-bold ">
              Easy-Booking
            </h1>
            <p className="mb-5 text-xl text-white">
              is a platform that allows you to book your bus tickets online and
              in a very easy way.
            </p>
            <button className="block w-full bg-blue-600 mt-4 py-2 rounded-2xl hover:bg-blue-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
              Check your bookings now
            </button>

            <div className="w-full my-5 mx-2 p-2 px-2 py-3 flex justify-center">
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
                <div className="flex justify-center gap-4 mt-5 w-full">
                  {buses.length === 0 && (
                    <div className="text-center text-white text-2xl">
                      No buses found
                    </div>
                  )}
                </div>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
