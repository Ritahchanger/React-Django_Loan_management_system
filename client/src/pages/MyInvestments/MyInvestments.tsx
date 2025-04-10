import {
  Banknote,
  Briefcase,
  Calendar,
  CheckCircle,
  Hourglass,
} from "lucide-react";

import Navbar from "../../components/Navbar/Navbar";

import Title from "../../components/Title/Title";

import AccountLayout from "../../Layout/AccountLayout";

const MyInvestments = () => {
  const investments = [
    {
      amount: "$1,000",
      sector: "Technology",
      createdAt: "2024-07-29",
      status: "Active",
    },
    {
      amount: "$500",
      sector: "Healthcare",
      createdAt: "2024-07-28",
      status: "Pending",
    },
  ];

  return (
    <AccountLayout>
      <div>
        <div className="mt-[2rem]">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center tracking-wider">
            MY INVESTMENTS
          </h1>
        </div>
        <div className="container mx-auto">
          <div className="table-wrapper overflow-x-auto">
            <table className="w-full border-collapse border border-neutral-300">
              <thead>
                <tr className="bg-blue-600 text-sm">
                  <th className="px-4  text-neutral-500 ">
                    <div className="flex items-center">
                      <Banknote
                        size={24}
                        className="inline-block text-gray-600 mr-[1rem]"
                      />
                      <p> AMOUNT INVESTED</p>
                    </div>
                  </th>
                  <th className="px-4 ">
                    <div className="flex items-center">
                      <Briefcase
                        size={24}
                        className="inline-block text-gray-600  mr-[1rem]"
                      />
                      <p> SECTOR</p>
                    </div>
                  </th>
                  <th className="px-4 ">
                    <div className="flex items-center">
                      <Calendar
                        size={25}
                        className="inline-block text-gray-600 mr-[1rem]"
                      />
                      <p> CREATED AT</p>
                    </div>
                  </th>
                  <th className="px-4 py-2">
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody>
                {investments.map((investment, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-neutral-300 px-4 py-2">
                      {investment.amount}
                    </td>
                    <td className="border border-neutral-300 px-4 py-2">
                      {investment.sector}
                    </td>
                    <td className="border border-neutral-300 px-4 py-2">
                      {investment.createdAt}
                    </td>
                    <td className="border border-neutral-300 px-4 py-2 flex justify-center items-center gap-2">
                      {investment.status === "Active" ? (
                        <CheckCircle size={16} className="text-green-500" />
                      ) : (
                        <Hourglass size={16} className="text-yellow-500" />
                      )}
                      {investment.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-2 gap-[1rem] mt-[2rem]">
            <div className="p-[1rem] border border-neutral-300">
              <p>LOANS</p>
            </div>
            <div className="p-[1rem] border border-neutral-300">
              <p>APPLY</p>
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default MyInvestments;
