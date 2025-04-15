import { Banknote, Briefcase, Calendar } from "lucide-react";
import AccountLayout from "../../Layout/AccountLayout";
import { baseUrl, useAuthHeaders } from "../../Config/Config";
import { IInvestmentResponse } from "../../types/Investmentresponse.interface";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { incrementInvestment } from "../../store/slices/authSlice";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/redux/Store";

const MyInvestments = () => {
  const dispatch = useDispatch<AppDispatch>();

  const authHeaders = useAuthHeaders();
  const [investments, setInvestments] = useState<IInvestmentResponse[] | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const fetchInvestors = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}projects/investments/list/`, {
        headers: authHeaders,
      });
      setInvestments(response.data);
    } catch (error) {
      console.error("Error fetching investments:", error);
      toast.error("Failed to load investments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestors();
  }, []);

  const addDeposit = async () => {
    const input = prompt("How much do you want to add?");
    const amount = parseFloat(input || "0.0");

    if (!input || isNaN(amount) || amount < 50000) {
      toast.error("The deposit must be a valid number greater than 50,000.");
      return;
    }

    try {
      const response = await axios.patch(
        `${baseUrl}users/increment-investment/`,
        { amount },
        { headers: authHeaders }
      );

      console.log(response.data);
      if (response.status === 200) {
        dispatch(incrementInvestment(amount));
        toast.success("Investment added successfully!");
        fetchInvestors();
      } else {
        toast.error("Something went wrong while adding the investment.");
      }
    } catch (error) {
      console.error("Add deposit error:", error);
      toast.error("Failed to add investment. Please try again.");
    }
  };

  return (
    <AccountLayout>
      <div className="px-4 sm:px-8 py-6">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 tracking-wider">
            MY INVESTMENTS
          </h1>
          <button
            className="bg-green-500 px-6 py-2 text-white rounded-md hover:bg-green-600 transition"
            onClick={addDeposit}
          >
            ADD INVESTMENT
          </button>
        </div>

        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full border border-neutral-300 text-sm">
            <thead>
              <tr className="bg-blue-600 text-white text-left">
                <th className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-white p-1 rounded-full">
                      <Banknote size={20} className="text-blue-600" />
                    </div>
                    <span className="font-medium">Amount Invested</span>
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-white p-1 rounded-full">
                      <Briefcase size={20} className="text-blue-600" />
                    </div>
                    <span className="font-medium">Project Name</span>
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-white p-1 rounded-full">
                      <Calendar size={20} className="text-blue-600" />
                    </div>
                    <span className="font-medium">Pitched By</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-center font-medium">
                  Invested At
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-4 text-gray-500 italic"
                  >
                    Loading investments...
                  </td>
                </tr>
              ) : investments && investments.length > 0 ? (
                investments.map((investment) => (
                  <tr
                    key={investment.id}
                    className="text-center hover:bg-blue-50 hover:text-blue-500 transition duration-150"
                  >
                    <td className="border border-neutral-300 px-4 py-2">
                      KSH {Number(investment.amount).toLocaleString()}
                    </td>
                    <td className="border border-neutral-300 px-4 py-2">
                      {investment.project_name}
                    </td>
                    <td className="border border-neutral-300 px-4 py-2">
                      {investment.pitched_by}
                    </td>
                    <td className="border border-neutral-300 px-4 py-2">
                      {new Date(investment.invested_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-4 text-gray-500 italic"
                  >
                    No investments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AccountLayout>
  );
};

export default MyInvestments;
