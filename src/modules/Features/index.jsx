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
        <Tabs.TabPane tab="Feature1" key="1">
          <Investor/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Feature2" key="2">
          <Monitor/>
        </Tabs.TabPane>
          <Tabs.TabPane tab="Feature3" key="3">
          <p>Get deep insights into your sales performance with real-time analytics.</p>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Features;
