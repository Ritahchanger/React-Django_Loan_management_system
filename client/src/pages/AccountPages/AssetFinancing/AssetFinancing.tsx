import React from "react";
import { Car, Home, Building2, Info, ArrowRightCircle } from "lucide-react";

import AccountLayout from "../../../Layout/AccountLayout";

const assetLoans = [
  {
    title: "Car Log Book Loans",
    icon: <Car className="w-6 h-6 text-blue-600" />,
    description:
      "Get quick loans by using your car as collateral. Fast approval, flexible repayment terms.",
  },
  {
    title: "Nunua / Jenga",
    icon: <Home className="w-6 h-6 text-green-600" />,
    description:
      "Finance your home dream — whether buying or building. Tailored to support homeownership.",
  },
  {
    title: "Land Financing",
    icon: <Building2 className="w-6 h-6 text-yellow-600" />,
    description:
      "Need capital to purchase land? We provide flexible land financing with expert guidance.",
  },
];

const AssetFinancing: React.FC = () => {
  return (
    <AccountLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Asset Financing Options
            </h1>
            <p className="text-gray-600 text-sm max-w-xl mx-auto">
              Choose a financing option that helps you secure valuable assets
              while maintaining cash flow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {assetLoans.map((loan, index) => (
              <div
                key={index}
                className="bg-white border-l-4 border border-neutral-300 rounded-2xl shadow p-6 hover:shadow-lg transition duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  {loan.icon}
                  <h2 className="text-xl font-semibold text-gray-800">
                    {loan.title}
                  </h2>
                </div>
                <p className="text-sm text-gray-600 mb-4">{loan.description}</p>
                <button className="flex items-center gap-2 text-sm text-blue-600 hover:underline hover:text-blue-800">
                  Learn More <ArrowRightCircle className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
            <Info className="text-blue-500 w-6 h-6" />
            <p className="text-gray-700 text-sm">
              For any asset financing option, you’ll need to fill in a short
              application form and provide supporting documents. We'll guide you
              through every step.
            </p>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default AssetFinancing;
