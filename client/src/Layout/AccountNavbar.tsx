import React, { Fragment, useState } from "react";

import { X, Menu } from "lucide-react";

import { Link } from "react-router-dom";

import { Moon, Sun, ChevronDown } from "lucide-react";

import "./accountNavbar.css";

import { useNavigate } from "react-router-dom";

import { User } from "lucide-react";

import { useTheme } from "../context/ThemeContext";

import { toggleSidebar } from "../store/slices/SidebarSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/redux/Store";

const AccountNavbar = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { isSidebarShown } = useSelector((state: RootState) => state.sidebar);

  const { theme, toggleTheme } = useTheme();

  const [dropdown, showDropDown] = useState<boolean>(false);

  const handleDropdown = () => {
    showDropDown((prev) => !prev);
  };

  const navigate = useNavigate();

  return (
    <Fragment>
      <div className="h-[50px] shadow-md  fixed w-full px-[1rem] account-nav z-30">
        <div className="flex justify-between items-center h-full ">
          <div className="flex justify-between items-center">
            <button
              className="text-3xl mr-2 cursor-pointer"
              onClick={() => {
                dispatch(toggleSidebar());
              }}
            >
              {isSidebarShown ? <X /> : <Menu />}
            </button>
            <div className="text-xl font-bold logo">
              <Link to="/">User account</Link>
            </div>
          </div>

          <div className="flex items-center h-full justify-center ">
            <div className="h-full flex justify-center items-center mr-[2rem]">
              <button
                className="common-button mr-[1.2rem] hidden md:block"
                onClick={() => {
                  navigate("/");
                }}
              >
                HOME
              </button>
              <p className="">ID:79123JDSADEEWR</p>
            </div>
            <div className="flex justify-center mr-[1rem]">
              <button
                onClick={() => {
                  toggleTheme();
                }}
              >
                {theme === "light" ? <Moon /> : <Sun />}
              </button>
            </div>
            <div className="flex items-center relative h-full">
              <User />
              <p className="ml-[1rem] font-semibold hidden md:block ">
                Priscila Njiru
              </p>
              <button className="ml-[1rem]" onClick={handleDropdown}>
                <ChevronDown />
              </button>

              <div
                className={`bg-white absolute top-[100%] drop-down right-[0rem] md:right-[0rem]   w-[180px]  md:w-full text-sm ${
                  dropdown ? "active" : null
                } `}
              >
                <button className="flex w-full justify-center border-b border-neutral-300 p-[0.4rem]">
                  LOGOUT
                </button>
                <button className="flex w-full justify-center p-[0.4rem]">
                  HOME
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p
        style={{
          paddingTop: "50px",
        }}
      ></p>
    </Fragment>
  );
};

export default AccountNavbar;
