import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountLayout from "../../Layout/AccountLayout";

import axios from "axios";
import { baseUrl } from "../../Config/Config";
import "./loan.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/redux/Store";
const Loan: FC = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  const [loans, setLoans] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get(`${baseUrl}loans/loan-applications/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setLoans(response.data);
      } catch (error) {
        console.error("Error fetching loan applications", error);
      }
    };

    fetchLoans();
  }, []);

  return (
    <AccountLayout>
      <div className="py-6">
        <div className="mt-6 overflow-x-auto">
          {/* Display loans in a table */}
          <table className="min-w-full  border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-blue-500 text-left">
                <th className="px-6 py-3 text-sm font-medium text-gray-700">
                  ID
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-700">
                  Category
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-700">
                  Amount
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-700">
                  Duration (Months)
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-700">
                  Status
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-700">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.id} className="border border-neutral-300">
                  <td className="px-6 py-4 text-sm text-[#000]">{loan.id}</td>
                  <td className="px-6 py-4 text-sm text-[#000]">
                    {loan.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#000]">
                    {loan.amount}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#000]">
                    {loan.duration_months}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#000]">
                    {loan.status}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#000]">
                    {new Date(loan.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AccountLayout>
  );
};

export default Loan;
