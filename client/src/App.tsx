import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Authentication/Login/Login";
import Signup from "./pages/Authentication/Signup/Signup";
import MyInvestments from "./pages/MyInvestments/MyInvestments";
import Home from "./pages/Home/Home";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/myinvestments" element={<MyInvestments />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
