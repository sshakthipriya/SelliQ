import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import Investors from "./modules/Features/Investor/index";
import Home from "./modules/Home/index";
import "./App.css";

function LayoutWithSidebar() {
  return (
    <>
      <NavBar />
      <div style={{ display: "flex" }}>
        <SideBar />
        <main style={{ flex: 1, padding: "1rem" }}>
          <Routes>
            <Route path="/investors" element={<Investors />} />
            {/* <Route path="/emails-sense" element={<EmailsSense />} /> */}
            {/* <Route path="/competitors" element={<Competitors />} /> */}
          </Routes>
        </main>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<LayoutWithSidebar />} />
      </Routes>
    </Router>
  );
}

export default App;
