import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import { X } from "lucide-react";

import { IRoute } from "../../types/Routes.interface";

import { useNavigate } from "react-router-dom";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../store/slices/authSlice";

import { AppDispatch, RootState } from "../../store/redux/Store";

const navbarItems: IRoute[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Loans",
    path: "/loans",
  },
  {
    name: "About us",
    path: "/aboutus",
  },
];

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [scrolled, setScrolled] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 90) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`text-white shadow-md fixed z-20 ${
          scrolled ? "bg-[#1f2937] scrolled-nav text-[#000]" : null
        }  w-full right-0 left-0`}
      >
        <div className="container mx-auto px-6 py-[0.3rem] flex justify-between items-center">
          <div className="text-xl font-bold">
            <Link to="/">Lendsecure</Link>
          </div>

          <ul className="hidden md:flex space-x-6">
            {navbarItems.map((item, index) => (
              <li key={index}>
                <Link to={item.path} className="hover:text-gray-200">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex space-x-4">
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="px-4 py-1 border rounded hover:bg-white hover:text-green-600 transition"
              >
                Login
              </Link>
            ) : (
              <button
                className="px-4 py-1 border rounded hover:bg-white hover:text-green-600 transition"
                onClick={handleLogout}
              >
                LOGOUT
              </button>
            )}

            {!isAuthenticated && (
              <Link
                to="/signup"
                className="px-4 py-1 border rounded bg-white text-green-600 hover:bg-gray-200 transition"
              >
                Sign Up
              </Link>
            )}
          </div>

          <div className="flex items-center">
            <button
              className="mr-[1rem]"
              onClick={() => {
                toggleTheme();
              }}
            >
              {theme === "light" ? <Moon /> : <Sun />}
            </button>
            <button
              className="px-6 py-2 border border-white cursor-pointer rounded-lg mr-[2rem] md:mr-0 font-semibold hover:bg-green-600 transition"
              onClick={() => {
                navigate("/account/myinvestments");
              }}
            >
              My investments
            </button>

            <button
              className="md:hidden focus:outline-none text-2xl"
              onClick={() => setIsOpen(true)}
            >
              &#9776;
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 z-40"
                onClick={() => setIsOpen(false)}
              />

              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed top-0 right-0 h-full w-[75%] max-w-[300px] bg-green-700 text-white shadow-lg z-50 flex flex-col p-6"
              >
                <button
                  className="absolute top-4 right-4 text-white hover:text-red-400"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={30} />
                </button>

                <ul className="space-y-6 mt-10 text-lg">
                  {navbarItems.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 50, opacity: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        className="block text-sm hover:text-gray-300"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}

                  <motion.li
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                  >
                    <Link
                      to="/login"
                      className="block py-2 text-center border border-neutral-300 hover:bg-green-600 rounded-lg text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                  </motion.li>

                  <motion.li
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                  >
                    <Link
                      to="/signup"
                      className="block py-2 text-center bg-white text-green-700 hover:bg-green-500 hover:text-white rounded-lg text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </motion.li>
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
      {/* <p style={{ paddingTop: "50px" }}></p> */}
    </>
  );
};

export default Navbar;
