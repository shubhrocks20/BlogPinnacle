import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { clearUser } from "../store/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.reducer.login);

  const handleClick = () => {
    localStorage.removeItem("persist:root");
    dispatch(clearUser());
    navigate("/login");
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Define the styles for active and inactive links
  const activeLinkStyle =
    "py-2 px-4 text-white font-semibold bg-blue-700 rounded-md md:text-lg text-md ";
  const inactiveLinkStyle =
    "py-2 px-4 text-white font-semibold md:text-lg text-md";

  return (
    <>
      <nav className="bg-gray-800">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-7">
              {/* Website Logo */}
              <NavLink
                to="/"
                className="flex items-center py-4 px-2"
                onClick={closeMenu}
              >
                <img
                  src="/images/My logo.jpeg"
                  alt="Logo"
                  className="h-8 w-8 mr-2"
                />
                <span className="font-semibold text-white text-sm sm:text-base md:text-lg lg:text-xl">
                  BlogPinnacle
                </span>
              </NavLink>
              {/* Primary Navbar items */}
              <div className="hidden md:flex items-center space-x-1">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? activeLinkStyle : inactiveLinkStyle
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/blogs"
                  className={({ isActive }) =>
                    isActive ? activeLinkStyle : inactiveLinkStyle
                  }
                >
                  Blogs
                </NavLink>
                {user ? (
                  <>
                    <NavLink
                      to="/user"
                      className={({ isActive }) =>
                        isActive ? activeLinkStyle : inactiveLinkStyle
                      }
                    >
                      User
                    </NavLink>
                    <NavLink
                      to="/myblogs"
                      className={({ isActive }) =>
                        isActive ? activeLinkStyle : inactiveLinkStyle
                      }
                    >
                      My Blogs
                    </NavLink>
                  </>
                ) : (
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? activeLinkStyle : inactiveLinkStyle
                    }
                  >
                    Login
                  </NavLink>
                )}
              </div>
            </div>
            {/* Secondary Navbar items */}
            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                <NavLink
                  onClick={handleClick}
                  className={({ isActive }) =>
                    isActive
                      ? "py-2 px-4 text-lg font-semibold text-white rounded-md hover:bg-gray-900 transition duration-300 bg-blue-700"
                      : "py-2 px-4 text-lg font-semibold text-white bg-gray-700 rounded-md hover:bg-gray-900 transition duration-300"
                  }
                >
                  Logout
                </NavLink>
              ) : (
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "py-2 px-4 text-lg font-semibold text-white rounded-md hover:bg-gray-900 transition duration-300 bg-blue-700"
                      : "py-2 px-4 text-lg font-semibold text-white bg-gray-700 rounded-md hover:bg-gray-900 transition duration-300"
                  }
                >
                  Sign Up
                </NavLink>
              )}
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                className="outline-none mobile-menu-button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <FaBars
                  className="w-6 h-6 text-white hover:text-gray-300"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                />
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        <div
          className={`md:hidden ${
            isMenuOpen ? "block" : "hidden"
          } bg-gray-600 flex flex-col h-screen`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeLinkStyle : inactiveLinkStyle
            }
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              isActive ? activeLinkStyle : inactiveLinkStyle
            }
            onClick={closeMenu}
          >
            Blogs
          </NavLink>
          {user ? (
            <>
              <NavLink
                to="/user"
                className={({ isActive }) =>
                  isActive ? activeLinkStyle : inactiveLinkStyle
                }
                onClick={closeMenu}
              >
                User
              </NavLink>
              <NavLink
                to="/myblogs"
                className={({ isActive }) =>
                  isActive ? activeLinkStyle : inactiveLinkStyle
                }
                onClick={closeMenu}
              >
                My Blogs
              </NavLink>
              <NavLink
                onClick={() => {
                  handleClick();
                  closeMenu();
                }}
                className="py-2 px-4 text-red-500 font-semibold md:text-lg text-md "
              >
                Logout
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? activeLinkStyle : inactiveLinkStyle
                }
                onClick={closeMenu}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? activeLinkStyle : inactiveLinkStyle
                }
                onClick={closeMenu}
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
