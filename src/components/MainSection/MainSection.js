import React from "react";
import WelcomePanel from "../WelcomePanel/WelcomePanel";
import TwoCharts from "../TwoCharts/TwoCharts";
import WideChart from "../WideChart/WideChart";
import ThreeCharts from "../ThreeCharts/ThreeCharts";

const MainSection = () => {
  return (
    <div className="mainsection">
      <WelcomePanel />
      <TwoCharts />
      <WideChart />
      <ThreeCharts />
    </div>
  );
};

export default MainSection;
