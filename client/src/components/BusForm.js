import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Modal, Row, Form, Col, message } from "antd";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";

function BusForm({
  showBusForm,
  setShowBusForm,
  type = "add",
  getData,
  selectedBus,
  setSelectedBus,
}) {
  const dispatch = useDispatch();
  const [cities, setCities] = useState([]);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;
      if (type === "add") {
        response = await axiosInstance.post("/api/buses/add-bus", values);
      } else {
        response = await axiosInstance.put(
          `/api/buses/${selectedBus._id}`,
          values
        );
      }
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
      getData();
      setShowBusForm(false);
      setSelectedBus(null);
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    axiosInstance.get("/api/cities/get-all-cities").then((response) => {
      setCities(response.data.data);
    });
  }, []);

  return (
    <Modal
      width={800}
      title={type === "add" ? "Add Bus" : "Update Bus"}
      visible={showBusForm}
      onCancel={() => {
        setSelectedBus(null);
        setShowBusForm(false);
      }}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} initialValues={selectedBus}>
        <Row gutter={[10, 10]}>
          <Col lg={24} xs={24}>
            <Form.Item label="Bus Name" name="name">
              <input
                type="text"
                className="block border border-blue-500 w-full p-3 rounded-lg mb-4"
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Bus Number" name="busNumber">
              <input
                type="text"
                className="block border border-blue-500 w-full p-3 rounded-lg mb-4"
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Capacity" name="capacity">
              <input
                type="number"
                className="block border border-blue-500 w-full p-3 rounded-lg mb-4"
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="From" name="from">
              <select className="block border border-blue-500 w-full p-3 rounded-lg mb-4">
                <option value="">From</option>
                {cities.map((data, index) => {
                  return (
                    <option key={index} value={data.ville}>
                      {data.ville}
                    </option>
                  );
                })}
              </select>
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="To" name="to">
              <select className="block border border-blue-500 w-full p-3 rounded-lg mb-4">
                <option value="">To</option>
                {cities.map((data, index) => {
                  return (
                    <option key={index} value={data.ville}>
                      {data.ville}
                    </option>
                  );
                })}
              </select>
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Journey Date" name="journeyDate">
              <input
                min={new Date().toISOString().split("T")[0]}
                type="date"
                className="block border border-blue-500 w-full p-3 rounded-lg mb-4"
              />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Departure" name="departure">
              <input
                type="time"
                className="block border border-blue-500 w-full p-3 rounded-lg mb-4"
              />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Arrival" name="arrival">
              <input
                type="time"
                className="block border border-blue-500 w-full p-3 rounded-lg mb-4"
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Price" name="price">
              <input
                type="number"
                className="block border border-blue-500 w-full p-3 rounded-lg mb-4"
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Status" name="status">
              <select
                className="block border border-blue-500 w-full p-3 rounded-lg mb-4"
                name=""
                id=""
              >
                <option value="Yet to start">Yet To Start</option>
                <option value="Running">Running</option>
                <option value="Completed">Completed</option>
              </select>
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-primary bg-blue-600 hover:bg-blue-800"
          >
            Save
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default BusForm;
