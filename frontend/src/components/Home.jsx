import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <section class="hero  px-10 py-14 min-h-screen">
        <div className="main text-center mb-4">
          <h1 class="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight ">
            <span>Welcome To</span>{" "}
            <span class="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-400 to-purple-500 lg:inline">
              BlogPinnacle
            </span>
          </h1>
          <p class="px-0 mb-8 text-lg text-gray-600 md:text-xl lg:px-24">
            Start gaining the traction you've always wanted with our next-level
            templates and designs. Crafted to help you tell your story.
          </p>

          <Link to="/register">
            <button
              href="#_"
              class="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-green-400 rounded-2xl sm:w-auto sm:mb-0"
            >
              Get Started
              <svg
                class="w-4 h-4 ml-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </Link>
        </div>
        <hr className="my-12 border-t-2 border-blue-500 w-3/5 mx-auto" />
        <div className="latest-blogs">
          <h1 class="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight text-center">
            <span>Here Are the</span>{" "}
            <span class="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-blue-800 to-blue-500 lg:inline">
              Latest Blogs
            </span>
          </h1>

          <div className="latest-blogs flex justify-around w-full">
           {/* Card 1 */}
           <div className="card bg-white p-8 rounded-lg shadow-md flex-1 mx-2">
            <h2 className="text-2xl font-bold mb-4">The Rise of Quantum Computing</h2>
            <p className="text-gray-800 text-lg">As quantum computing becomes more accessible, it opens up new possibilities for solving complex problems in seconds that would take traditional computers years to process. Explore the exciting advancements in the field of quantum computing and its potential impact on the IT industry.</p>
          </div>

          {/* Card 2 */}
          <div className="card bg-white p-8 rounded-lg shadow-md flex-1 mx-2">
            <h2 className="text-2xl font-bold mb-4">AI in Healthcare: Transforming Patient Care</h2>
            <p className="text-gray-800 text-lg">Artificial Intelligence is making significant strides in the healthcare sector. From personalized treatment plans to predictive analytics, AI is revolutionizing patient care. Discover how innovative AI applications are reshaping the landscape of healthcare technology.</p>
          </div>

          {/* Card 3 */}
          <div className="card bg-white p-8 rounded-lg shadow-md flex-1 mx-2">
            <h2 className="text-2xl font-bold mb-4">Ethical Considerations in AI Development</h2>
            <p className="text-gray-800 text-lg">As AI technologies advance, the importance of ethical considerations becomes paramount. Explore the ethical dilemmas and challenges that arise in AI development and how the industry is addressing them to ensure responsible and fair use of AI in the human world.</p>
          </div>
        </div>

        </div>
      </section>
    </>
  );
};

export default Home;
