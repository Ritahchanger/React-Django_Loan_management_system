import { ReactNode } from "react";
import AccountNavbar from "./AccountNavbar";
import AccountSidebar from "./AccountSidebar";
const AccountLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <AccountNavbar />
      <AccountSidebar />
      <main>{children}</main>
    </div>
  );
};

export default AccountLayout;
