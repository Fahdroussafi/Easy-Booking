import React from "react";
import { Form, message } from "antd";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/alertsSlice";
import { Helmet } from "react-helmet";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/auth/login", values);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        localStorage.setItem("user_id", response.data.user._id);

        const idTrip = localStorage.getItem("idTrip");

        if (response.data.user.isAdmin === true) {
          navigate("/admin/buses");
        } else if (idTrip == null) {
          navigate("/bookings");
        } else if (idTrip !== null) {
          navigate(`/book-now/${idTrip}`);
        }
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Form onFinish={onFinish} className="h-screen flex">
        <div
          className="hidden lg:flex w-full lg:w-3/4"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://img5.goodfon.com/wallpaper/nbig/6/6a/temsa-maraton-coach-bus.jpg")`,
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex items-center h-full w-full px-20 bg-gray-900 bg-opacity-40"></div>
        </div>
        <div className="from-gray-50 to-blue-500 bg-gradient-to-r flex w-full lg:w-1/2 justify-center items-center space-y-8">
          <div className="w-3/4 px-8 md:px-32 lg:px-24">
            <div className="flex flex-col items-center mb-10">
              <Link
                to="/"
                className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-blue-600 transition duration-300 ease-out border-2 border-blue-600 rounded-full shadow-md group"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-600 group-hover:translate-x-0 ease">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-blue-600 transition-all duration-300 transform group-hover:translate-x-full ease">
                  Back
                </span>
                <span className="relative invisible">Button Text</span>
              </Link>
            </div>
            <h1 className="mb-8 text-5xl text-center font-bold italic">
              Login
            </h1>
            <Form.Item
              name="email"
              initialValue=""
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                  validateTrigger: "onSubmit",
                },
              ]}
            >
              <input
                type="email"
                className="block border-2 border-blue-700 w-full p-3 px-5 rounded-full mb-4"
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              initialValue=""
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                  min: 6,
                  validateTrigger: "onSubmit",
                },
              ]}
            >
              <input
                type="password"
                className="block border-2 border-blue-700 w-full p-3 px-5 rounded-full mb-4"
                placeholder="Password"
                autoComplete="off"
              />
            </Form.Item>
            <div className="flex justify-center mb-5">
              <button
                type="submit"
                className="relative inline-flex items-center justify-start
                px-10 py-3 overflow-hidden font-bold rounded-full
                group"
              >
                <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
                <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-blue-600 opacity-100 group-hover:-translate-x-8"></span>
                <span className="relative w-full text-left text-black transition-colors duration-200 ease-in-out group-hover:text-white">
                  Login
                </span>
                <span className="absolute inset-0 border-2 border-blue-600 rounded-full"></span>
              </button>
            </div>
            <p className="text-center text-base text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-700"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </Form>
    </>
  );
}

export default Login;
