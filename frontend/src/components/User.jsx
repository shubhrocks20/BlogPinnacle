import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CameraIcon, XCircleIcon, CheckCircleIcon } from '@heroicons/react/solid'; // Import solid icons from Heroicons
import SpinnerLoader from '../utils/SpinnerLoader';

const User = () => {
  const { user } = useSelector((state) => state.reducer.login);
  const navigate = useNavigate();
  const [form, setForm] = useState({ authorId: user._id, title: '', content: '', image: null });
  const [imageName, setImageName] = useState('Upload Image');
  const [isSubmitting, setIsSubmitting] = useState(false); // New state variable

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set isSubmitting to true when form is submitted
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });
      const response = await axios.post('http://localhost:5000/post', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Post Submitted Successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setForm({ ...form, title: '', content: '', image: null });
      setImageName('Upload Image');
      setTimeout(() => {
        navigate('/myblogs');
      }, 2000);
    } catch (error) {
      toast.error(`Error while Saving Post: ${error.message}`, {
        position: 'top-right',
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
    if (name === 'image') {
      setForm({ ...form, image: e.target.files[0] });
      setImageName(e.target.files[0].name);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  return (
    <>
      <div className="p-6 text-gray-800 bg-gradient-to-b from-gray-50 to-gray-200">
        <ToastContainer />
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl">
          <h1 className="text-4xl font-semibold text-center text-blue-800 py-4">
            Welcome, {user.username}
          </h1>
          <div className="text-2xl font-bold text-center text-gray-700 py-2">
            Create New Blog
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col p-6">
            <input
              className="p-3 mb-4 bg-blue-50 border border-blue-300 rounded-md outline-none focus:ring-2 focus:ring-blue-300"
              spellCheck="false"
              placeholder="Title"
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
            <textarea
              className="p-3 h-60 mb-4 bg-blue-50 border border-blue-300 rounded-md outline-none focus:ring-2 focus:ring-blue-300"
              spellCheck="false"
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Describe everything about the blog here"
            />
            <label className="flex items-center p-3 mb-4 bg-blue-50 border border-blue-300 rounded-md cursor-pointer hover:bg-blue-100">
              <CameraIcon className="w-6 h-6 mr-2 text-blue-500" />
              <span className="text-sm text-blue-500">{imageName}</span>
              <input type="file" name="image" onChange={handleChange} className="hidden" />
            </label>
            {isSubmitting ? (
              <SpinnerLoader /> // Show spinner when submitting
            ) : (
              <div className="flex justify-between">
                <button
                  type="button"
                  className="flex items-center px-4 py-2 font-bold text-white bg-red-500 rounded focus:outline-none focus:shadow-outline hover:bg-red-700"
                  onClick={() => {
                    setForm({ ...form, title: '', content: '', image: null });
                    setImageName('Upload Image');
                  }}
                >
                  <XCircleIcon className="w-5 h-5 mr-2" />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 font-bold text-white bg-blue-500 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700"
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
