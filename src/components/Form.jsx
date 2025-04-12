import { useState } from "react";
import { Link } from "react-router";

import AppleIcon from "../assets/apple-icon.svg";
import GoogleIcon from "../assets/google-icon.svg";
import FaceBookIcon from "../assets/facebook-icon.svg";
import { useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Form = (props) => {
  const { status, error } = useSelector((state) => state.auth);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    await props.onSubmit(inputValue);
  };

  return (
    <div className="p-8 bg-white rounded-t-2xl lg:absolute lg:bottom-0">
      <p className="uppercase text-[12px] font-normal tracking-wide">
        welcome {props.type === "login" ? "back" : ""}
      </p>
      <h3 className="text-2xl font-bold capitalize">{props.type} to your account</h3>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      <form
        className="w-full pt-6 sm:min-w-96"
        aria-label="login form"
        onSubmit={handleEmailLogin}
      >
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="email" className="text-sm font-light text-gray-800">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={inputValue.email}
            onChange={handleOnChange}
            className="p-2 border border-gray-300 outline-none"
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
          <div className="relative flex">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="password"
              value={inputValue.password}
              onChange={handleOnChange}
              className="w-full p-2 border border-gray-300 outline-none"
              aria-required="true"
              required
            />
            {passwordVisible ? (
              <FaEye
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute transform -translate-y-1/2 cursor-pointer right-2 top-1/2"
              />
            ) : (
              <FaEyeSlash
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute transform -translate-y-1/2 cursor-pointer right-2 top-1/2"
              />
            )}
          </div>
        </div>

        {props.type === "login" && (
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
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
            <Link to="/forgot-password" className="text-sm font-normal">
              Forget Password
            </Link>
          </div>
        )}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-3 text-base font-semibold text-white capitalize transition duration-300 bg-red-600 border-2 border-red-600 rounded-md hover:bg-transparent hover:text-red-600"
            aria-label={props.type}
          >
            {status === "loading" ? "Loading..." : props.type}
          </button>
        </div>

        <div className="relative py-7">
          <hr aria-hidden="true" />
          <p className="absolute top-0 px-4 text-center text-black -translate-x-1/2 translate-y-1/2 bg-white left-1/2">
            or
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="capitalize grid grid-cols-[1fr_4fr] items-center py-3 rounded hover:bg-gray-50 border px-10 place-content-center text-sm text-gray-800"
            aria-label={`${props.type} with Google`}
          >
            <img src={GoogleIcon} alt="Google Icon" />
            {props.type} with Google
          </button>
          <button
            type="button"
            className="capitalize grid grid-cols-[1fr_4fr] items-center py-3 rounded hover:bg-gray-50 border px-10 place-content-center text-sm text-gray-800"
            aria-label={`${props.type} with Facebook`}
          >
            <img src={FaceBookIcon} alt="Facebook Icon" />
            {props.type} with Facebook
          </button>
          <button
            type="button"
            className="capitalize grid grid-cols-[1fr_4fr] items-center py-3 rounded hover:bg-gray-50 border px-10 place-content-center text-sm text-gray-800"
            aria-label={`${props.type} with Apple`}
          >
            <img src={AppleIcon} alt="Apple Icon" />
            {props.type} with Apple
          </button>
        </div>

        <p className="mt-6 text-sm text-center">
          New User?{" "}
          <Link to="/register" className="font-semibold underline uppercase">
            {props.type === "login" ? "sign-up" : "sign-in"} here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Form;
