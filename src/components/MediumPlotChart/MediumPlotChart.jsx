import React, { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import axios from "axios";

const MediumPlotChart = ({ dataGroup }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColumn, setSelectedColumn] = useState("");
  const [chartType, setChartType] = useState("bar");
  const chartRef = useRef(null);


  
  // NEW USE EFFECT HOOK TO FETCH DATA FROM /COUNTALL ENDPOINT
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3050/countAll");
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        /*console.log("Raw response data:", response.data); // Log the raw response data*/
        const data = response.data;
        const formattedData = {};
        for (const column in data) {
          formattedData[column] = data[column];
        }
        setData(formattedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data from API:", error);
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading && Object.keys(data).length > 0) {
      let firstOption = "";
  
      // 4 & 5 NUMERICAL
      if (dataGroup === 4) {
        const availableOptions = ["Height", "Weight", "BMI"];
        firstOption = availableOptions.find(
          (option) => data[option] && data[option].length > 0
        );
      } else if (dataGroup === 5) {
        const availableOptions = [
          "Alcohol_Consumption",
          "Fruit_Consumption",
          "Green_Vegetables_Consumption",
          "FriedPotato_Consumption",
        ];
        firstOption = availableOptions.find(
          (option) => data[option] && data[option].length > 0
        );

      // 6 & 7 CATEGORICAL
      } else if (dataGroup === 6) {
        const availableOptions = ["General_Health", "Checkup", "Exercise"];
        firstOption = availableOptions.find(
          (option) => data[option] && data[option].length > 0
        );
      } else if (dataGroup === 7) {
        const availableOptions = ["Sex", "Age_Category", "Smoking_History"];
        firstOption = availableOptions.find(
          (option) => data[option] && data[option].length > 0
        );
      }
  
      setSelectedColumn(firstOption);
    }
  }, [isLoading, data, dataGroup]);
  

  const handleColumnChange = (event) => {
    setSelectedColumn(event.target.value);
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const renderChart = () => {
    /*console.log("Inside renderChart function");*/
  
    if (isLoading) {
      /*console.log("Data is loading");*/
      return <div className="loading-animation"></div>;
    }
  
    if (!data[selectedColumn]) {
     /* console.log("Selected column data is missing");
      console.log("Selected column:", selectedColumn);
      console.log("Data:", data);*/
      return null;
    }
  
    const columnData = data[selectedColumn];
  
    /*console.log("Column Data:", columnData);*/
  
    let options;
    if (isNumericalColumn(selectedColumn)) {
      options = renderNumericalChart(columnData);
    } else {
      options = renderCategoricalChart(columnData);
    }
  
    return <HighchartsReact highcharts={Highcharts} options={options} />;
  };
  
  
  
  

  const isNumericalColumn = (column) => {
    return ["Height", "Weight", "BMI"].includes(column) || column.endsWith("_Consumption");
  };

  const renderNumericalChart = (columnData) => {
    const valueCounts = {};
    columnData.forEach((item) => {
      const value = item[selectedColumn];
      valueCounts[value] = (valueCounts[value] || 0) + item.category_count;
    });

    const uniqueValues = Object.keys(valueCounts)
      .map(Number)
      .sort((a, b) => a - b);

    const minValue = Math.min(...uniqueValues);
    const maxValue = Math.max(...uniqueValues);

    const xAxisCategories = [];
    for (let i = minValue; i <= maxValue; i++) {
      xAxisCategories.push(Math.round(i));
    }

    const seriesData = xAxisCategories.map((category) => ({
      name: `${category}`,
      y: valueCounts[category] || 0,
    }));

    return {
      chart: {
        type: chartType,
        backgroundColor: "#3b69c5",
        borderRadius: 10,
      },
      title: {
        text: selectedColumn,
        style: {
          color: "white",
        },
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        series: {
          turboThreshold: 200000,
          color: "#59c3ff",
          borderWidth: 0,
        },
      },
      legend: {
        itemStyle: {
          color: "white",
        },
      },
      xAxis: {
        categories: xAxisCategories,
        title: {
          text: "Category",
          style: {
            color: "white",
          },
        },
        labels: {
          style: {
            color: "white",
          },
        },
      },
      yAxis: {
        title: {
          text: "Frequency",
          style: {
            color: "white",
          },
        },
        labels: {
          style: {
            color: "white",
          },
        },
      },
      series: [
        {
          name: "Frequency",
          data: seriesData,
        },
      ],
    };
  };

  const renderCategoricalChart = (columnData) => {
    const seriesData = columnData.map((item) => ({
      name: item[selectedColumn],
      y: item.category_count,
    }));

    return {
      chart: {
        type: chartType,
        backgroundColor: "#3b69c5",
        borderRadius: 10,
      },
      title: {
        text: selectedColumn,
        style: {
          color: "white",
        },
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        series: {
          turboThreshold: 200000,
          color: "#59c3ff",
          borderWidth: 0,
        },
      },
      legend: {
        itemStyle: {
          color: "white",
        },
      },
      xAxis: {
        categories: columnData.map((item) => item[selectedColumn]),
        title: {
          text: "Category",
          style: {
            color: "white",
          },
        },
        labels: {
          style: {
            color: "white",
          },
        },
      },
      yAxis: {
        title: {
          text: "Frequency",
          style: {
            color: "white",
          },
        },
        labels: {
          style: {
            color: "white",
          },
        },
      },
      series: [
        {
          name: "Frequency",
          data: seriesData,
        },
      ],
    };
  };

  return (
    <div className="medium-chart">
      <div className="chart-container">
        {isLoading ? (
          <div className="loading-animation"></div>
        ) : (
          <>
            <div className="data-type">
              <select
                className="dropdown-toggle"
                value={selectedColumn}
                onChange={handleColumnChange}
              >
                {dataGroup === 4 && (
                  <>
                    <option value="Height">Height</option>
                    <option value="Weight">Weight</option>
                    <option value="BMI">BMI</option>
                  </>
                )}
                {dataGroup === 5 && (
                  <>
                    <option value="Alcohol_Consumption">Alcohol</option>
                    <option value="Fruit_Consumption">Fruit</option>
                    <option value="Green_Vegetables_Consumption">
                      Green Vegetables
                    </option>
                    <option value="FriedPotato_Consumption">
                      Fried Potato
                    </option>
                  </>
                )}
                {dataGroup === 6 && (
                  <>
                    <option value="General_Health">General Health</option>
                    <option value="Checkup">Checkup</option>
                    <option value="Exercise">Exercise</option>
                  </>
                )}
                {dataGroup === 7 && (
                  <>
                    <option value="Sex">Sex</option>
                    <option value="Age_Category">Age Category</option>
                    <option value="Smoking_History">Smoking History</option>
                  </>
                )}
              </select>
              <div className="dropdown-toggle-arrow">&#9662;</div>
              {/* The arrow symbol "&#9662;" */}
            </div>

            <div className="chart-type">
              <select
                className="dropdown-toggle"
                value={chartType}
                onChange={handleChartTypeChange}
              >
                <option value="bar">Bar Chart</option>
                <option value="area">Area</option>
              </select>
              <div className="dropdown-toggle-arrow">&#9662;</div>
              {/* The arrow symbol "&#9662;" */}
            </div>
            {renderChart()}
          </>
        )}
      </div>
    </div>
  );
};

export default MediumPlotChart;
