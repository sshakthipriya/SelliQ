import React from "react";
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

const data = [
  {
    investor: "Investor A",
    probability: 0.7,
    reason: "Strong portfolio alignment",
  },
  {
    investor: "Investor B",
    probability: 0.5,
    reason: "Interested in AI startups",
  },
  {
    investor: "Investor C",
    probability: 0.9,
    reason: "Looking for early-stage investment",
  },
  {
    investor: "Investor D",
    probability: 0.3,
    reason: "Focuses on other sectors",
  },
   {
    investor: "Investor E",
    probability: 0.3,
    reason: "Focuses on other sectors",
  },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { investor, probability, reason } = payload[0].payload;
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        <p>
          <strong>{investor}</strong>
        </p>
        <p>Probability: {(probability * 100).toFixed(0)}%</p>
        <p>Reason: {reason}</p>
      </div>
    );
  }
  return null;
};

const Investor = () => {
  return (
    <div className="Investor">
      <h2>Investor Probability Chart</h2>
      <div className="chart">
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="investor" />
            <YAxis tickFormatter={(value) => `${value * 100}%`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="probability" fill="#cc5500" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Investor;
