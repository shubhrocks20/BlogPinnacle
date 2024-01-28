import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../loginContext";
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios";

const MyBlogs = () => {

  
  const { user } = useContext(LoginContext);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/blogs/${user._id}`)
      .then((res) => setBlogs(res.data));
    

  }, [blogs]);

  const handleDelete =  async(index)=>{
    try{
      const res = await axios.delete(`http://localhost:5000/delete/${blogs[index]._id}`)
      console.log("Server Response:", res.data);
      setBlogs((prevBlogs) => prevBlogs.filter(blog => blog._id !== res.data._id));
    }
    catch(error){
      console.log("Error:", error);
    }
  }
  const handleUpdate = (index)=>{
    const local = blogs[index];
    navigate('/edit', {state: {local}})
  }
  const handleView = (index) => {
    const singleblog = blogs[index];
    navigate("/singleblog", { state: { singleblog } });
  };
  return (

    <section class="bg-white min-h-screen">
      {
        blogs.length ? (
      
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
        <h2
          class="mb-4 text-5xl  font-extrabold  "
        >
          Your Blog
        </h2>
        <p class="font-light text-gray-700 sm:text-xl dark:text-gray-700">
          We use an agile approach to test assumptions and connect with the
          needs of your audience early and often.
        </p>
      </div>
      <div class="grid gap-8 lg:grid-cols-2">
        {blogs.map((blog, index)=>(
           <article key={index}
           class="p-6 bg-white rounded-lg border border-gray-200 shadow-md bg-gray-800 border-gray-700"
         >
           <h2
             class="mb-2 text-2xl font-bold tracking-tight"
           >
             <h1 class=" mb-5 text-4xl">{blog.title}</h1>
           </h2>
           <p className={`mb-5 font-light  h-12 overflow-hidden `}>
               {blog.content}
           </p>
             <button
               
               class="inline-flex items-center font-medium  hover:underline"
               onClick={() => {
                handleView(index);
              }}
             >
               Read more
               <svg
                 class="ml-2 w-4 h-4"
                 fill="currentColor"
                 viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg"
               >
                 <path
                   fill-rule="evenodd"
                   d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                   clip-rule="evenodd"
                 ></path>
               </svg>
             </button>
             <div class="flex mt-6 justify-between">
                <button class="bg-blue-600 px-6 py-2 hover:bg-blue-800 rounded-md text-white font-medium" onClick={()=>handleUpdate(index)}>Edit</button>
                <button class="bg-red-600 px-6 py-2 hover:bg-red-800 rounded-md text-white font-medium" onClick={()=>{handleDelete(index)}}>Delete</button>
              </div>
          
         </article>

        ))}
       
        
      </div>
    </div>

        ):
        (
          <>
          <div className="p-16 mx-auto text-center flex flex-col items-center">
            <h1 className="text-center text-5xl mb-10 font-semibold">No Blogs </h1>
            <img src="\images\dustbin.jpeg" alt="" className="w-1/2 rounded-lg shadow-lg"/>
            <Link to="/user">
            <button className="rounded-md px-8 py-2 text-md bg-gray-700 text-white hover:bg-gray-900 my-6">Create New Blog</button>
            </Link>

          </div>
          </>
        )
}
  </section>
  );
};

export default MyBlogs;
