import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../loginContext";

const Header = () => {
  const navigate = useNavigate();
  const { isLogin, setIsLogin, setUser } = useContext(LoginContext);
  const handleClick = (e) => {
    setIsLogin(false);
    setUser({
      _id: '',
      username: ''
    })
    navigate("/login");
  };
  return (
    <>
      <div className="header sticky top-0 px-6 py-4 flex items-center justify-between text-lg bg-gray-800 text-white">
        <div className="left flex items-center justify-between space-x-28">
          <div className="logo flex justify-between space-x-4">
            <img
              src="/images/My logo.jpeg"
              alt=""
              className="w-10 rounded-lg"
            />
            <span className="text-3xl font-semibold">BlogPinnacle</span>
          </div>
          <div className="links flex items-center justify-between space-x-10">
            <li className="list-none cursor-pointer  hover:underline ">
              <Link to="/">Home</Link>
            </li>
           
            <li className="list-none cursor-pointer hover:underline">
              <Link to="/Blogs">Blogs</Link>
            </li>
            {!isLogin ? (
              <>
            <li className="list-none cursor-pointer hover:underline">
              <Link to='/login'>Login</Link>
            </li>
           
              </>
            ):(
              <>
            <li className="list-none cursor-pointer hover:underline">
              <Link to="/user">User</Link>
            </li>
            <li className="list-none cursor-pointer hover:underline">
              <Link to="/myblogs">My Blogs</Link>
            </li>
            </>
            )}
          </div>
        </div>
        <div className="right">
          {!isLogin ? (
          <button className="rounded-md px-8 py-2 text-md bg-gray-700 text-white hover:bg-gray-900">
            <Link to="/register">
            Sign Up
            </Link>
          </button>
          ):(
            <>
             <button className="rounded-md px-8 py-2 text-md bg-gray-700 text-white hover:bg-gray-900" onClick={handleClick}>
            Logout
          </button>

            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
