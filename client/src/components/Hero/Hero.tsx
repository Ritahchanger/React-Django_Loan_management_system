import { motion } from "framer-motion";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero text-white h-[100vh] sm:h-[80vh] md:h-[70vh]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="content text-center px-[1rem]"
        >
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold"
          >
            Empower Your Finances with Smart Loans
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-4 text-lg md:text-xl"
          >
            Get the funding you need with flexible repayment plans, low interest
            rates, and fast approvals. Your journey to financial stability
            starts here.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-6 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="px-6 py-2 bg-white text-green-700 rounded-lg font-semibold shadow-md hover:bg-gray-200 transition">
              Apply for a Loan
            </button>
            <button className="px-6 py-2 border border-white rounded-lg font-semibold hover:bg-green-600 transition">
              Learn More
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
