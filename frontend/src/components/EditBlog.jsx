import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowLeft } from  "react-icons/fa";
import SpinnerLoader from '../utils/SpinnerLoader';

const EditBlog = () => {
  const { user } = useSelector((state) => state.reducer.login);
  const location = useLocation();
  const navigate = useNavigate();
  const localstate = location.state?.singleblog || {};
  const [loading, setLoading] = useState(false);
  if (!location.state) {
    // If the state is not present, redirect the user to the home page
    return <Navigate to="/myblogs" />;
  }

  const [formData, setFormData] = useState({
    recordId: user._id,
    title: localstate.title || '',
    content: localstate.content || '',
    image: '',
  });

  const [showImageMessage, setShowImageMessage] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'image') {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
      
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'image' && formData[key] instanceof File) {
          formDataToSend.append(key, formData[key]);
        } else if (key !== 'image') {
          formDataToSend.append(key, formData[key]);
        }
      });

      const updating = await axios.patch(
        `https://doubtful-waders-ray.cyclic.app/blog/${localstate._id}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setLoading(false);
      toast.success('Blog post updated successfully!', {
        position: 'top-right',
        autoClose: 1000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate('/myblogs');
      }, 1000);
     
    } catch (error) {
      toast.error(`Post Failed To update Please Try Again! ${error.response.data.message}`, {
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
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-indigo-400">
      <ToastContainer />
      {loading && <SpinnerLoader />}
      <div className="container mx-auto p-8">
      <button
              onClick={() => navigate(-1)}
              className="text-gray-700  hover:text-gray-900 transition-colors flex items-center mb-4"
            >
              <FaArrowLeft className="mr-2 w-full" />
              Go Back
            </button>
        <div className="bg-white rounded-lg shadow-xl p-5 md:p-8 mb-6">
          <div className="text-center mb-6">
            <h1 className="font-bold text-3xl text-gray-900">
              Update Your Blog
            </h1>
            <p className="text-gray-600">
              Make changes to your blog post below.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="content"
              >
                Content
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="content"
                name="content"
                rows="4"
                value={formData.content}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="image"
              >
                Image
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="image"
                type="file"
                name="image"
                onChange={handleChange}
              />
              {showImageMessage && (
                <p className="text-gray-500 text-sm">
                  Caution⚠️: Choose an image only if you want to change the original image.
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update
              </button>
              <button
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                onClick={() => navigate('/myblogs')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default EditBlog;
