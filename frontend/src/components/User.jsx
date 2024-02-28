import React, {  useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const User = () => {
  const { user } = useSelector((state) => state.reducer.login);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    recordId: user._id,
    title: "",
    content: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/post",
        JSON.stringify(form),
        {
          headers: {
            "Content-Type": "application/json",
          },
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

      setForm({
        ...form,
        title: "",
        content: "",
      });
      setTimeout(() => {
        navigate('/myblogs')
        
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
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <>
      <div className="p-4 bg-white text-white max-h-full">
      <ToastContainer />
        <div className="p-4 shadow-lg rounded-lg w-3/5 mx-auto text-black">
          <h1 className="text-center text-4xl font-semibold mb-4">Welcome {user.username} </h1>

          <div className="heading text-center font-bold text-4xl mb-4">Create New Blog</div>
          <div className="editor mx-auto w-4/5 shadow rounded-lg flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl ">
            <input
              className="title bg-gray-100 rounded-md border border-gray-300 p-4 mb-4 outline-none"
              spellCheck="false"
              placeholder="Title"
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
            <textarea
              className="description bg-gray-100 sec p-4 h-60 border border-gray-300 outline-none rounded-md "
              spellCheck="false"
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Describe everything about the blog here"
            ></textarea>

            <div className="buttons flex mt-4 text-white">
              <div
                className="bg-red-500 hover:bg-red-800 px-5 py-2 rounded-md ms-4 cursor-pointer"
                onClick={() => {
                  setForm({
                    ...form,
                    title: "",
                    content: "",
                  });
                }}
              >
                Cancel
              </div>
              <div
                className="bg-blue-500 hover:bg-blue-800 px-5 py-2 rounded-md ms-4 cursor-pointer"
                onClick={handleSubmit}
              >
                Post
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default User;
