import React, { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const WidePlotChart = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("General_Health");
  const [chartType, setChartType] = useState("bar"); // Default to bar chart
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
      renderChart();
    }
  }, [isLoading, data, selectedCategory, chartType]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const renderChart = () => {
    if (!data.length) return;

    // Extract categories based on the selected category
    const categories = data.map((item) => item[selectedCategory]);

    // Filter out null and undefined values
    const filteredCategories = categories.filter(
      (category) => category !== null && category !== undefined
    );

    // Calculate the frequency of each category
    const categoryCounts = filteredCategories.reduce((counts, category) => {
      // HORIZONTAL AXIS
      counts[category] = (counts[category] || 0) + 1;
      return counts;
    }, {});

    // Extract unique categories and sort them
    const uniqueCategories = Object.keys(categoryCounts).sort(); // VERTICAL AXIS

    // Extract data for the selected column
    const seriesData = uniqueCategories.map((category) => ({
      name: category,
      y: categoryCounts[category],
    }));

    // Render the chart
    const options = {
      chart: {
        type: chartType,
        backgroundColor: "#98ABEE", // Lighter shade of #0a3791
        borderRadius: 10, // Set border radius to 10px
      },
      title: {
        text: selectedCategory, // Update chart title with the selected category
        style: {
          color: "white", // Font color set to white
        },
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        series: {
          turboThreshold: 200000, // Number of data points
          color: "#59c3ff",
          borderWidth: 0, // Remove border around bars
        },
        pie: {
          colors: [
            "#5FC6E6",
            "#07216A",
            "#8595F0",
            "#651997",
            "#1D56F6",
            "#8c564b",
          ], // Adjusted colors for pie chart slices
        },
      },
      legend: {
        itemStyle: {
          color: "white", // Legend text color set to white
        },
      },
      xAxis: {
        categories: uniqueCategories,
        title: {
          text: "Category",
          style: {
            color: "white", // Font color set to white
          },
        },
        labels: {
          style: {
            color: "white", // Font color set to white
          },
        },
      },
      yAxis: {
        title: {
          categories: categoryCounts,
          text: "Frequency",
          style: {
            color: "white", // Font color set to white
          },
        },
        labels: {
          style: {
            color: "white", // Font color set to white
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

    if (chartRef.current) {
      const chart = chartRef.current.chart;
      const containerWidth = chartRef.current.clientWidth;
      chart.setSize(containerWidth, 300); // Set width dynamically, height will adjust automatically
    }

    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />
    );
  };

  return (
    <div className="wide-chart">
      <div className="chart-container">
        {isLoading ? (
          <div className="loading-animation"></div>
        ) : (
          <>
            <div className="data-type">
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                style={{ color: "black" }}
              >
                <option value="General_Health">General Health</option>
                <option value="Checkup">Checkup</option>
                <option value="Exercise">Exercise</option>
                <option value="Heart_Disease">Heart Disease</option>
                <option value="Skin_Cancer">Skin Cancer</option>
                <option value="Other_Cancer">Other Cancer</option>
                <option value="Depression">Depression</option>
                <option value="Diabetes">Diabetes</option>
                <option value="Arthritis">Arthritis</option>
                <option value="Sex">Sex</option>
                <option value="Age_Category">Age Category</option>
                <option value="Smoking_History">Smoking History</option>
              </select>
            </div>
            <div className="chart-type">
              <select
                value={chartType}
                onChange={handleChartTypeChange}
                style={{ color: "black" }}
              >
                <option value="bar">Bar Chart</option>
                <option value="pie">Pie Chart</option>
                <option value="area">Area</option>
              </select>
            </div>
            {renderChart()}
          </>
        )}
      </div>
    </div>
  );  
};

export default WidePlotChart;
