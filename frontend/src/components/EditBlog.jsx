import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../loginContext";
import axios from "axios";

const EditBlog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(LoginContext);
  // Access the state from the previous component
  const localstate = location.state?.local || {};
  const [formData, setFormData] = useState({
    recordId: user._id,
    title: localstate.title || '',
    content: localstate.content || ''
  });
  const handleChange = (e)=>{
    const {name, value} = e.target;
    setFormData({
        ...formData,
        [name]:value,
    })
    
  }

  const handleSubmit = async()=>{
    try{
        const updating = await axios.patch(`http://localhost:5000/blog/${localstate._id}`,JSON.stringify(formData),{
            headers: {
                "Content-Type":"application/json"
            }
        })
        if(!updating){
            alert('Post Failed To update Please Try Again!');
        }
        navigate('/myblogs');
    }
    catch(error){
        console.log('Error:', error);
    }
  }
  return (
    <>
      <div className="p-4 bg-white text-white max-h-full">
        <div className="p-4 shadow-lg rounded-lg w-3/5 mx-auto text-black">
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            viewBox="0 0 448 512"
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
        </button>
          <h1 className="text-center text-4xl font-semibold mb-4">Welcome Lokesh </h1>

          <div className="heading text-center font-bold text-4xl mb-4">Update the Blog</div>
          <div className="editor mx-auto w-4/5 shadow rounded-lg flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl ">
            <input
              className="title bg-gray-100 rounded-md border border-gray-300 p-4 mb-4 outline-none"
              spellCheck="false"
              placeholder="Title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <textarea
              className="description bg-gray-100 sec p-4 h-60 border border-gray-300 outline-none rounded-md "
              spellCheck="false"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Describe everything about the blog here"
            ></textarea>

            <div className="buttons flex mt-4 text-white">
              <div className="bg-red-500 hover:bg-red-800 px-5 py-2 rounded-md ms-4 cursor-pointer" onClick={()=>{
                navigate('/myblogs');
              }}>Cancel</div>
              <div className="bg-blue-500 hover:bg-blue-800 px-5 py-2 rounded-md ms-4 cursor-pointer" onClick={handleSubmit}>
                Update
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBlog;
