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
                <input
                  type="text"
                  className="block border-2 border-blue-700 w-full p-3 px-5 rounded-full mb-4"
                  placeholder="Fullname"
                />
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
                    message:
                      "Password must be at least 6 characters! and must contain at least one uppercase letter, one lowercase letter and one number",
                    min: 6,
                    // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
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
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                >
                  Create Account
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
