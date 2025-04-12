import React, { useState, ChangeEvent, FormEvent } from "react";

import { ILoanApplicationData } from "../../types/Routes.interface";

import axios from "axios";

const LoanApplicationForm: React.FC = () => {
  // State to manage form fields
  const [user, setUser] = useState<number>(2); // Default user ID is 2
  const [category, setCategory] = useState<string>("business");
  const [amount, setAmount] = useState<string>("");
  const [durationMonths, setDurationMonths] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [status, setStatus] = useState<string>("pending");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Form submission handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const loanData: ILoanApplicationData = {
      user: user,
      category: category,
      amount: parseFloat(amount),
      duration_months: parseInt(durationMonths),
      reason: reason,
      status: status,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/loan-applications/",
        loanData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuccess(true);
      setError(null);
      console.log("Loan application submitted successfully:", response.data);
    } catch (err) {
      setError("Error submitting loan application. Please try again.");
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
    <div className="mx-auto mt-8 p-6 bg-white border border-gray-200  rounded-sm">
      <h2 className="text-2xl font-bold text-center mb-4">
        Loan Application Form
      </h2>

      {error && (
        <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>
      )}
      {success && (
        <div className="bg-green-500 text-white p-3 rounded mb-4">
          Loan application submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-[10px]">
            <div>
              <label
                className="block text-sm font-semibold text-gray-700"
                htmlFor="user"
              >
                User ID
              </label>
              <input
                type="number"
                id="user"
                value={user}
                onChange={(e) => setUser(parseInt(e.target.value))}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

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
                <option value="education">Education</option>
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

          <div>
            <label
              className="block text-sm font-semibold text-gray-700"
              htmlFor="status"
            >
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="denied">Denied</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoanApplicationForm;
