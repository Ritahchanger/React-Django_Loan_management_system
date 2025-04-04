import React from "react";
import { FileText, Edit, Calculator, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { IRoute } from "../types/Routes.interface";
import "./AccountSidebar.css";

const AccountSidebar: React.FC = () => {
  const accountRoutes: IRoute[] = [
    {
      path: "/loans",
      name: "Loans Overview Page",
      icon: <FileText />,
      color: "green",
    },
    {
      path: "#",
      name: "Loan Application",
      icon: <Edit />,
      color: "red",
    },
    {
      path: "#",
      name: "Loan Calculator",
      icon: <Calculator />,
      color: "blue",
    },
    {
      path: "/account/investors",
      name: "Investors",
      icon: <Users />,
      color: "green",
    },
  ];

  return (
    <div className="fixed w-[50px] h-full shadow-md bg-white z-20">
      <ul className="flex flex-col items-center ">
        {accountRoutes.map((link, index) => (
          <li
            key={index}
            className="w-full h-[50px] border border-neutral-300 flex justify-center items-center relative mb-[10px] group"
          >
            <Link
              to={link.path}
              className="flex flex-col items-center w-full h-full justify-center"
            >
              <div className={`text-2xl text-${link.color}-500`}>
                {link.icon}
              </div>
              <p className="absolute left-[56px] top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-green-500 text-white px-2 py-1 rounded-md text-xs transition-all duration-300">
                {link.name}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountSidebar;
