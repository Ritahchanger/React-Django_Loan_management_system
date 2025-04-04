import React, { useState } from "react";
import AccountLayout from "../../../Layout/AccountLayout";
import Title from "../../../components/Title/Title";

interface Investor {
  id: number;
  name: string;
  category: "Health" | "Tech" | "Agriculture" | "Education" | "Fintech";
  amount: number;
}

const initialInvestors: Investor[] = [
  { id: 1, name: "John Doe", category: "Health", amount: 500000 },
  { id: 2, name: "Jane Smith", category: "Tech", amount: 1000000 },
  { id: 3, name: "Samuel Ochieng", category: "Agriculture", amount: 750000 },
];

const InvestorsPage: React.FC = () => {
  const [investors, setInvestors] = useState<Investor[]>(initialInvestors);
  const [form, setForm] = useState({
    name: "",
    category: "Health",
    amount: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddInvestor = () => {
    const amount = parseInt(form.amount);
    if (isNaN(amount) || amount < 100000) {
      alert("Minimum deposit must be at least KSh 100,000");
      return;
    }

    const newInvestor: Investor = {
      id: investors.length + 1,
      name: form.name,
      category: form.category as Investor["category"],
      amount: amount,
    };

    setInvestors([...investors, newInvestor]);
    setForm({ name: "", category: "Health", amount: "" });
  };

  return (
    <AccountLayout>
      <div className="p-6 space-y-6">
        <Title title="  Investors Dashboard" />

        <div className="bg-white border  border-neutral-300 rounded-sm p-4">
          <h2 className="text-lg font-semibold mb-4">Add New Investor</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Investor Name"
              value={form.name}
              onChange={handleChange}
              className="border border-neutral-300 p-2 rounded-sm"
            />
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border border-neutral-300 p-2 rounded-sm"
            >
              <option value="Health">Health</option>
              <option value="Tech">Tech</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Education">Education</option>
              <option value="Fintech">Fintech</option>
            </select>
            <input
              type="number"
              name="amount"
              placeholder="Amount in KSh"
              value={form.amount}
              onChange={handleChange}
              className="border p-2 border-neutral-300 p-2 rounded-sm"
            />
          </div>
          <button
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={handleAddInvestor}
          >
            Add Investor
          </button>
        </div>

        <div
          className="overflow-x-auto bg-white  rounded-sm
        
        border border-neutral-300
        "
        >
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Amount (KSh)</th>
              </tr>
            </thead>
            <tbody>
              {investors.map((investor) => (
                <tr key={investor.id} className="border-t border-gray-200">
                  <td className="px-6 py-3">{investor.name}</td>
                  <td className="px-6 py-3">{investor.category}</td>
                  <td className="px-6 py-3">
                    KSh {investor.amount.toLocaleString()}
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

export default InvestorsPage;
