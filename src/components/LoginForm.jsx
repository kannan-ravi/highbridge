import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import AppleIcon from "../assets/apple-icon.svg";
import GoogleIcon from "../assets/google-icon.svg";
import FaceBookIcon from "../assets/facebook-icon.svg";

const LoginForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEmailLogin = async (e) => {
    console.log(login)
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, login.email, login.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-white p-8 rounded-t-2xl lg:absolute lg:bottom-0">
      <p className="uppercase text-[12px] font-normal tracking-wide">
        welcome back
      </p>
      <h3 className="text-2xl font-bold">Log in to your account</h3>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <form
        className="pt-6 w-full sm:min-w-96"
        aria-label="Login form"
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
            value={login.email}
            onChange={handleOnChange}
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
            value={login.password}
            onChange={handleOnChange}
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
          <Link to="/forgot-password" className="text-sm font-normal">
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
            type="button"
            className="grid grid-cols-[1fr_4fr] items-center py-3 rounded hover:bg-gray-50 border px-10 place-content-center text-sm text-gray-800"
            aria-label="Log in with Google"
          >
            <img src={GoogleIcon} alt="Google Icon" />
            Log In with Google
          </button>
          <button
            type="button"
            className="grid grid-cols-[1fr_4fr] items-center py-3 rounded hover:bg-gray-50 border px-10 place-content-center text-sm text-gray-800"
            aria-label="Log in with Facebook"
          >
            <img src={FaceBookIcon} alt="Facebook Icon" />
            Log In with Facebook
          </button>
          <button
            type="button"
            className="grid grid-cols-[1fr_4fr] items-center py-3 rounded hover:bg-gray-50 border px-10 place-content-center text-sm text-gray-800"
            aria-label="Log in with Apple"
          >
            <img src={AppleIcon} alt="Apple Icon" />
            Log In with Apple
          </button>
        </div>

        <p className="text-sm mt-6 text-center">
          New User?{" "}
          <Link to="/register" className="font-semibold underline uppercase">
            sign up here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
