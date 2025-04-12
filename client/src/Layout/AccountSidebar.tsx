import {
  FileText,
  FilePlus,
  Calculator,
  Users,
  FolderKanban,
  ChartBar,
  LineChart,
  Megaphone,
} from "lucide-react";
import { Link } from "react-router-dom";
import { IRoute } from "../types/Routes.interface";
import "./AccountSidebar.css";

import { useSelector } from "react-redux";
import { RootState } from "../store/redux/Store";

const AccountSidebar = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const { isSidebarShown } = useSelector((state: RootState) => state.sidebar);

  const accountRoutes: IRoute[] = [
    {
      id: 1,
      path: "/loans",
      name: "Loans Overview Page",
      icon: <FileText />,
      color: "text-green-500",
    },
    {
      id: 2,
      path: "/account/loan-application",
      name: "Loan Application",
      icon: <FilePlus />,
      color: "text-red-500",
    },
    // {
    //   id: 3,
    //   path: "/account/loan-calculator",
    //   name: "Loan Calculator",
    //   icon: <Calculator />,
    //   color: "text-blue-500",
    // },
    {
      id: 4,
      path: "/account/projects",
      name: "Projects",
      icon: <FolderKanban />,
      color: "text-blue-500",
    },
    {
      id: 5,
      path: "/account/project-pitching",
      name: "Project Pitching",
      icon: <ChartBar />,
      color: "text-blue-500",
    },
    {
      id: 6,
      path: "/account/myinvestments",
      name: "My Investments",
      icon: <LineChart />,
      color: "text-blue-500",
    },
    {
      id: 10,
      path: "/account/pitches",
      name: "Pitches",
      icon: <Megaphone />,
      color: "text-blue-500",
    },
    {
      id: 8,
      path: "/account/investors",
      name: "Investors",
      icon: <Users />,
      color: "text-green-500",
    },
  ];

  const role = user.role;
  const filteredRoutes =
    role === "borrower"
      ? accountRoutes.filter(
          (route) => route.id !== 6 && route.id !== 8 && route.id !== 7
        )
      : accountRoutes;

  return (
    <div
      className={`fixed w-[60px] sidebar h-full shadow-lg z-20 p-[0.5rem]  bg-white ${
        !isSidebarShown ? "hidden" : "visible"
      }`}
    >
      <ul className="flex flex-col items-center border border-neutral-300 rounded-md">
        {filteredRoutes.map((link, index) => (
          <li
            key={index}
            className="w-full h-[60px] flex justify-center items-center relative  group"
          >
            <Link
              to={link.path}
              className="flex flex-col items-center w-full h-full justify-center"
            >
              <div className={`text-2xl ${link.color}`}>{link.icon}</div>
              <p className="absolute left-[56px] top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-green-500 text-white px-2 py-1 rounded-md text-xs transition-all duration-300 whitespace-nowrap">
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
