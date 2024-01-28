import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [form, setForm] = useState({
    username: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    try {
       response = await axios.post(
        'http://localhost:5000/register',
        JSON.stringify(form),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Use toast notification instead of alert
      toast.success('Registration successful! You can now log in.', {
        position: 'top-right',
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Reset the form fields to empty
      setForm({
        username: '',
        email: '',
        password: '',
      });

      // Navigate to the login page after successful registration
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      // Handle registration failure
      toast.error(`Registration failed. ${error.response.data.message}`, {
        position: 'top-right',
        autoClose: 5000, // 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <div className="container mx-auto  p-20 min-h-screen">
        <ToastContainer />
        <div className="grid grid-cols-2 gap-x-2">
          <div className="ms-16">
            <form className="form" onSubmit={handleSubmit}>
              <h2 className="text-4xl mb-10 font-bold">Sign up</h2>
              <div className="mb-2 flex items-center">
                <label className="form-label" htmlFor="name">
                  <img src="./images/user.png" alt="" className="w-4 me-5" />
                </label>
                <input
                  className="form-input outline-none text-lg w-full  py-2 px-6 rounded-lg"
                  name="username"
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  onChange={handleChange}
                  value={form.username}
                />
              </div>
              <hr className="border-b border-black mb-7" />
              <div className="mb-2 flex items-center">
                <label className="form-label" htmlFor="name">
                  <img src="./images/email.png" alt="" className="w-4 me-5" />
                </label>
                <input
                  className="form-input outline-none text-lg w-full  py-2 px-6 rounded-lg"
                  name="email"
                  type="email"
                  id="name"
                  placeholder="Your Email"
                  onChange={handleChange}
                  value={form.email}
                />
              </div>
              <hr className="border-b border-black mb-7" />
              <div className="mb-2 flex items-center">
                <label className="form-label" htmlFor="name">
                  <img src="./images/padlock.png" alt="" className="w-4 me-5" />
                </label>
                <input
                  className="form-input outline-none text-lg w-full  py-2 px-6 rounded-lg"
                  name="password"
                  type="password"
                  id="name"
                  placeholder="Password"
                  onChange={handleChange}
                  value={form.password}
                />
              </div>
            
              
              <hr className="border-b border-black mb-7" />
              <button
                className="bg-blue-500 px-5 py-2 rounded-md text-white mt-6"
                type="submit"
              >
                Sign Up
              </button>
            </form>
          </div>
          <div>
            <div className="ms-10 flex flex-col items-center">
              <img src="/images/signup.jpeg" alt="Workspace" className="w-3/5 rounded-lg shadow-lg" />
            </div>
            <div className="text-center mt-20">
              <p className="text-md text-black cursor-pointer underline ms-16">
                <Link to="/login">
                I am already a member
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
