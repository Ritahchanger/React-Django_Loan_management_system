import { ReactNode, useState } from "react";
import AccountNavbar from "./AccountNavbar";
import AccountSidebar from "./AccountSidebar";
import Back from "./Back";

const AccountLayout = ({ children }: { children: ReactNode }) => {
  const [sidebar, setSidebar] = useState<boolean>(false); 
  const toggleSidebar = ()  => {
    console.log(sidebar);
    setSidebar((prev) => !prev); // Renamed for clarity
  };

  return (
    <div>
      <AccountNavbar toggleSidebar={toggleSidebar} sidebar={sidebar} />
      <AccountSidebar sidebar={sidebar} />
      <main className="px-[20px]">{children}</main>
      <Back />
    </div>
  );
};

export default AccountLayout;
