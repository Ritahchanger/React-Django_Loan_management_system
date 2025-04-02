import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Authentication/Login/Login";
import Home from "./pages/Home/Home";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
