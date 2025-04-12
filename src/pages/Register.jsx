import React, { useState } from "react";
import Logo from "../assets/logo.svg";

import From from "../components/Form";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../app/features/authSlice";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEmailRegister = async (register) => {
    dispatch(loginStart());
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        register.email,
        register.password
      );
      dispatch(
        loginSuccess({
          uuid: userCredential.user.uid,
          name: userCredential.user.displayName,
          email: userCredential.user.email,
        })
      );
      navigate("/");
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
  return (
    <div className="relative">
      <div className="h-full w-full bg-[url('/src/assets/bg-img.jpg')] font-poppins bg-no-repeat bg-cover fixed top-0 left-0"></div>
      <div
        className="bg-gradient-to-br from-[rgba(33,33,33,0.839)] to-[rgba(66,66,66,0.239)] h-full w-full absolute z-0"
        aria-hidden="true"
      ></div>
      <div className="container relative z-10 grid h-full min-h-screen grid-cols-1 mx-auto lg:grid-cols-2">
        <div className="flex flex-col px-6 pt-20 pb-10 text-white lg:ps-20 lg:h-100 lg:justify-center">
          <h1 className="flex items-center gap-4 mb-10 text-4xl font-bold lg:mb-24">
            <img src={Logo} alt="Logo for HighBridge" />
            <span>HighBridge</span>
          </h1>

          <h2 className="mb-6 text-3xl font-semibold">
            Building the Future...
          </h2>
          <p className="max-w-sm text-sm font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="flex justify-center px-2 sm:px-0 lg:min-h-[750px]">
          <From type="register" onSubmit={handleEmailRegister} />
        </div>
      </div>
    </div>
  );
};

export default Register;
