import "./index.scss";
import { useNavigate } from "react-router-dom";
 
const Home = () => {
  const navigate = useNavigate();
 
  const handleNavigationToFeatures = () => {
    navigate("/features");
  };
  return (
    <div className="home">
      <div className="title">
        <h1>SelliQ</h1>
        <p>
          Supercharge your sales team <span>with AI</span>
        </p>
      </div>
        <button className="get-started" onClick={handleNavigationToFeatures}>
          Get Started{" "}
        </button>
    </div>
  );
};
 
export default Home;
 