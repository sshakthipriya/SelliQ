import "./index.scss";
import { Tabs } from "antd";
import "antd/dist/reset.css";
import Investor from "./Investor";
import Monitor from "./Monitor";

const Features = () => {
  return (
    <div className="features">
      <h1>Features Offered</h1>
      <Tabs defaultActiveKey="1" type="line">
        <Tabs.TabPane tab="Investor Suggestion" key="1">
          <Investor/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Email Insights Tracker" key="2">
          <p>Get deep insights for your emails.</p>
        </Tabs.TabPane>
          <Tabs.TabPane tab="Competitor Monitoring" key="3">
          <Monitor/>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Features;
