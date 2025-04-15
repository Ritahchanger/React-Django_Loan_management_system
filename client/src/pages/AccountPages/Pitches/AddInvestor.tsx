import { useTheme } from "../../../context/ThemeContext";

import { useState } from "react";

import { X } from "lucide-react";

import { baseUrl } from "../../../Config/Config";

import { useAuthHeaders } from "../../../Config/Config";

import axios from "axios";

import { useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../store/redux/Store";

import { useDispatch } from "react-redux";

import { decrementInvestment } from "../../../store/slices/authSlice";

const AddInvestor = ({
  handleModalToggle,

  fetchProjects,

  projectId,
}: {
  handleModalToggle: () => void;
  fetchProjects: () => void;
  projectId: string;
}) => {


  const { token } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>()

  const { theme } = useTheme();

  const [loading, setLoading] = useState(false);

  const [amount, setAmount] = useState("");

  const authHeaders = useAuthHeaders();

  const handleSubmit = async () => {
    console.log(parseInt(projectId));

    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid investment amount greater than 0.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}projects/investments/`,
        {
          project: parseInt(projectId),
          amount: parseFloat(amount),
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      await fetchProjects();
      alert("Investment submitted successfully!");
      handleModalToggle();
    } catch (error) {
      console.error("Investment failed:", error);
      alert("Investment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed z-40 inset-0 bg-black/50 flex items-center justify-center ">
      <div className="bg-white max-w-[500px] w-[97%] p-[1rem] relative rounded-md">
        <button
          onClick={handleModalToggle}
          className="absolute right-[1rem] top-[1rem]"
        >
          <X color="red" />
        </button>

        <h4
          className={`text-center  ${
            theme === "light" ? "text-neutral-800" : "text-white"
          } text-xl font-semibold border-b border-neutral-300`}
        >
          INVEST IN THIS PROJECT
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

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`mt-4 ${
            loading ? "bg-blue-400" : "bg-blue-600"
          } text-white px-4 py-2 rounded w-full`}
        >
          {loading ? "Submitting..." : "Submit Investment"}
        </button>
      </div>
    </div>
  );
};

export default AddInvestor;
