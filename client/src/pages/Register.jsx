import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/alertsSlice";
import { Helmet } from "react-helmet";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/auth/create-user", values);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/login");
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
        <title>Register</title>
      </Helmet>
      <Form onFinish={onFinish}>
        <div className="h-screen flex">
          <div
            className="hidden lg:flex w-full lg:w-3/4"
            style={{
              backgroundSize: "cover",
              backgroundImage: `url("https://wallpapercave.com/wp/wp6913872.jpg")`,
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
                Register
              </h1>
              <Form.Item
                name="name"
                initialValue=""
                rules={[
                  {
                    required: true,
                    message: "Please input your fullname!",
                    validateTrigger: "onSubmit",
                    validateFirst: true,
                  },
                ]}
              >
               <div className="relative z-0 mb-6 w-full group">
                <input
                  type="text"
                  name="floating_fullname"
                  id="floating_fullname"
                  className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-blue-500 dark:focus:border-blue-700 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="floating_fullname"
                  className="absolute text-sm text-gray-500 dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Full Name
                </label>
              </div>
              </Form.Item>

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
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="email"
                    name="floating_email"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-black dark:border-blue-500 dark:focus:border-blue-700 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="floating_email"
                    className="absolute text-sm text-gray-500 dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Email address
                  </label>
                </div>
              </Form.Item>

              <Form.Item
                name="password"
                initialValue=""
                rules={[
                  {
                    required: true,
                    message:
                      "Password must be at least 6 characters! and must contain at least one uppercase letter, one lowercase letter and one number",
                    min: 6,
                    // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                    validateTrigger: "onSubmit",
                  },
                ]}
              >
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="password"
                    name="floating_password"
                    id="floating_password"
                    className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-blue-500 dark:focus:border-blue-700 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="floating_password"
                    className="absolute text-sm text-gray-500 dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Password
                  </label>
                </div>
              </Form.Item>
              <div className="flex justify-center mb-5">
                <button
                  type="submit"
                  className="relative inline-flex items-center justify-start
                  px-8 py-3 overflow-hidden font-bold rounded-full
                  group"
                >
                  <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
                  <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-blue-600 opacity-100 group-hover:-translate-x-8"></span>
                  <span className="relative w-full text-left text-black transition-colors duration-200 ease-in-out group-hover:text-white">
                    Create Account
                  </span>
                  <span className="absolute inset-0 border-2 border-blue-600 rounded-full"></span>
                </button>
              </div>
              <p className="text-center text-base text-gray-600 mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:text-blue-700">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
}

export default Register;
