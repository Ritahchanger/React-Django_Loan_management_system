import { useTheme } from "../../../context/ThemeContext";
import { useState } from "react";
import { X } from "lucide-react";
import { baseUrl } from "../../../Config/Config";
import { useAuthHeaders } from "../../../Config/Config";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/redux/Store";
import { toast } from "react-toastify";
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
  const { token, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");

  const authHeaders = useAuthHeaders();

  const handleSubmit = async () => {
    
    const numericAmount = parseFloat(amount);

    if (!amount || numericAmount <= 0) {
      toast.error("Please enter a valid investment amount greater than 0.");
      return;
    }

    if (numericAmount > user.investment_amount) {
      toast.error(
        "Investment amount exceeds your available balance in the system."
      );
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${baseUrl}projects/investments/`,
        {
          project: parseInt(projectId),
          amount: numericAmount,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      await fetchProjects();
      dispatch(decrementInvestment(numericAmount));
      toast.success("Investment submitted successfully!");
      setAmount(""); // clear input after success
      handleModalToggle();
    } catch (error) {
      console.error("Investment failed:", error);
      toast.error("Investment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed z-40 inset-0 bg-black/50 flex items-center justify-center">
      <div
        className={`${
          theme === "light" ? "bg-white" : "bg-neutral-900"
        } max-w-[500px] w-[97%] p-[1rem] relative rounded-md`}
      >
        <button
          onClick={handleModalToggle}
          className="absolute right-[1rem] top-[1rem]"
        >
          <X color="red" />
        </button>

        <h4
          className={`text-center text-xl font-semibold border-b pb-2 ${
            theme === "light"
              ? "text-neutral-800 border-neutral-300"
              : "text-white border-neutral-700"
          }`}
        >
          INVEST IN THIS PROJECT
        </h4>

        <div className="my-3">
          <p
            className={`text-sm mb-1 ${
              theme === "light" ? "text-gray-700" : "text-gray-300"
            }`}
          >
            Available Balance:{" "}
            <span className="font-semibold">
              {user.investment_amount?.toLocaleString()} KSH
            </span>
          </p>

          <input
            type="number"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter the investment amount (KSH)"
            className={`w-full p-2 border rounded mt-1 ${
              theme === "light"
                ? "border-gray-300 bg-white text-black"
                : "border-gray-600 bg-neutral-800 text-white"
            }`}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`mt-4 ${
            loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white px-4 py-2 rounded w-full transition`}
        >
          {loading ? "Submitting..." : "Submit Investment"}
        </button>
      </div>
    </div>
  );
};

export default AddInvestor;
