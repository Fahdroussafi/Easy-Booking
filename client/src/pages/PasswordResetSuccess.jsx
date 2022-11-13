import React from "react";
import { Link } from "react-router-dom";

function PasswordResetSuccess() {
  return (
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
                Password Reset Successfully
              </h3>
              <p className="mt-2 max-w-[20rem] text-lg text-white/80">
                Your password has been reset successfully.
              </p>
              <Link to="/login">
                <button className="relative inline-flex items-center justify-start px-10 py-3 overflow-hidden font-bold rounded-full group">
                  <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
                  <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-gray-100 opacity-100 group-hover:-translate-x-8"></span>
                  <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-black">
                    Login
                  </span>
                  <span className="absolute inset-0 border-2 border-blue-600 rounded-full"></span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordResetSuccess;
