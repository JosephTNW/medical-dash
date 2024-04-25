import React, { useState, useEffect } from "react";
import WelcomePanel from "../WelcomePanel/WelcomePanel";
import TwoCharts from "../TwoCharts/TwoCharts";
import OneChart from "../OneChart/OneChart";
import MediumPlotChart from '../MediumPlotChart/MediumPlotChart';
import WidePlotChart from "../WidePlotChart/WidePlotChart";
import ThreeCharts from "../ThreeCharts/ThreeCharts";
import ManagePage from "../ManagePage/ManagePage";
import HealthForm from "../Form/HealthForm";

const connection_string = "http://" + process.env.REACT_APP_SERVER_ADD;


class MainSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
    };
  }

  fetchData = () => {
    this.setState({ isLoading: true });
    const url = connection_string + "countAll";
    console.log("Fetching data from:", url); // Log the URL for debugging

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ data: data, isLoading: false });
        console.log(this.state.data); // Check if data is properly set
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
        this.setState({ isLoading: false });
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { selected } = this.props;
    const { data, isLoading } = this.state;

    console.log("J ", data);

    if (selected === "Dashboard") {
      return (
        <div className="mainsection">
          <WelcomePanel />
          

          <TwoCharts leftDataGroup={4} rightDataGroup={5}  data={data} />

          <WidePlotChart data={data} />

          <TwoCharts leftDataGroup={6} rightDataGroup={7}  data={data} />
        </div>
      );
    } else if (selected === "Manage") {
      return (
        <div className="mainsection flex">
          <ManagePage />
        </div>
      );
    } else {
      return (
        <div className="mainsection flex">
          <HealthForm />
        </div>
      );
    }
  }
}

export default MainSection;
