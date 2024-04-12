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
      if (dataGroup === 4) {
        const availableOptions = ["Height_(cm)", "Weight_(kg)", "BMI"];
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

    const options = {
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
        pie: {
          colors: [
            "#5FC6E6",
            "#07216A",
            "#8595F0",
            "#651997",
            "#1D56F6",
            "#8c564b",
          ],
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

    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />
    );
  };

  return (
    <div
        className="medium-chart" 
        style={{
        position: "relative",
        minWidth: 0,
        }}
    >
      <div
        id="chart-container"
        style={{ position: "relative", flex: 1, minWidth: "0" }}
      >
        <div style={{ position: "absolute", top: 10, right: "20px", zIndex: 1000 }}>
          <select
            value={selectedColumn}
            onChange={handleColumnChange}
            style={{ color: "black" }}
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
                <option value="Alcohol_Consumption">Alcohol Consumption</option>
                <option value="Fruit_Consumption">Fruit Consumption</option>
                <option value="Green_Vegetables_Consumption">Green Vegetables Consumption</option>
                <option value="FriedPotato_Consumption">Fried Potato Consumption</option>
              </>
            )}
          </select>
        </div>
        <div style={{ position: "absolute", zIndex: 3000, top: "10px", left: "20px" }}>
          <select
            value={chartType}
            onChange={handleChartTypeChange}
            style={{ color: "black" }}
          >
            <option value="bar" style={{ color: "black" }}>
              Bar Chart
            </option>
            <option value="pie" style={{ color: "black" }}>
              Pie Chart
            </option>
            <option value="area" style={{ color: "black" }}>
              Area
            </option>
          </select>
        </div>
        {renderChart()}
      </div>
    </div>
  );
};

export default MediumPlotChart;
