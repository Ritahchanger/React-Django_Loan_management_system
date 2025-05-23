import { ReactNode, useState } from "react";
import AccountNavbar from "./AccountNavbar";
import AccountSidebar from "./AccountSidebar";
import Back from "./Back";

const AccountLayout = ({ children }: { children: ReactNode }) => {
  

  return (
    <div>
      <AccountNavbar  />
      <AccountSidebar />
      <main className="px-[20px]">{children}</main>
      <Back />
    </div>
  );
};

export default AccountLayout;
