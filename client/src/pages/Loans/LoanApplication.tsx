import React, { useState, ChangeEvent, FormEvent } from "react";
import { ILoanApplicationData } from "../../types/LoanApplication.interface";
import axios from "axios";
import { baseUrl } from "../../Config/Config";
import { useSelector } from "react-redux";
import { RootState } from "../../store/redux/Store";

import { toast } from "react-toastify";

const LoanApplicationForm: React.FC = () => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [category, setCategory] = useState<string>("business");
  const [amount, setAmount] = useState<string>("");
  const [durationMonths, setDurationMonths] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loanData: ILoanApplicationData = {
      user: user.id,
      category,
      amount: parseFloat(amount),
      duration_months: parseInt(durationMonths),
      reason,
      status: "pending",
    };

    try {
      const response = await axios.post(
        `${baseUrl}loans/loan-applications/`,
        loanData,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      console.log(response.data);
      setSuccess(true);
      setError(null);
      toast.success("Loan application submitted successfully!");
    } catch (err) {
      toast.error("Error submitting loan application. Please try again.");
      setSuccess(false);
      console.error("Error submitting loan application:", err);
    }
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDurationMonths(e.target.value);
  };

  const handleReasonChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
  };

  return (
    <div className="mx-auto mt-8 p-6 bg-white border border-gray-200 rounded-sm">
      <h2 className="text-2xl font-bold text-center mb-4">
        Loan Application Form
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-[10px]">
            <div>
              <label
                className="block text-sm font-semibold text-gray-700"
                htmlFor="category"
              >
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="business">Business</option>
                <option value="personal">Personal</option>
                <option value="asset">Financial Asset</option>
              </select>
            </div>
            <div>
              <label
                className="block text-sm font-semibold text-gray-700"
                htmlFor="amount"
              >
                Amount
              </label>
              <input
                type="number"
                id="amount"
                step="0.01"
                value={amount}
                onChange={handleAmountChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold text-gray-700"
                htmlFor="durationMonths"
              >
                Duration (Months)
              </label>
              <input
                type="number"
                id="durationMonths"
                value={durationMonths}
                onChange={handleDurationChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-semibold text-gray-700"
              htmlFor="reason"
            >
              Reason
            </label>
            <textarea
              id="reason"
              rows={3}
              value={reason}
              onChange={handleReasonChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <input
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value="SUBMIT"
            disabled={success}
          />
        </div>
      </form>
    </div>
  );
};

export default LoanApplicationForm;
