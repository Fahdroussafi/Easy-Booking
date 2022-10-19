import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import Bus from "../components/Bus";
import { Row, Col, message } from "antd";

function Home() {
  const dispatch = useDispatch();
  const [buses, setBuses] = useState([]);
  const { user } = useSelector((state) => state.users);

  const getBuses = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.get("/api/buses/get-all-buses", {});
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
    getBuses();
  }, []);
  return (
    <div>
      <div></div>
      <div>
        <Row>
          {buses.map((bus) => (
            <Col lg={12} xs={24} sm={24}>
              <Bus bus={bus} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Home;
