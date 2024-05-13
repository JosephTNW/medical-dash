import React, { useState, useEffect } from "react";
import WelcomePanel from "../WelcomePanel/WelcomePanel";
import TwoCharts from "../TwoCharts/TwoCharts";
import OneChart from "../OneChart/OneChart";
import MediumPlotChart from '../MediumPlotChart/MediumPlotChart';
import WidePlotChart from "../WidePlotChart/WidePlotChart";
import ThreeCharts from "../ThreeCharts/ThreeCharts";
import ManagePage from "../ManagePage/ManagePage";
import PredictionPage from "../PredictionPage/PredictionPage";
import HealthForm from "../Form/HealthForm";
import ModelPlotChart from "../ModelPlotChart/ModelPlotChart";
import AccuracyPlotChart from "../AccuracyPlotChart/AccuracyPlotChart";

const connection_string = "http://" + process.env.REACT_APP_SERVER_ADD;

class MainSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      countResults: [],
      modelResults: [],
      accuracyResults: [],  // Added state for accuracyResults
      analyzeData: [], // Added state for analyzeData
    };
  }

  fetchData = (url, isAnalyze = false, isEvaluate = false) => {
    this.setState({ isLoading: true });
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
        if (isAnalyze) {
          this.setState({ analyzeData: data, isLoading: false });
        } else if (isEvaluate) {
          const accuracyResults = data.model_results;
          this.setState({ accuracyResults, isLoading: false });
        } else {
          const countResults = data.count_results;
          const modelResults = data.model_results;
          this.setState({ countResults, modelResults, isLoading: false });
        }
        console.log("Data fetched successfully:", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        this.setState({ isLoading: false });
      });
  };

  componentDidMount() {
    this.fetchData(connection_string + "dashContent");

    if (this.props.selected === "Analyze") {
      this.fetchData(connection_string + "analyzeAttributes", true);
    } else if (this.props.selected === "Evaluate") {
      this.fetchData(connection_string + "evaluateContent", false, true);
    }
  }

  render() {
    const { selected } = this.props;
    const { isLoading, countResults, modelResults, analyzeData, accuracyResults } = this.state;

    if (selected === "Dashboard") {
      return (
        <div className="mainsection">
          <WelcomePanel />
          <ModelPlotChart modelResults={modelResults} />
          <TwoCharts leftDataGroup={4} rightDataGroup={5} countResults={countResults} />
          <WidePlotChart countResults={countResults} />
          <TwoCharts leftDataGroup={6} rightDataGroup={7} countResults={countResults} />
        </div>
      );
    } else if (selected === "Manage") {
      return (
        <div className="mainsection flex">
          <ManagePage />
        </div>
      );
    } else if (selected === "Predict") {
      return (
        <div className="mainsection flex">
          <PredictionPage />
        </div>
      );
    } else if (selected === "Evaluate") {
      return (
        <div className="mainsection">
          <ModelPlotChart modelResults={modelResults} />
          <AccuracyPlotChart accuracyResults={accuracyResults} />
          {/* Render components for the evaluate page */}
        </div>
      );
    } else if (selected === "Analyze") {
      return (
        <div className="mainsection">
          <WidePlotChart countResults={countResults} />
          <ThreeCharts data={analyzeData} />
          <ThreeCharts leftDataGroup={6} rightDataGroup={7} countResults={countResults} />
          {/* Render other components that require data from "dashContent" */}
        </div>
      );
    } else {
      return (
        <div className="mainsection">
          {/* Render default components when no tab is selected */}
        </div>
      );
    }
  }
}

export default MainSection;
