import React from "react";
import {
  GraduationCap,
  AlertTriangle,
  ArrowRightCircle,
  Info,
} from "lucide-react";

import AccountLayout from "../../../Layout/AccountLayout";

const personalLoanOptions = [
  {
    title: "Education Loan",
    icon: <GraduationCap className="w-6 h-6 text-indigo-600" />,
    description:
      "Empowering your academic journey. Flexible repayment and low interest for tuition, books, and related expenses.",
    action: "Apply for Education Loan",
  },
  {
    title: "Emergency Loan",
    icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
    description:
      "Quick financial relief in urgent times — medical bills, unexpected costs, or family emergencies.",
    action: "Apply for Emergency Loan",
  },
];

const PersonalLoans: React.FC = () => {
  return (
    <AccountLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Personal Loan Options
            </h1>
            <p className="text-gray-600 text-sm max-w-xl mx-auto">
              Tailored personal loans to support your education or urgent needs.
              Simple application and fast approval.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {personalLoanOptions.map((loan, index) => (
              <div
                key={index}
                className="bg-white border-l-4 rounded-2xl shadow p-6 hover:shadow-lg transition duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  {loan.icon}
                  <h2 className="text-xl font-semibold text-gray-800">
                    {loan.title}
                  </h2>
                </div>
                <p className="text-sm text-gray-600 mb-4">{loan.description}</p>
                <button className="flex items-center gap-2 text-sm text-blue-600 hover:underline hover:text-blue-800">
                  {loan.action} <ArrowRightCircle className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white p-6 rounded-xl shadow-md flex items-start gap-4">
            <Info className="text-blue-500 w-6 h-6 mt-1" />
            <p className="text-gray-700 text-sm">
              Ensure you meet basic requirements like a valid ID, proof of need
              (e.g., school admission or medical report), and repayment ability
              before applying.
            </p>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default PersonalLoans;
