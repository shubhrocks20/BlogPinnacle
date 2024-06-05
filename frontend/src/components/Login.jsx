import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../store/loginSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(form);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/login`,
        JSON.stringify(form),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log(response);
        dispatch(addUser(response.data.user));

        // Use toast notification instead of alert
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 2000, // 2 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // navigate('/user');
        setTimeout(() => {
          navigate("/user");
        }, 2000);
        setForm({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      toast.error(`Failed Signing In: ${error.response.data.message}`, {
        position: "top-right",
        autoClose: 3000, // 1 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen flex flex-col justify-center items-center">
      <ToastContainer />
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden md:flex md:flex-row">
        <div className="md:w-1/2">
          <img
            src="/images/login.png"
            alt="Person using laptop"
            className="object-cover w-full  md:h-auto"
          />
        </div>
        <div className="p-8 md:w-1/2">
          <form class="form" onSubmit={handleLogin}>
            <h2 class="text-2xl md:text-4xl  mb-16 font-bold text-center">
              Sign In
            </h2>
            <div class="flex items-center mb-4">
              <label class="form-label" for="name">
                <img src="./images/email.png" alt="" class="w-4 me-2" />
              </label>
              <input
                class="form-input  outline-none text-md md:text-lg w-full  py-2 px-6 rounded-lg"
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                onChange={handleChange}
                value={form.email}
              />
            </div>
            <hr class="border-b-1 border-black mb-6" />
            <div class="mb-4 flex items-center">
              <label class="form-label" for="name">
                <img src="./images/padlock.png" alt="" class="w-4 me-2" />
              </label>
              <input
                class="form-input text-md md:text-lg outline-none w-full  py-2 px-6 rounded-lg"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={form.password}
              />
            </div>
            <hr class="border-b-1 border-black mb-7" />

            <button
              class="bg-blue-500 md:px-6  px-4 py-2 rounded-md text-white mt-4 md:mt-6"
              type="submit"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
