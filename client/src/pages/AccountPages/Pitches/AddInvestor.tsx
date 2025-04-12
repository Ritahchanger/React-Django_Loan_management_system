import { useTheme } from "../../../context/ThemeContext";
import { useState } from "react";
import { X } from "lucide-react";
const AddInvestor = ({
  handleModalToggle,
}: {
  handleModalToggle: () => void;
}) => {
  const { theme } = useTheme(); // Get the theme from context
  const [amount, setAmount] = useState(""); // State for the investment amount
  const [investmentType, setInvestmentType] = useState("health"); // State for the investment type
  const [returnRate, setReturnRate] = useState(""); // State for the return rate

  const handleSubmit = () => {
    // Handle the form submission, e.g., send data to API
    console.log({ amount, investmentType, returnRate });
  };

  return (
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
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter the investment amount (KSH)"
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>

        <div className="my-2">
          <select
            name="investmentType"
            value={investmentType}
            onChange={(e) => setInvestmentType(e.target.value)}
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
            value={returnRate}
            onChange={(e) => setReturnRate(e.target.value)}
            placeholder="Enter expected return rate (%)"
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Submit Investment
        </button>
      </div>
    </div>
  );
};

export default AddInvestor;
