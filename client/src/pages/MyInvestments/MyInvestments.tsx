import {
  Banknote,
  Briefcase,
  Calendar,
} from "lucide-react";

import AccountLayout from "../../Layout/AccountLayout";
import { baseUrl, useAuthHeaders } from "../../Config/Config";
import { IInvestmentResponse } from "../../types/Investmentresponse.interface";
import { useEffect, useState } from "react";
import axios from "axios";

const MyInvestments = () => {
  const authHeaders = useAuthHeaders();
  const [investments, setInvestments] = useState<IInvestmentResponse[] | null>(
    null
  );

  const fetchInvestors = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}projects/investments/list/`,
        {
          headers: authHeaders,
        }
      );
      setInvestments(response.data);
    } catch (error) {
      console.error("Error fetching investments:", error);
    }
  };

  useEffect(() => {
    fetchInvestors();
  }, []);

  return (
    <AccountLayout>
      <div className="px-4 sm:px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center tracking-wider">
          MY INVESTMENTS
        </h1>

        <div className="overflow-x-auto shadow-md">
          <table className="min-w-full border border-neutral-300 rounded-lg overflow-hidden text-sm">
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
                <th className="px-4 py-3 text-center font-medium">Invested At</th>
              </tr>
            </thead>
            <tbody>
              {investments?.map((investment) => (
                <tr
                  key={investment.id}
                  className="text-center  hover:bg-blue-50 hover:text-blue-500 transition duration-150"
                >
                  <td className="border border-neutral-300 px-4 py-2">
                    ${Number(investment.amount).toLocaleString()}
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
              ))}
              {investments?.length === 0 && (
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
