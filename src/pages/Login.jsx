import React from "react";
import Logo from "../assets/logo.svg";
import AppleIcon from "../assets/apple-icon.svg";
import GoogleIcon from "../assets/google-icon.svg";
import FaceBookIcon from "../assets/facebook-icon.svg";

import { Link } from "react-router";

const Login = () => {
  return (
    <div className="h-screen w-screen bg-[url('/src/assets/bg-img.jpg')] font-poppins">
      <div
        className="bg-gradient-to-br from-[rgba(33,33,33,0.839)] to-[rgba(66,66,66,0.239)] h-full w-full absolute z-0"
        aria-hidden="true"
      ></div>
      <div className="container mx-auto h-full z-10 relative grid grid-cols-1 lg:grid-cols-2">
        <div className="text-white lg:ps-20 hidden lg:flex lg:flex-col lg:h-100 lg:justify-center">
          <h1 className="text-4xl font-bold flex items-center gap-4 mb-24">
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

        <div className="flex justify-center">
          <div className="bg-white absolute bottom-0 p-8 rounded-t-2xl">
            <p className="uppercase text-[12px] font-normal tracking-wide">
              welcome back
            </p>
            <h3 className="text-2xl font-bold">Log in to your account</h3>
            <form className="pt-6 min-w-96" aria-label="Login form">
              <div className="flex flex-col gap-1 mb-4">
                <label
                  htmlFor="email"
                  className="text-sm font-light text-gray-800"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="p-2 outline-none border border-gray-300"
                  aria-required="true"
                  required
                />
              </div>
              <div className="flex flex-col gap-1 mb-3">
                <label
                  htmlFor="password"
                  className="text-sm font-light text-gray-800"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="p-2 outline-none border border-gray-300"
                  aria-required="true"
                  required
                />
              </div>
              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    className="w-5 h-5"
                  />
                  <label htmlFor="remember" className="text-sm">
                    Remember me
                  </label>
                </div>
                <Link to="/" className="text-sm font-normal">
                  Forget Password
                </Link>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="bg-red-600 py-3 w-full text-white rounded-md font-semibold text-base hover:bg-transparent transition duration-300 hover:text-red-600 border-2 border-red-600"
                  aria-label="Log in"
                >
                  Log In
                </button>
              </div>

              <div className="py-7 relative">
                <hr aria-hidden="true" />
                <p className="bg-white px-4 text-center text-black absolute top-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                  or
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  className="grid grid-cols-[1fr_4fr] items-center py-3 rounded hover:bg-gray-50 border px-10 place-content-center text-sm text-gray-800"
                  aria-label="Log in with Google"
                >
                  <img src={GoogleIcon} alt="Google Icon" />
                  Log In with Google
                </button>
                <button
                  className="grid grid-cols-[1fr_4fr] items-center py-3 rounded hover:bg-gray-50 border px-10 place-content-center text-sm text-gray-800"
                  aria-label="Log in with Facebook"
                >
                  <img src={FaceBookIcon} alt="Facebook Icon" />
                  Log In with Facebook
                </button>
                <button
                  className="grid grid-cols-[1fr_4fr] items-center py-3 rounded hover:bg-gray-50 border px-10 place-content-center text-sm text-gray-800"
                  aria-label="Log in with Apple"
                >
                  <img src={AppleIcon} alt="Apple Icon" />
                  Log In with Apple
                </button>
              </div>

              <p className="text-sm mt-6 text-center">
                New User?{" "}
                <Link
                  to="/register"
                  className="font-semibold underline uppercase"
                >
                  sign up here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
