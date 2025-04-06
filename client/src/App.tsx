import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Authentication/Login/Login";
import Signup from "./pages/Authentication/Signup/Signup";
import MyInvestments from "./pages/MyInvestments/MyInvestments";
import Home from "./pages/Home/Home";
import Loan from "./pages/Loans/Loan";
import PersonalLoans from "./pages/AccountPages/PersonalLoans/PersonalLoans";
import BusinessLoans from "./pages/AccountPages/BusinessLoans/BusinessLoans";
import AssetFinancing from "./pages/AccountPages/AssetFinancing/AssetFinancing";
import InvestorsPage from "./pages/AccountPages/InvestorsPage/InvestorsPage";
import LoanApplication from "./pages/LoanApplication/LoanApplication";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/loans" element={<Loan />} />
          <Route path="/myinvestments" element={<MyInvestments />} />
          <Route path="/personal-loans" element={<PersonalLoans />} />
          <Route path="/asset-financing" element={<AssetFinancing />} />
          <Route path="/business-loans" element={<AssetFinancing />} />
          <Route path="/account/investors" element={<InvestorsPage />} />
          <Route path="/account/loan-application" element={<LoanApplication/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
