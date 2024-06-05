import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  CameraIcon,
  XCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/solid"; // Import solid icons from Heroicons
import SpinnerLoader from "../utils/SpinnerLoader";

const User = () => {
  const { user } = useSelector((state) => state.reducer.login);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    authorId: user._id,
    title: "",
    content: "",
    image: null,
  });
  const [imageName, setImageName] = useState("Upload Image");
  const [isSubmitting, setIsSubmitting] = useState(false); // New state variable

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set isSubmitting to true when form is submitted
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/post`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Post Submitted Successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setForm({ ...form, title: "", content: "", image: null });
      setImageName("Upload Image");
      setTimeout(() => {
        navigate("/myblogs");
      }, 2000);
    } catch (error) {
      toast.error(`Error while Saving Post: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsSubmitting(false); // Set isSubmitting back to false after form submission
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setForm({ ...form, image: e.target.files[0] });
      setImageName(e.target.files[0].name);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  return (
    <>
      <div className="min-h-screen p-6 text-gray-800 bg-gradient-to-br from-indigo-50 via-red-100 to-yellow-100">
        <ToastContainer />
        <div className="max-w-2xl mx-auto my-10 bg-white rounded-xl shadow-2xl">
          <h1 className="text-4xl font-bold text-center text-purple-700 py-4 lg:text-5xl">
            Welcome, {user.username}
          </h1>
          <div className="text-2xl font-semibold text-center text-gray-700 py-2">
            Create New Blog
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col p-6 space-y-4">
            <input
              className="p-4 bg-blue-50 border border-blue-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 shadow"
              spellCheck="false"
              placeholder="Title"
              type="text"
              name="title"
              required
              value={form.title}
              onChange={handleChange}
            />
            <textarea
              className="p-4 h-60 bg-blue-50 border border-blue-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 shadow"
              spellCheck="false"
              name="content"
              required
              value={form.content}
              onChange={handleChange}
              placeholder="Describe everything about the blog here"
            />
            <label className="flex items-center p-4 bg-blue-50 border border-blue-300 rounded-lg cursor-pointer hover:bg-blue-200 shadow">
              <CameraIcon className="w-6 h-6 mr-2 text-blue-600" />
              <span className="text-sm text-blue-600">{imageName}</span>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="hidden"
              />
            </label>
            {isSubmitting ? (
              <SpinnerLoader />
            ) : (
              <div className="flex justify-between space-x-4">
                <button
                  type="button"
                  className="flex items-center px-6 py-2 font-semibold text-white bg-red-500 rounded-full focus:outline-none focus:shadow-outline hover:bg-red-600 transition duration-300 ease-in-out"
                  onClick={() => {
                    setForm({ ...form, title: "", content: "", image: null });
                    setImageName("Upload Image");
                  }}
                >
                  <XCircleIcon className="w-5 h-5 mr-2" />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center px-6 py-2 font-semibold text-white bg-blue-500 rounded-full focus:outline-none focus:shadow-outline hover:bg-blue-600 transition duration-300 ease-in-out"
                >
                  <CheckCircleIcon className="w-5 h-5 mr-2" />
                  Post
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default User;
