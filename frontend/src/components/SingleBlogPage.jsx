import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaThumbsUp,
  FaCommentDots,
  FaTrash,
  FaArrowLeft,
  FaSortAmountDown,
  FaSortAmountDownAlt,
  FaUserCircle,
} from "react-icons/fa";
import axios from "axios";
import SpinnerLoader from "../utils/SpinnerLoader"; // Import SpinnerLoaded component
import { ToastContainer, toast } from "react-toastify";

const SingleBlogPage = () => {
  const location = useLocation();
  const [blog, setBlog] = useState({});
  const id = location.state?.singleblog._id || {};
  if (!location.state) {
    // If the state is not present, redirect the user to the home page
    return <Navigate to="/login" />;
  }
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.reducer.login);
  const [comments, setComments] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [sortCommentsAsc, setSortCommentsAsc] = useState(true);
  const [loading, setLoading] = useState(true); // State variable to track loading state

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URI}/blog/${id}`).then((res) => {
      setBlog(res.data.post);
      setLoading(false); // Set loading state to false when blog data is fetched
    });

    if (user) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URI}/likedPost/${user._id}`)
        .then((res) => setLikedBlogs(res.data));
    }
  }, []);

  const isLiked = (blogId) =>
    likedBlogs.some((blog) => blog.post_id === blogId);

  const handleComment = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/getComments/${blog._id}`
      );
      setComments(res.data); // Set comments for the selected blog
    } catch (error) {
      console.log("Error fetching comments:", error);
    }
  };

  const formatDate = (date) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diffMs = now - commentDate;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    }
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    }
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URI}/uncomment/${commentId}`
      );
      // Update the comments state after deletion
      const updatedComments = comments.filter(
        (comment) => comment._id !== commentId
      );
      setComments(updatedComments);
      axios
        .get(`${import.meta.env.VITE_BACKEND_URI}/blog/${id}`)
        .then((res) => {
          setBlog(res.data.post);
        });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments); // Toggle the state to show/hide comments
    if (!showComments) {
      // If comments are to be shown, fetch them
      handleComment();
    }
  };

  const handleLike = async () => {
    if (!user) {
      // Display toast if user is not logged in
      toast.error(`Please Login to Like.`, {
        position: "top-right",
        autoClose: 2000, // 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }
    if (!isLiked(id) && user) {
      // Like the post
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URI}/addLike`,
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
          .get(`${import.meta.env.VITE_BACKEND_URI}/likedPost/${user._id}`)
          .then((res) => setLikedBlogs(res.data));
        axios
          .get(`${import.meta.env.VITE_BACKEND_URI}/blog/${blog._id}`)
          .then((res) => setBlog(res.data.post));
      } catch (error) {
        console.log("Error liking post:", error);
      }
    } else if (user) {
      // Unlike the post
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URI}/blog/unlike`,
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
          .get(`${import.meta.env.VITE_BACKEND_URI}/likedPost/${user._id}`)
          .then((res) => setLikedBlogs(res.data));
        axios
          .get(`${import.meta.env.VITE_BACKEND_URI}/blog/${blog._id}`)
          .then((res) => setBlog(res.data.post));
      } catch (error) {
        console.log("Error unliking post:", error);
      }
    }
  };

  const handleSubmitComment = async () => {
    try {
      // Get the current blog using the expanded blog index
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/addComment`,
        JSON.stringify({
          postId: blog._id,
          userId: user._id,
          content: newComment,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setNewComment(""); // Clear the comment input field after submission
      setShowComments(true);

      axios
        .get(`${import.meta.env.VITE_BACKEND_URI}/${blog._id}`)
        .then((res) => setBlog(res.data.post));
    } catch (error) {
      console.log("Error adding comment:", error);
    }
    handleComment();
  };

  const toggleSortComments = () => {
    setSortCommentsAsc(!sortCommentsAsc);
    setComments([...comments].reverse());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 pt-10 pb-20 px-2 sm:px-4 lg:px-8 scroll-smooth">
      <ToastContainer />
      <div className="container mx-auto max-w-4xl">
        {loading ? (
          <SpinnerLoader />
        ) : (
          <>
            <button
              onClick={() => navigate(-1)}
              className="text-gray-700 hover:text-gray-900 transition-colors flex items-center mb-4"
            >
              <FaArrowLeft className="mr-2" />
              Go Back
            </button>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              {blog.image && (
                <div className="flex justify-center">
                  <img
                    alt="Blog"
                    className="md:w-full h-auto object-cover"
                    src={blog.image}
                  />
                </div>
              )}
              <div className="p-4 sm:p-6">
                <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                  {blog.title}
                </h1>
                <div className="flex items-center justify-center mb-6">
                  <FaUserCircle className="text-gray-600 mr-2" />
                  <span className="text-gray-700 font-semibold">
                    {blog.author}
                  </span>
                </div>
                <div className="max-h-60 md:max-h-fit overflow-y-scroll md:overflow-y-hidden mb-4">
                  <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-6">
                    {blog.content}
                  </p>
                </div>
                <div className="flex items-center mb-2">
                  <button
                    className="flex items-center mr-4"
                    onClick={() => handleLike()}
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
                    onClick={toggleComments}
                  >
                    <FaCommentDots
                      className={`text-gray-700 ${
                        showComments ? "hover:text-blue-600" : ""
                      } transition-colors`}
                    />
                    <span className="ml-1">{blog.comments || 0}</span>
                  </button>
                </div>
              </div>
              {user && (
                <div className="mt-4 p-6 bg-gray-100 rounded-t-lg">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write your comment here..."
                    className="w-full h-20 p-2 border border-gray-300 rounded-md bg-white"
                  ></textarea>
                  <button
                    onClick={handleSubmitComment}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Submit Comment
                  </button>
                </div>
              )}
              {showComments && comments.length > 0 && (
                <div className="p-6 bg-gray-100 rounded-b-lg">
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-gray-700 text-sm font-bold">
                      Comments:
                    </label>
                    <button
                      className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                      onClick={toggleSortComments}
                    >
                      Sort by {sortCommentsAsc ? "Newest" : "Oldest"}
                      {sortCommentsAsc ? (
                        <FaSortAmountDownAlt className="ml-2" />
                      ) : (
                        <FaSortAmountDown className="ml-2" />
                      )}
                    </button>
                  </div>
                  <div className="overflow-y-auto max-h-48">
                    <ul className="divide-y divide-gray-300">
                      {comments.map((comment, commentIndex) => (
                        <li
                          key={commentIndex}
                          className="py-4 bg-white rounded-md px-2 my-2 shadow"
                        >
                          <div className="flex flex-col space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-800">
                                {comment.user_id.username}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatDate(comment.createdAt)}
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm">
                              {comment.content}
                            </p>
                            {user && comment.user_id._id === user._id && (
                              <button
                                className="text-red-600 hover:text-red-700 flex items-center"
                                onClick={() => handleDeleteComment(comment._id)}
                              >
                                <FaTrash className="mr-2" />
                                Delete
                              </button>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SingleBlogPage;
