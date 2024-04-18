import React from "react";
import WelcomePanel from "../WelcomePanel/WelcomePanel";
import TwoCharts from "../TwoCharts/TwoCharts";
import WideChart from "../WideChart/WideChart";
import ThreeCharts from "../ThreeCharts/ThreeCharts";
// import Form from "../Form/Form";
import HealthForm from "../Form/HealthForm";
import PatientsList from "../PatientsList/PatientsList";

class MainSection extends React.Component {
  render() {
    const { selected } = this.props;

    if (selected === "Dashboard") {
      return (
        <div className="mainsection">
          <WelcomePanel />
          <TwoCharts />
          <WideChart />
          <ThreeCharts />
        </div>
      );
    } else if (selected === "Manage") {
      return (
        <div className="mainsection">
          <PatientsList />
        </div>
      );
    } else {
      return (
        <div className="mainsection">
          {/* <Form /> */}
          <HealthForm />
        </div>
      );
    }
  }
}

export default MainSection;
