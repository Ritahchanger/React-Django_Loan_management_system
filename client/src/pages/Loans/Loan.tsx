import { FC, useState } from "react";

import { useNavigate } from "react-router-dom";
import AccountNavbar from "../../Layout/AccountNavbar";
import AccountSidebar from "../../Layout/AccountSidebar";
import Title from "../../components/Title/Title";
import "./loan.css"


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
    <div className="min-h-screen  ">
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

      

        
      </div>
    </div>
  );
};

export default Loan;
