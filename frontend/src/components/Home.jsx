import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SpinnerLoader from "../utils/SpinnerLoader"; // Import SpinnerLoader component

const Home = () => {
  const { user } = useSelector((state) => state.reducer.login);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // State variable to track loading state
  const navigate = useNavigate();

  const handleView = (index) => {
    const singleblog = blogs[index];
    navigate("/singleblog", { state: { singleblog } });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/latest/blogs")
      .then((res) => res.data)
      .then((res) => {
        setBlogs(res);
        setLoading(false); // Set loading state to false when blogs data is fetched
      });
  }, []);

  return (
    <>
      <section className="hero  bg-gradient-to-b from-gray-100 to-gray-200 px-10 py-14 min-h-screen">
        <div className="main text-center mb-4">
          <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight ">
            <span>Welcome To</span>{" "}
            <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-400 to-purple-500 lg:inline">
              BlogPinnacle
            </span>
          </h1>
          <p className="px-0 mb-8 text-lg text-gray-600 md:text-xl lg:px-24">
            Start gaining the traction you've always wanted with our next-level
            templates and designs. Crafted to help you tell your story.
          </p>

          <Link to={user ? "/user" : "/login"}>
            <button className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-green-400 rounded-2xl sm:w-auto sm:mb-0">
              Get Started
              <svg
                className="w-4 h-4 ml-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </Link>
        </div>
        <hr className="my-12 border-t-2 border-blue-500 w-3/5 mx-auto" />
        <div className="latest-blogs">
          <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight text-center">
            <span>Here Are the</span>{" "}
            <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-blue-800 to-blue-500 lg:inline">
              Latest Blogs
            </span>
          </h1>
          {
            loading ? ( // Conditional rendering of SpinnerLoader component while loading
            <div className="flex items-center justify-center h-screen">
              <SpinnerLoader />
            </div>
          ):(<></>)
          }
            <div className="latest-blogs flex justify-around w-full">
              {blogs.map((blog, index) => (
                <div className="card bg-white p-4 rounded-lg shadow-md flex-1 mx-2" key={index}>
                  <img src={blog.image || "https://via.placeholder.com/500"} alt="Blog cover" className="w-full h-48 object-cover rounded-t-lg" />
                  <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
                  <p className="text-gray-800 text-lg h-28 overflow-hidden mb-2">{blog.content}</p>
                  <button
                    className="inline-flex items-center font-medium hover:underline"
                    onClick={() => {
                      handleView(index);
                    }}
                  >
                    Read more
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          
        </div>
      </section>
    </>
  );
};

export default Home;
