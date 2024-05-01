import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaThumbsUp,
  FaCommentDots,
  FaRegThumbsUp,
  FaRegCommentDots,
  FaUser,
  FaSortAmountDown,
  FaSortAmountDownAlt,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SpinnerLoader from "../utils/SpinnerLoader"; // Correct import statement

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { user } = useSelector((state) => state.reducer.login);
  const navigate = useNavigate();
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [sortBlogsAsc, setSortBlogsAsc] = useState(true);
  const [loading, setLoading] = useState(true); // State variable to track loading state

  const handleUser = () => {
    toast.error("Please login to like the post", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    axios.get("https://doubtful-waders-ray.cyclic.app/blogs").then((res) => {
      setBlogs(res.data);

      setLoading(false); // Set loading state to false when blogs data is fetched
    });
    if (user) {
      axios
        .get(`https://doubtful-waders-ray.cyclic.app/likedPost/${user._id}`)
        .then((res) => setLikedBlogs(res.data));
    }
  }, [user]);

  const handleView = (index) => {
    const singleblog = blogs[index];
    navigate("/singleblog", { state: { singleblog } });
  };

  const isLiked = (blogId) =>
    likedBlogs.some((blog) => blog.post_id === blogId);

  const handleLike = async (index) => {
    const blog = blogs[index];
    if (user) {
      if (!isLiked(blog._id)) {
        try {
          const res = await axios.post(
            `https://doubtful-waders-ray.cyclic.app/addLike`,
            JSON.stringify({ postId: blog._id, userId: user._id }),
            { headers: { "Content-Type": "application/json" } }
          );
          axios
            .get(`https://doubtful-waders-ray.cyclic.app/likedPost/${user._id}`)
            .then((res) => setLikedBlogs(res.data));
          axios
            .get(`https://doubtful-waders-ray.cyclic.app/blogs`)
            .then((res) => setBlogs(res.data));
        } catch (error) {
          console.log("Error liking post:", error);
        }
      } else {
        try {
          const res = await axios.post(
            `https://doubtful-waders-ray.cyclic.app/blog/unlike`,
            JSON.stringify({ postId: blog._id, userId: user._id }),
            { headers: { "Content-Type": "application/json" } }
          );
          axios
            .get(`https://doubtful-waders-ray.cyclic.app/likedPost/${user._id}`)
            .then((res) => setLikedBlogs(res.data));
          axios
            .get(`https://doubtful-waders-ray.cyclic.app/blogs/`)
            .then((res) => setBlogs(res.data));
        } catch (error) {
          console.log("Error unliking post:", error);
        }
      }
    }
  };

  const toggleSortBlogs = () => {
    setSortBlogsAsc(!sortBlogsAsc);
    setBlogs([...blogs].reverse());
  };

  const formatDate = (dateString) => {
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", options);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12">
      <div className="px-4 mx-auto max-w-screen-xl lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
            Our Blog
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-8">
            We use an agile approach to test assumptions and connect with the
            needs of your audience early and often.
          </p>
          {loading ? ( // Conditional rendering of SpinnerLoader component while loading
            <div className="flex items-center justify-center h-screen">
              {" "}
              {/* Flex container to center SpinnerLoader */}
              <SpinnerLoader />
            </div>
          ) : (
            <></>
          )}
          <div className="flex items-center justify-end mb-4">
            <button
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              onClick={toggleSortBlogs}
            >
              Sort by {sortBlogsAsc ? "Newest" : "Oldest"}
              {sortBlogsAsc ? (
                <FaSortAmountDownAlt className="ml-2" />
              ) : (
                <FaSortAmountDown className="ml-2" />
              )}
            </button>
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <article
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  alt="Blog cover"
                  className="w-full h-56 object-cover"
                  src={blog.image || "https://via.placeholder.com/500"}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4">
                  <h2 className="text-xl font-bold text-white mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-white text-sm">
                    Posted: {formatDate(blog.createdAt)}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4">
                  {blog.content.substring(0, 100)}...
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <FaUser className="text-gray-600 mr-2" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="flex items-center mr-4"
                      onClick={() => handleView(index)}
                    >
                      <FaCommentDots className="text-gray-700 hover:text-blue-600 transition-colors" />
                      <span className="ml-1">{blog.comments || 0}</span>
                    </button>
                    {!user ? (
                      <button
                        className="flex items-center"
                        onClick={handleUser}
                      >
                        <FaRegThumbsUp className="text-gray-700 hover:text-blue-600 transition-colors" />
                        <span className="ml-1">{blog.likes || 0}</span>
                      </button>
                    ) : (
                      <></>
                    )}
                    {user && (
                      <button
                        className="flex items-center mr-4"
                        onClick={() => handleLike(index)}
                      >
                        {isLiked(blog._id) ? (
                          <FaThumbsUp className="text-blue-600 hover:text-blue-700 transition-colors" />
                        ) : (
                          <FaRegThumbsUp className="text-gray-700 hover:text-blue-600 transition-colors" />
                        )}
                        <span className="ml-1">{blog.likes || 0}</span>
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    onClick={() => handleView(index)}
                  >
                    <FaRegCommentDots className="mr-2" />
                    Read more
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Blogs;
