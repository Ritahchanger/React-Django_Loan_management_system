import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountLayout from "../../Layout/AccountLayout";
import { CheckCircle } from "lucide-react";

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
                <th className="px-6 py-3 text-sm font-medium text-gray-700 text-center">
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
                  <td className="px-6 py-4 text-sm text-neutral-800">
                    {loan.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-800">
                    {loan.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-800">
                    {loan.amount}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-800">
                    {loan.duration_months}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-800  text-center">
                    <p className="text-sm text-gray-600 mb-3">
                      <span
                        className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${
                          loan.status !== ""
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100"
                        }`}
                      >
                        {loan.status === "approved" ? (
                          <>
                            Funded <CheckCircle className="ml-1 w-4 h-4" />
                          </>
                        ) : (
                          loan.status
                        )}
                      </span>
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-800">
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
