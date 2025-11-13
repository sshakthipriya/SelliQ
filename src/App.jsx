import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SideBar from "./components/SideBar";
import Investors from "./modules/Features/Investor/index";
import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <div style={{ display: "flex" }}>
        <SideBar />
        <main style={{ flex: 1, padding: "1rem" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/investors" />} />
            <Route path="/investors" element={<Investors />} />
            {/* <Route path="/emails-sense" element={<EmailsSense />} /> */}
            {/* <Route path="/competitors" element={<Competitors />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
