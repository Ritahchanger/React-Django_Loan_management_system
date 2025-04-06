import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountNavbar from "../../Layout/AccountNavbar";
import AccountSidebar from "../../Layout/AccountSidebar";
import Title from "../../components/Title/Title";
import "./loan.css";

const dummyLoans = {
  pending: [
    { id: 1, name: "Car Loan - Toyota", amount: "$10,000" },
    { id: 2, name: "Education Loan - College", amount: "$5,000" },
  ],
  approved: [
    { id: 3, name: "Business Expansion", amount: "$20,000" },
    { id: 4, name: "Land Purchase", amount: "$15,000" },
  ],
  denied: [{ id: 5, name: "Startup Pitch - Rejected", amount: "$0" }],
};

const loanCategoryData = {
  business: [
    { id: 6, name: "Business Loan - Cafe Setup", amount: "$12,000" },
    { id: 7, name: "Inventory Restocking", amount: "$8,000" },
  ],
  personal: [
    { id: 8, name: "Wedding Loan", amount: "$6,500" },
    { id: 9, name: "Medical Emergency", amount: "$3,200" },
  ],
  assetFinancing: [
    { id: 10, name: "Car Lease", amount: "$14,000" },
    { id: 11, name: "Machinery Purchase", amount: "$18,000" },
  ],
};

const Loan: FC = () => {
  const navigate = useNavigate();
  const [selectedStatusTab, setSelectedStatusTab] = useState<
    "pending" | "approved" | "denied"
  >("pending");
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<
    "business" | "personal" | "assetFinancing"
  >("business");

  const tabStyles = (activeTab: string, currentTab: string) =>
    `py-2 px-4 font-semibold transition ${
      activeTab === currentTab
        ? "bg-blue-600 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`;

  return (
    <div className="min-h-screen">
      <AccountNavbar />
      <AccountSidebar />

      <div className="p-6 sm:mx-[3rem] md:mx-[5rem]">
        {/* Loan Status Section */}
        <Title title="YOUR LOANS" />
        <div className="grid grid-cols-3 status">
          <button
            className={tabStyles(selectedStatusTab, "pending")}
            onClick={() => setSelectedStatusTab("pending")}
          >
            PENDING
          </button>
          <button
            className={tabStyles(selectedStatusTab, "approved")}
            onClick={() => setSelectedStatusTab("approved")}
          >
            APPROVED
          </button>
          <button
            className={tabStyles(selectedStatusTab, "denied")}
            onClick={() => setSelectedStatusTab("denied")}
          >
            DENIED
          </button>
        </div>

        <div className="bg-white card p-4 rounded-sm border border-neutral-300 mb-10 h-[300px] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-3 capitalize">
            {selectedStatusTab} Loans
          </h3>
          <ul className="space-y-2">
            {dummyLoans[selectedStatusTab].map((loan) => (
              <li
                key={loan.id}
                className="text-sm text-gray-800 border-b border-neutral-300 py-2 flex justify-between"
              >
                <span>{loan.name}</span>
                <span className="font-medium">{loan.amount}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Loan Category Section */}
        <Title title="YOUR LOAN CATEGORIES" />
        <div className="grid grid-cols-3 status">
          <button
            className={tabStyles(selectedCategoryTab, "business")}
            onClick={() => setSelectedCategoryTab("business")}
          >
            BUSINESS LOANS
          </button>
          <button
            className={tabStyles(selectedCategoryTab, "personal")}
            onClick={() => setSelectedCategoryTab("personal")}
          >
            PERSONAL LOANS
          </button>
          <button
            className={tabStyles(selectedCategoryTab, "assetFinancing")}
            onClick={() => setSelectedCategoryTab("assetFinancing")}
          >
            ASSET FINANCING
          </button>
        </div>

        <div className="bg-white card p-4 rounded-sm border border-neutral-300 mb-10 h-[300px] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-3 capitalize">
            {selectedCategoryTab} Loans
          </h3>
          <ul className="space-y-2">
            {loanCategoryData[selectedCategoryTab].map((loan) => (
              <li
                key={loan.id}
                className="text-sm text-gray-800 border-b border-neutral-300 py-2 flex justify-between"
              >
                <span>{loan.name}</span>
                <span className="font-medium">{loan.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Loan;
