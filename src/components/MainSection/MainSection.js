import React, { useState, useEffect } from "react";
import WelcomePanel from "../WelcomePanel/WelcomePanel";
import TwoCharts from "../TwoCharts/TwoCharts";
import OneChart from "../OneChart/OneChart";
import MediumPlotChart from '../MediumPlotChart/MediumPlotChart';
import WidePlotChart from "../WidePlotChart/WidePlotChart";
import ThreeCharts from "../ThreeCharts/ThreeCharts";
import ManagePage from "../ManagePage/ManagePage";
import HealthForm from "../Form/HealthForm";
import ModelPlotChart from "../ModelPlotChart/ModelPlotChart";

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
    const url = connection_string + "dashContent";
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
        // Extract data from the response

        const countResults = data.count_results;
        const modelResults = data.model_results;
  
        console.log("Count Results:", countResults); // Log countResults here
        console.log("Model Results:", modelResults); // Log modelResults here
  
        console.log("Before setting state"); // Log before setting state
  
        // Set countResults directly in the state
        this.setState({ countResults, modelResults, isLoading: false });
  
        console.log("Dash content fetched successfully:", countResults, modelResults);
  
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
    const { data, isLoading, countResults, modelResults } = this.state;

    console.log("render data for passing prop by MainSection ", data);
    console.log("render count result for passing prop by MainSection", countResults);
    console.log("render model result for passing prop by MainSection", modelResults);

    if (selected === "Dashboard") {
      return (
        <div className="mainsection">
          <WelcomePanel />
          
          <ModelPlotChart modelResults={modelResults} />

          <TwoCharts leftDataGroup={4} rightDataGroup={5}  countResults={countResults} />

          {/* Pass both data and countResults to WidePlotChart */}
          <WidePlotChart  countResults={countResults} />

          <TwoCharts leftDataGroup={6} rightDataGroup={7}  countResults={countResults} />
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
