import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../helpers/axiosInstance";
import { message, Table } from "antd";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import PageTitle from "../components/PageTitle";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();

  const getBookings = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.get(
        `/api/bookings/${localStorage.getItem("user_id")}`,
        {}
      );
      dispatch(HideLoading());
      if (response.data.success) {
        const mappedData = response.data.data.map((booking) => {
          return {
            ...booking,
            ...booking.bus,
            ...booking.user,
            key: booking._id,
          };
        });
        setBookings(mappedData);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Bus Name",
      dataIndex: "name",
      key: "bus",
    },
    {
      title: "Bus Number",
      dataIndex: "busNumber",
      key: "bus",
    },
    {
      title: "Journey Date",
      dataIndex: "journeyDate",
    },
    {
      title: "Journey Time",
      dataIndex: "departure",
    },
    {
      title: "Seats",
      dataIndex: "seats",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div>
          <h1 className="underline text-base">Print Ticket</h1>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div>
      <PageTitle tt="Bookings" />
      <Table columns={columns} dataSource={bookings} />
    </div>
  );
}

export default Bookings;
