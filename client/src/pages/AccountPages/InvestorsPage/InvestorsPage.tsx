import React, { useState } from "react";
import AccountLayout from "../../../Layout/AccountLayout";
import Title from "../../../components/Title/Title";
import { useTheme } from "../../../context/ThemeContext";

interface Investor {
  id: number;
  email: string;
  name: string;
  category: "Health" | "Tech" | "Agriculture" | "Education" | "Fintech";
  amount: number;
}

const initialInvestors: Investor[] = [
  {
    id: 1,
    name: "John Doe",
    email: "peterdennis573@gmail.com",
    category: "Health",
    amount: 500000,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "alexandergratified6724@gmail.com",
    category: "Tech",
    amount: 1000000,
  },
  {
    id: 3,
    name: "Samuel Ochieng",
    email: "lucy873@gmail.com",
    category: "Agriculture",
    amount: 750000,
  },
];

const InvestorsPage: React.FC = () => {
  const { theme } = useTheme();
  const [investors] = useState<Investor[]>(initialInvestors);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredInvestors = investors.filter(
    (investor) =>
      investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AccountLayout>
      <div className="p-6 space-y-6">
        <Title title="Investors Dashboard" />

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />

        <div className="overflow-x-auto card rounded-sm">
          <table className="min-w-full table-auto text-sm">
            <thead
              className={`bg-gray-100 text-gray-600 ${
                theme === "dark" ? "text-black" : ""
              }`}
            >
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Amount (KSh)</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvestors.length > 0 ? (
                filteredInvestors.map((investor) => (
                  <tr key={investor.id} className="border-t border-gray-200">
                    <td className="px-6 py-3">{investor.name}</td>
                    <td className="px-6 py-3">{investor.email}</td>
                    <td className="px-6 py-3">{investor.category}</td>
                    <td className="px-6 py-3">
                      KSh {investor.amount.toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No investors found.
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

export default InvestorsPage;
