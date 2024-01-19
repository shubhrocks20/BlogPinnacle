import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/posts").then((res) => setBlogs(res.data));
  }, []);

  const handleView = (index) => {
    const singleblog = blogs[index];
    navigate("/singleblog", { state: { singleblog } });
  };

  return (
    <section className="bg-white min-h-screen">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-5xl font-extrabold">Our Blog</h2>
          <p className="font-light text-gray-700 sm:text-xl dark:text-gray-700">
            We use an agile approach to test assumptions and connect with the
            needs of your audience early and often.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {blogs.map((blog, index) => (
            <article
              key={index}
              className="p-6 bg-white rounded-lg border border-gray-200 shadow-md bg-gray-800 border-gray-700"
            >
              <h2 className="mb-2 text-4xl font-bold tracking-normal">
                {/* Removed the extra h1 tag here */}
                {blog.title}
              </h2>
              <p className={`mb-5 font-light h-12 overflow-hidden`}>
                {blog.content}
              </p>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
