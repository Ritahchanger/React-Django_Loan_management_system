import { useState } from "react";
import Title from "../Title/Title";
import { X } from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

const Investors = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { theme } = useTheme();

  const handleModalToggle = () => setIsModalOpen(!isModalOpen);

  return (
    <div id="investors" className="bg-gray-50 py-[6rem]">
      <div className="container mx-auto text-center">
        <Title title="Invest in Startups" />
        <p className="pt-3">
          Deposit a minimum of 100,000 KSH and invest in high-potential
          startups.
        </p>
        <button
          onClick={handleModalToggle}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Become an Investor
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed z-40 inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white max-w-[500px] w-[97%] p-[1rem] relative">
            <button
              onClick={handleModalToggle}
              className="absolute right-[1rem] top-[1rem]"
            >
              <X color="red" />
            </button>

            <h4
              className={`${
                theme === "light" ? "text-neutral-800" : "text-white"
              } text-xl font-semibold border-b border-neutral-300`}
            >
              BECOME AN INVESTOR
            </h4>

            <div className="my-2">
              <input
                type="number"
                name="amount"
                placeholder="Enter the investment amount (KSH)"
                className="w-full p-2 border border-gray-300 rounded mt-2"
              />
            </div>

            <div className="my-2">
              <select
                name="investmentType"
                className="w-full p-2 border border-gray-300 rounded mt-2"
              >
                <option value="health">Health</option>
                <option value="tech">Tech</option>
                <option value="agriculture">Agriculture</option>
                <option value="education">Education</option>
                <option value="fintech">Fintech</option>
              </select>
            </div>

            <div className="my-2">
              <input
                type="text"
                name="returnrate"
                placeholder="Enter expected return rate (%)"
                className="w-full p-2 border border-gray-300 rounded mt-2"
              />
            </div>

            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full">
              Submit Investment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Investors;
