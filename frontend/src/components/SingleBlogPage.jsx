import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SingleBlogPage = ({ title, content }) => {
  const location = useLocation();
  const localstate = location.state?.singleblog || {};
  const navigate = useNavigate();

  return (
    <>
      <div className="mx-auto p-10 min-h-screen h-full bg-gray-100">
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
        <h1 className="text-center text-4xl lg:text-6xl leading-relaxed mb-6 font-semibold text-blue-700">
          {localstate.title}
        </h1>
        <div className="flex justify-center ">

        <p className="p-4 border-2 border-red-400 leading-normal text-justify text-lg lg:text-xl font-normal tracking-wide text-gray-800 w-4/5 ">
          {localstate.content}
        </p>
        </div>
      </div>
    </>
  );
};

export default SingleBlogPage;
