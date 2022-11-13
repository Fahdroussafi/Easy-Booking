import React from "react";
import { Form, message } from "antd";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/alertsSlice";
import { Helmet } from "react-helmet";

function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/auth/requestPasswordReset",
        values
      );
      if (response.status === 200) {
        dispatch(HideLoading());
        message.success("Email Sent Successfully Please Check Your Email");
        navigate("/email-sent");
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.response.data.message);
    }
  };
  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      {/* <Form onFinish={onFinish} classNameName="h-screen flex">
        <div classNameName="from-gray-50 to-blue-500 bg-gradient-to-r flex w-full lg:w-full justify-center items-center space-y-8">
          <div classNameName=" px-8 md:px-32 lg:px-24">
            <div classNameName="flex flex-col items-center mb-10">
              <Link
                to="/login"
                classNameName="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-blue-600 transition duration-300 ease-out border-2 border-blue-600 rounded-full shadow-md group"
              >
                <span classNameName="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-600 group-hover:translate-x-0 ease">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    classNameName="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </span>
                <span classNameName="absolute flex items-center justify-center w-full h-full text-blue-600 transition-all duration-300 transform group-hover:translate-x-full ease">
                  Back
                </span>
                <span classNameName="relative invisible">Button Text</span>
              </Link>
            </div>
            <h1 classNameName="mb-8 text-5xl text-center font-bold italic">
              Reset Password
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
              <div classNameName="relative z-0 mb-6 w-full group">
                <input
                  type="email"
                  name="floating_email"
                  classNameName="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-black dark:border-blue-500 dark:focus:border-blue-700 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_email"
                  classNameName="absolute text-sm text-gray-500 dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
              </div>
            </Form.Item>

            <div classNameName="flex justify-center mb-5">
              <button
                type="submit"
                classNameName="relative inline-flex items-center justify-start
                px-10 py-3 overflow-hidden font-bold rounded-full
                group"
              >
                <span classNameName="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
                <span classNameName="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-blue-600 opacity-100 group-hover:translate-x-0"></span>
                <span classNameName="relative w-full text-left text-black transition-colors duration-200 ease-in-out group-hover:text-white">
                  Send Reset Code
                </span>
                <span classNameName="absolute inset-0 border-2 border-blue-600 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </Form> */}

      <Form onFinish={onFinish} classNameName="h-screen flex ">
        <div className="from-gray-50 to-blue-500 bg-gradient-to-r h-screen flex items-center justify-center p-12 py-6">
          <div className="mx-auto w-full max-w-screen-lg bg-blue-700 px-5 py-10 rounded-full">
            <div className="grid gap-5 md:grid-cols-2 md:gap-10 lg:gap-20">
              <div className="flex justify-center md:justify-end">
                <img
                  className="w-full max-w-sm"
                  src="https://ouch-cdn2.icons8.com/sKnF2PmYhkmP28DzIm6KqWSknT03UVWjg3FLlGYIOp4/rs:fit:684:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvOTI3/L2U4OWQ2NmZiLTg0/NzEtNDc3NS1hNTA0/LTMwNWRiYmJkNzg0/MC5zdmc.png"
                  alt="Marketing newsletter via computer Illustration in PNG, SVG"
                />
              </div>
              <div className="flex items-center">
                <div className="mx-auto md:mx-0">
                  <h3 className="text-4xl font-bold text-white">
                    Reset Password
                  </h3>
                  <p className="mt-2 max-w-[20rem] text-lg text-white/80">
                    Enter your email address and we'll send you a link to reset
                    your password.
                  </p>
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
                    <div className="mt-4 flex flex-col">
                      <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        className="w-full rounded border border-white/50 bg-transparent px-3 py-2 text-white placeholder:text-white/50 md:max-w-[18rem]"
                      />
                      <button
                        type="submit"
                        className="mt-4 w-full max-w-[14rem] rounded bg-white/30 px-14 py-2 text-center text-white"
                      >
                        Send Reset Code
                      </button>
                    </div>
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
}

export default ForgotPassword;
