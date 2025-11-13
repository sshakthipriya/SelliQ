import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./index.scss";

import axios from "axios";

const data = [
  {
    id: 1,
    name: "Investor A",
    domain: "devops",
    description: "Investor A invested in vercel",
    location: "US",
    targetCountries: ["US", "India"],
    linkedIn: "https://linkedin.com/in/investorA",
    website: "https://investora.com",
    score: 0.7,
    reason: "Strong portfolio alignment",
    fund_stages: ["Seed", "Series A"],
  },
  {
    id: 2,
    domain: "devops",
    name: "Investor B",
    description: "Investor B invested in Stacktape",
    location: "US",
    targetCountries: ["US", "India"],
    linkedIn: "https://linkedin.com/in/investorB",
    website: "",
    score: 0.5,
    reason: "Interested in AI startups",
    fund_stages: ["Series A", "Series B"],
  },
  {
    id: 3,
    domain: "devops",
    name: "Investor C",
    description: "Investor C invested in Stacktape",
    location: "US",
    targetCountries: ["US", "India"],
    linkedIn: "https://linkedin.com/in/investorC",
    website: "",
    score: 0.9,
    reason: "Looking for early-stage investment",
    fund_stages: ["Pre-seed", "Seed"],
  },
  {
    id: 4,
    domain: "devops",
    name: "Investor D",
    description: "Investor D invested in Stacktape",
    location: "US",
    targetCountries: ["US", "India"],
    linkedIn: "",
    website: "",
    score: 0.3,
    reason: "Focuses on other sectors",
    fund_stages: ["Series C"],
  },
  {
    id: 5,
    domain: "devops",
    location: "US",
    targetCountries: ["US", "India"],
    name: "Investor E",
    description: "Investor E invested in Stacktape",
    linkedIn: "",
    website: "",
    score: 0.3,
    reason: "Focuses on other sectors",
    fund_stages: ["Seed"],
  },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, score, reason } = payload[0].payload;
    return (
      <div className="tooltip">
        <p>
          <strong>{name}</strong>
        </p>
        <p>Probability: {(score * 100).toFixed(0)}%</p>
        <p>{reason}</p>
      </div>
    );
  }
  return null;
};

const Investor = () => {
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://your-api-url.com/investors")
      .then((response) => {
        setInvestors(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching investors:", error);
        setInvestors(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="Investor">
        <p>Loading investor suggestions...</p>
      </div>
    );
  }
  const sorted = [...data].sort((a, b) => b.score - a.score);
  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  return (
    <div className="Investor">
      <h2>
        Here are investor suggestions for{" "}
        <span className="highlight">Revolte</span>!
      </h2>
      <div className="content">
        {/* LEFT PANEL - CARDS */}
        <div className="right-panel">
          <h3>Top 3 Investors</h3>
          <div className="top-cards">
            {top3.map((item) => (
              <div
                key={item.id}
                className={`investor-card ${
                  selectedInvestor?.id === item.id ? "active" : ""
                }`}
                onClick={() => setSelectedInvestor(item)}
              >
                <h4>{item.name}</h4>
                <p>{(item.score * 100).toFixed(0)}% match</p>
              </div>
            ))}
          </div>

          <h3>Other Investors</h3>
          <div className="horizontal-cards">
            {rest.map((item) => (
              <div
                key={item.id}
                className={`h-card ${
                  selectedInvestor?.id === item.id ? "active" : ""
                }`}
                onClick={() => setSelectedInvestor(item)}
              >
                <div>
                  <h5>{item.name}</h5>
                  <p>{(item.score * 100).toFixed(0)}%</p>
                </div>
              </div>
            ))}
          </div>

          {selectedInvestor && (
            <div
              className="popup-overlay"
              onClick={() => setSelectedInvestor(null)}
            >
              <div className="popup-card" onClick={(e) => e.stopPropagation()}>
                <button
                  className="close-btn"
                  onClick={() => setSelectedInvestor(null)}
                >
                  ×
                </button>
                <h3>{selectedInvestor.name}</h3>
                <p>
                  <strong>Description:</strong> {selectedInvestor.description}
                </p>
                <p>
                  <strong>Reason:</strong> {selectedInvestor.reason}
                </p>
                <p>
                  <strong>Fund Stages:</strong>{" "}
                  {selectedInvestor.fund_stages.join(", ")}
                </p>
                <p>
                  <strong>LinkedIn:</strong>{" "}
                  {selectedInvestor.linkedIn ? (
                    <a
                      href={selectedInvestor.linkedIn}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {selectedInvestor.linkedIn}
                    </a>
                  ) : (
                    "Not available"
                  )}
                </p>
                <p>
                  <strong>Target Locations:</strong>{" "}
                  {selectedInvestor.targetCountries.join(", ")}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="chart">
          <ResponsiveContainer>
            <BarChart
              data={sorted}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tickFormatter={(value) =>
                  value.length > 6 ? `${value.substring(0, 6)}…` : value
                }
              />
              <YAxis tickFormatter={(value) => `${value * 100}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" fill="#cc5500" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Investor;
