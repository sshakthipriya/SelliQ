import "./App.css";
import Home from "./modules/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Features from "./modules/Features";

function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
      </Routes>
    </Router>
  );
}

export default App;
