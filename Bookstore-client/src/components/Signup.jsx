import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const { createUser, loginWithGoogle, setUser } = useContext(AuthContext);
  const { error, setError } = useState("error");

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleSignUp = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      let res = await axios.post(import.meta.env.VITE_BASE_SERVER_URL + "/register", {
        name: name,
        email: email,
        password: password
      });

      switch (res.data.status) {
        case 200:
          localStorage.setItem(
            "data",
            JSON.stringify({ name: res.data.name, jwtToken: res.data.jwtToken })
          );
          setUser({
            name: name,
            email: email,
            jwtToken: res.data.jwtToken}
            )
          navigate("/");
          break;
        case 403:
          toast.error("Invalid credential, Please Try again!");
          break;
        default:
          toast.error("Server Error, Please Try again later");
      }
    } catch(erro){
      toast.error("Something went wrong, Please Try again later.");
      console.log(erro);
    }
  };

  //sign up using google account
  const handleRegister = () => {
    loginWithGoogle()
      .then((result) => {
        // Signed up
        const user = result.user;
        alert("Signed up successfully!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        // ..
      });
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-blue-600 sm:text-3xl">
          Get started today
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
          sunt dolores deleniti inventore quaerat mollitia?
        </p>

        <form
          onSubmit={handleSignUp}
          action=""
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium">Create an account</p>

          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter Name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white"
          >
            Sign up
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account? &nbsp;
            <Link to="/login" className="underline text-blue-600" href="">
              Sign In
            </Link>
            &nbsp; here
          </p>

          <p className="text-center text-sm text-gray-500">OR</p>

          <button
            onClick={handleRegister}
            className="block w-full group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
          >
            <div className="relative flex items-center space-x-4 justify-center">
              <img
                src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                className="relative left-2 w-5"
                alt="google logo"
              />
              <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-1xl">
                Continue with Google
              </span>
            </div>
          </button>
        </form>
      </div>
      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default Signup;
