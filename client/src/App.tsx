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
import ProjectPitching from "./pages/ProjectPitching/ProjectPitching";
import ProtectedRoute from "./Protected/Protected";
import Project from "./pages/Projects/Project";
import AllPitches from "./pages/AccountPages/Pitches/Pitches";

import Profile from "./pages/Profile/Profile";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/loans" element={<Loan />} />
            <Route path="/account/myinvestments" element={<MyInvestments />} />
            <Route path="/account/projects" element={<Project />} />
            <Route path="/personal-loans" element={<PersonalLoans />} />
            <Route path="/account/profile" element={<Profile />} />
            <Route path="/asset-financing" element={<AssetFinancing />} />
            <Route path="/business-loans" element={<BusinessLoans />} />
            <Route path="/account/investors" element={<InvestorsPage />} />
            <Route
              path="/account/loan-application"
              element={<LoanApplication />}
            />
            <Route
              path="/account/project-pitching"
              element={<ProjectPitching />}
            />
            <Route path="/account/pitches" element={<AllPitches />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
