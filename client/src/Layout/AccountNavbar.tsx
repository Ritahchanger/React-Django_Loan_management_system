import React, { Fragment } from "react";

import { Link } from "react-router-dom";

import { Moon, Sun } from "lucide-react";

import "./accountNavbar.css"

import { useNavigate } from "react-router-dom";

import { User } from "lucide-react";

import { useTheme } from "../context/ThemeContext";

const AccountNavbar = () => {
  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();

  return (
    <Fragment>
      <div className="h-[50px] shadow-md bg-blue-800 fixed w-full px-[1rem] account-nav">
        <div className="flex justify-between items-center h-full ">
          <div>
            <div className="text-xl font-bold logo">
              <Link to="/">LOANN</Link>
            </div>
          </div>

          <div className="flex items-center h-full justify-center text-neutral-600">
            <div className="h-full flex justify-center items-center mr-[2rem]">
              <button
                className="common-button mr-[1.2rem]"
                onClick={() => {
                  navigate("/");
                }}
              >
                HOME
              </button>
              <p className="text-neutral-600">ID:79123JDSADEEWR</p>
            </div>
            <div className="flex justify-center mr-[1rem]">
              <button
                onClick={() => {
                  toggleTheme();
                }}
              >
                { theme === "light" ? <Moon /> : <Sun/> }
              </button>
            </div>
            <div className="flex items-center">
              <User />
              <p className="ml-[1rem] font-semibold ">Priscila Njiru</p>
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
