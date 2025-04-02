import React from "react";
import Logo from "../assets/logo.svg";

import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="relative">
      <div className="h-full w-full bg-[url('/src/assets/bg-img.jpg')] font-poppins bg-no-repeat bg-cover fixed top-0 left-0"></div>
      <div
        className="bg-gradient-to-br from-[rgba(33,33,33,0.839)] to-[rgba(66,66,66,0.239)] h-full w-full absolute z-0"
        aria-hidden="true"
      ></div>
      <div className="container mx-auto min-h-screen h-full z-10 relative grid grid-cols-1 lg:grid-cols-2">
        <div className="text-white pt-20 pb-10 px-6 lg:ps-20 flex flex-col lg:h-100 lg:justify-center">
          <h1 className="text-4xl font-bold flex items-center gap-4 mb-10 lg:mb-24">
            <img src={Logo} alt="Logo for HighBridge" />
            <span>HighBridge</span>
          </h1>

          <h2 className="text-3xl font-semibold mb-6">
            Building the Future...
          </h2>
          <p className="max-w-sm font-light text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="flex justify-center px-2 sm:px-0 lg:min-h-[750px]">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
