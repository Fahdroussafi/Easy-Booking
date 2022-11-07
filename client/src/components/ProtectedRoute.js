import React, { useCallback, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { SetUser } from "../redux/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/alertsSlice";
import DefaultLayout from "./DefaultLayout";

function ProtectedRoute({ children }) {
  const user_id = localStorage.getItem("user_id");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const validateToken = useCallback(async () => {
    try {
      dispatch(ShowLoading());

      const response = await axios.get(
        `/api/users/${user_id} `,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        dispatch(SetUser(response.data.data));
      } else {
        localStorage.removeItem("user_id");
        localStorage.removeItem("token");
        message.error(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      localStorage.removeItem("user_id");
      localStorage.removeItem("token");
      message.error(error.message);
      dispatch(HideLoading());
      navigate("/login");
    }
  }, [dispatch, navigate, user_id]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
    }
  }, [navigate, validateToken]);

  return <div>{user && <DefaultLayout>{children}</DefaultLayout>}</div>;
}

export default ProtectedRoute;
