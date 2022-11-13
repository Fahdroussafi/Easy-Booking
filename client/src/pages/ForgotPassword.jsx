import React from "react";
import { Form, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
                      <div className="mt-5">
                        <button className="relative inline-flex items-center justify-start px-10 py-3 overflow-hidden font-bold rounded-full group">
                          <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
                          <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-gray-100 opacity-100 group-hover:translate-x-0"></span>
                          <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-black">
                            Send Reset Code
                          </span>
                          <span className="absolute inset-0 border-2 border-blue-600 rounded-full"></span>
                        </button>
                      </div>
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
