import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../../helpers/axiosInstance";
import { message, Table, Modal } from "antd";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import PageTitle from "../../components/PageTitle";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import logo from "../../assets/img/logo.png";
import { Helmet } from "react-helmet";

function AdminBookings() {
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();

  const getBookings = useCallback(async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.get(
        `/api/bookings/get-all-bookings`,
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
            user: booking.user.name,
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
  }, [dispatch]);

  const CancelBooking = async () => {
    try {
      dispatch(ShowLoading());
      const res = await axiosInstance.get(
        `/api/bookings/${localStorage.getItem("user_id")}`
      );
      const bus_id = res.data.data[0].bus._id;
      const user_id = res.data.data[0].user._id;
      const booking_id = res.data.data[0]._id;
      const response = await axiosInstance.delete(
        `/api/bookings/${booking_id}/${user_id}/${bus_id}`,
        {}
      );
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        getBookings();
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
      title: "Full Name",
      dataIndex: "user",
      key: "user",
    },

    {
      title: "Bus Number",
      dataIndex: "busNumber",
      key: "bus",
    },
    {
      title: "Journey Date",
      dataIndex: "journeyDate",
      render: (journeyDate) => moment(journeyDate).format("DD/MM/YYYY"),
    },
    {
      title: "Journey Time",
      dataIndex: "departure",
    },
    {
      title: "Seats",
      dataIndex: "seats",
      render: (seats) => seats.join(", "),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <button
            className="underline text-base text-gray-700 cursor-pointer hover:text-black duration-300"
            onClick={() => {
              setSelectedBooking(record);
              setShowPrintModal(true);
            }}
          >
            View
          </button>
          <button
            className="underline text-base text-gray-700 cursor-pointer hover:text-black duration-300"
            onClick={() => {
              CancelBooking();
            }}
          >
            Cancel
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getBookings();
  }, [getBookings]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <Helmet>
        <title>User Bookings</title>
      </Helmet>
      <div className="p-5">
        <PageTitle title="Bookings" />
        <Table columns={columns} dataSource={bookings} />

        {showPrintModal && (
          <Modal
            title="Print Ticket"
            onCancel={() => {
              setShowPrintModal(false);
              selectedBooking(null);
            }}
            open={showPrintModal}
            okText="Print"
            onOk={handlePrint}
            // onCancel={() => setShowPrintModal(false)}
          >
            <div className="p-5" ref={componentRef}>
              <img src={logo} alt="logo" className="w-20" />
              <p className="text-lg ">
                <span className="text-lg font-bold text-blue-500">
                  {selectedBooking?.name}
                </span>
              </p>
              <div className="flex flex-col p-5 text-left">
                <p className="text-lg  ">
                  <span className="text-lg font-bold">Full Name:</span>{" "}
                  {selectedBooking?.user}
                </p>

                <p className="text-lg font-bold ">
                  {selectedBooking?.from} - {selectedBooking?.to}
                </p>
                <hr />
                <p className="text-lg">
                  <span className="text-lg font-bold">Date: </span>
                  {moment(selectedBooking?.journeyDate).format("DD/MM/YYYY")}
                </p>
                <p className="text-lg">
                  <span className="text-lg font-bold">Departure Time:</span>{" "}
                  {selectedBooking?.departure}
                </p>
                <p className="text-lg ">
                  <span className="text-lg font-bold">Arrival Time:</span>{" "}
                  {selectedBooking?.arrival}
                </p>

                <p className="text-lg mt-3">
                  <span className="text-lg font-bold">Seat Numbers:</span>
                  <hr />
                  {selectedBooking?.seats.join(", ")}
                </p>

                <p className="text-lg mt-3">
                  <span className="text-lg font-bold">Amount: </span>
                  <hr />
                  {selectedBooking?.price * selectedBooking?.seats.length} Dh
                </p>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}

export default AdminBookings;
