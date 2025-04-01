import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto px-6 py-2 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">LOANN</Link>
        </div>

        <ul className="hidden md:flex space-x-6">
          {["Home", "Loans", "Investors", "About Us", "Contact"].map(
            (item, index) => (
              <li key={index}>
                <Link
                  to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="hover:text-gray-200"
                >
                  {item}
                </Link>
              </li>
            )
          )}
        </ul>

        <div className="hidden md:flex space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 border rounded hover:bg-white hover:text-green-600 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 border rounded bg-white text-green-600 hover:bg-gray-200 transition"
          >
            Sign Up
          </Link>
        </div>

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(true)}
        >
          &#9776;
        </button>
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
                {["Home", "Loans", "Investors", "About Us", "Contact"].map(
                  (item, index) => (
                    <motion.li
                      key={index}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 50, opacity: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                        className="block text-sm hover:text-gray-300"
                        onClick={() => setIsOpen(false)}
                      >
                        {item}
                      </Link>
                    </motion.li>
                  )
                )}

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
  );
};

export default Navbar;
