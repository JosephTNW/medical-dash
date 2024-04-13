import React, { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const MediumPlotChart = ({ dataGroup }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColumn, setSelectedColumn] = useState("");
  const [chartType, setChartType] = useState("bar");
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/clean_cardiovasc-disease-pred.csv");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvData = await response.text();
        Papa.parse(csvData, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            setData(results.data);
            setIsLoading(false);
          },
        });
      } catch (error) {
        console.error("Error fetching CSV data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading && data.length > 0) {
      let firstOption = "";
      // 4 & 5 = NUMERICAL 
      if (dataGroup === 4) {
        const availableOptions = [
          "Height_(cm)", 
          "Weight_(kg)", 
          "BMI"
        ];
        firstOption = availableOptions.find(
          (option) =>
            data[0][option] !== null && data[0][option] !== undefined
        );
      } else if (dataGroup === 5) {
        const availableOptions = [
          "Alcohol_Consumption",
          "Fruit_Consumption",
          "Green_Vegetables_Consumption",
          "FriedPotato_Consumption",
        ];
        firstOption = availableOptions.find(
          (option) =>
            data[0][option] !== null && data[0][option] !== undefined
        );
      // 6 & 7 CATEGORICAL
      } else if (dataGroup === 6) {
        console.log("Data for dataGroup 6:", data);
        const availableOptions = [
          "General_Health",
          "Checkup",
          "Exercise",
        ];
        firstOption = availableOptions.find(
          (option) =>
            data[0][option] !== null && data[0][option] !== undefined
        );
      } else if (dataGroup === 7) {
        const availableOptions = [
          "Sex", 
          "Age_Category",
          "Smoking_History"
        ];
        firstOption = availableOptions.find(
          (option) =>
            data[0][option] !== null && data[0][option] !== undefined
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
    if (!data.length) return;

    const columnData = data.map((item) => item[selectedColumn]);

    let options;
    if (isNumericalColumn(selectedColumn)) {
      options = renderNumericalChart(columnData);
    } else {
      options = renderCategoricalChart(columnData);
    }

    return <HighchartsReact highcharts={Highcharts} options={options} />;
  };

  const isNumericalColumn = (column) => {
    return (
      ["Height_(cm)", "Weight_(kg)", "BMI"].includes(column) ||
      column.endsWith("_Consumption")
    );
  };

  const renderNumericalChart = (columnData) => {
    const filteredData = columnData.filter(
      (value) => value !== null && value !== undefined
    );

    const valueCounts = filteredData.reduce((counts, value) => {
      counts[value] = (counts[value] || 0) + 1;
      return counts;
    }, {});

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
        backgroundColor: "#98ABEE",
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
    const filteredData = columnData.filter(
      (value) => value !== null && value !== undefined
    );

    const categories = [...new Set(filteredData)];

    const seriesData = categories.map((category) => ({
      name: category,
      y: filteredData.filter((value) => value === category).length,
    }));

    return {
      chart: {
        type: chartType,
        backgroundColor: "#98ABEE",
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
        categories: categories,
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
                    <option value="Height_(cm)">Height</option>
                    <option value="Weight_(kg)">Weight</option>
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
