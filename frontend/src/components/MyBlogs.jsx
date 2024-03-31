import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaThumbsUp, FaCommentDots, FaTrash } from "react-icons/fa";
import SpinnerLoader from "../utils/SpinnerLoader"; // Correct import statement

const MyBlogs = () => {
  const { user } = useSelector((state) => state.reducer.login);
  const [blogs, setBlogs] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // State variable to track loading state
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/blogs/${user._id}`)
      .then((res) => {
        setBlogs(res.data);
        setLoading(false); // Set loading state to false when blogs data is fetched
      });

    axios
      .get(`http://localhost:5000/likedPost/${user._id}`)
      .then((res) => setLikedBlogs(res.data));
  }, []);

  const handleDelete = async (index) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/delete/blog/${blogs[index]._id}`
      );
      setBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog._id !== res.data.deletedPost._id)
      );
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleUpdate = (index) => {
    const singleblog = blogs[index];
    navigate("/edit", { state: { singleblog } });
  };

  const handleView = (index) => {
    const singleblog = blogs[index];
    navigate("/singleblog", { state: { singleblog } });
  };

  const isLiked = (blogId) =>
    likedBlogs.some((blog) => blog.post_id === blogId);

  const handleLike = async (index) => {
    const blog = blogs[index];
    if (!isLiked(blog._id)) {
      // Like the post
      try {
        const res = await axios.post(
          `http://localhost:5000/addLike`,
          JSON.stringify({
            postId: blog._id,
            userId: user._id,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        axios
          .get(`http://localhost:5000/likedPost/${user._id}`)
          .then((res) => setLikedBlogs(res.data));
        axios
          .get(`http://localhost:5000/blogs/${user._id}`)
          .then((res) => setBlogs(res.data));
      } catch (error) {
        console.log("Error liking post:", error);
      }
    } else {
      // Unlike the post
      try {
        const res = await axios.post(
          `http://localhost:5000/blog/unlike`,
          JSON.stringify({
            postId: blog._id,
            userId: user._id,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        axios
          .get(`http://localhost:5000/likedPost/${user._id}`)
          .then((res) => setLikedBlogs(res.data));
        axios
          .get(`http://localhost:5000/blogs/${user._id}`)
          .then((res) => setBlogs(res.data));
      } catch (error) {
        console.log("Error unliking post:", error);
      }
    }
  };

  return (
    <section className="min-h-screen pt-8 bg-white">
      {loading ? ( // Conditional rendering of SpinnerLoader component while loading
        <div className="flex items-center justify-center h-screen">
          <SpinnerLoader />
        </div>
      ) : (
        <>
          {blogs.length ? (
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-gray-800 mb-4">
                  Your Blogs
                </h1>
                <p className="text-xl text-gray-600">
                  A collection of your thoughts and stories.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-2">
                {blogs.map((blog, index) => (
                  <div
                    key={index}
                    className={`bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300`}
                  >
                    <img
                      alt="Blog cover"
                      className="w-full h-56 object-cover"
                      src={blog.image || "https://via.placeholder.com/500"}
                    />
                    <div className="p-6">
                      <h2
                        className="font-bold text-xl mb-2 text-gray-800 hover:text-blue-600 transition-colors cursor-pointer"
                        onClick={() => handleView(index)}
                      >
                        {blog.title}
                      </h2>
                      <p className="text-gray-700 mb-4">
                        {blog.content.substring(0, 100)}...
                      </p>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center">
                          <button
                            className="flex items-center mr-4"
                            onClick={() => handleLike(index)}
                          >
                            <FaThumbsUp
                              className={`transition-colors ${
                                isLiked(blog._id)
                                  ? "text-blue-600 hover:text-blue-700"
                                  : "text-gray-700 hover:text-blue-600"
                              }`}
                            />
                            <span className="ml-1">{blog.likes || 0}</span>
                          </button>
                          <button
                            className="flex items-center"
                            onClick={() => {
                              handleView(index)
                            }}
                          >
                            <FaCommentDots className="text-gray-700 hover:text-blue-600 transition-colors" />
                            <span className="ml-1">{blog.comments || 0}</span>
                          </button>
                        </div>
                        <div className="flex">
                          <button
                            className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded transition-colors mr-2"
                            onClick={() => handleUpdate(index)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition-colors"
                            onClick={() => handleDelete(index)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-screen">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                No Blogs Found
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                It looks like you haven't created any blogs yet. Start sharing your
                thoughts and ideas!
              </p>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => navigate("/user")}
              >
                Create Your First Blog
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default MyBlogs;
