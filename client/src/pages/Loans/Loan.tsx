import { FC, useState } from "react";
import {
  Briefcase,
  User,
  Car,
  Building2,
  Book,
  AlertTriangle,
  Home,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import AccountNavbar from "../../Layout/AccountNavbar";
import AccountSidebar from "../../Layout/AccountSidebar";
import Title from "../../components/Title/Title";
import "./loan.css"

interface LoanType {
  label: string;
  icon?: any;
  note?: string;
}

interface LoanCategory {
  icon: any;
  title: string;
  description: string;
  types: LoanType[];
  color: string;
  link?: string;
}

const loanCategories: LoanCategory[] = [
  {
    icon: <Briefcase className="w-6 h-6 text-blue-600" />,
    title: "Business Loans",
    description: "Loans to grow your business or pitch your startup idea.",
    types: [
      {
        label: "Startup Pitch (To Investors)",
        note: "Pitch, not apply for a loan.",
      },
      { label: "Business Growth" },
    ],
    color: "border-blue-600",
    link: "/business-loans",
  },
  {
    icon: <User className="w-6 h-6 text-green-600" />,
    title: "Personal Loans",
    description: "Quick personal funding for education or emergencies.",
    types: [
      { label: "Education", icon: <Book className="w-4 h-4 inline" /> },
      {
        label: "Emergency",
        icon: <AlertTriangle className="w-4 h-4 inline" />,
      },
    ],
    color: "border-green-600",
    link: "/personal-loans",
  },
  {
    icon: <Car className="w-6 h-6 text-orange-600" />,
    title: "Asset Financing",
    description: "Get funding for cars, homes, or land.",
    types: [
      { label: "Car Log Book Loans", icon: <Car className="w-4 h-4 inline" /> },
      { label: "Nunua / Jenga", icon: <Home className="w-4 h-4 inline" /> },
      {
        label: "Land Financing",
        icon: <Building2 className="w-4 h-4 inline" />,
      },
    ],
    color: "border-orange-600",
    link: "/asset-financing",
  },
];

const dummyLoans = {
  pending: [
    { id: 1, name: "Car Loan - Toyota", amount: "$10,000" },
    { id: 2, name: "Education Loan - College", amount: "$5,000" },
  ],
  approved: [
    { id: 3, name: "Business Expansion", amount: "$20,000" },
    { id: 4, name: "Land Purchase", amount: "$15,000" },
  ],
  denied: [
    { id: 5, name: "Startup Pitch - Rejected", amount: "$0" },
  ],
};

const Loan: FC = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<"pending" | "approved" | "denied">("pending");

  const tabStyles = (tab: string) =>
    `py-2 px-4 font-semibold transition ${
      selectedTab === tab
        ? "bg-blue-600 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`;

  return (
    <div className="min-h-screen bg-slate-100  ">
      <AccountNavbar />
      <AccountSidebar />

      <div className="p-6 sm:mx-[3rem] md:mx-[5rem]">
        <Title title="YOUR LOANS" />
        
        <div className="grid grid-cols-3 status">
          <button className={tabStyles("pending")} onClick={() => setSelectedTab("pending")}>
            PENDING
          </button>
          <button className={tabStyles("approved")} onClick={() => setSelectedTab("approved")}>
            APPROVED
          </button>
          <button className={tabStyles("denied")} onClick={() => setSelectedTab("denied")}>
            DENIED
          </button>
        </div>

        <div className="bg-white card p-4 rounded-sm border-b border-r border-l border-neutral-300  mb-10 h-[300px] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-3 capitalize">{selectedTab} Loans</h3>
          <ul className="space-y-2">
            {dummyLoans[selectedTab].map((loan) => (
              <li key={loan.id} className="text-sm text-gray-800 border-b border-neutral-300 py-2 flex justify-between">
                <span>{loan.name}</span>
                <span className="font-medium">{loan.amount}</span>
              </li>
            ))}
          </ul>
        </div>

        <Title title="Explore Our Loan Options" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
          {loanCategories.map((category, index) => (
            <div
              key={index}
              className={`bg-white card hover:shadow-sm shadow rounded-sm p-6 border-l-4  border-t border-b border-r  ${category.color} transition`}
            >
              <div className="flex items-center gap-3 mb-3">
                {category.icon}
                <h2 className="text-xl font-semibold text-gray-700">
                  {category.title}
                </h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {category.description}
              </p>
              <ul className="space-y-2">
                {category.types.map((type, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
                    {type.icon}
                    {type.label}
                    {type.note && (
                      <span className="text-xs text-gray-400 ml-1 italic">
                        ({type.note})
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              <button
                className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl transition duration-300"
                onClick={() => navigate(`${category.link}`)}
              >
                {category.title.includes("Startup") ? "Pitch Now" : "Apply Now"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loan;
