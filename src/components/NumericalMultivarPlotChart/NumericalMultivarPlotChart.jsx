import React, { useState, useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const NumericalMultivarPlotChart = ({ numMultivariate }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const chartRef = useRef(null);

  useEffect(() => {
    if (numMultivariate && numMultivariate.length > 0) {
      setIsLoading(false);
      console.log("NumericalPlotChart - Data loaded successfully. isLoading set to false.");
    } else {
      console.log("NumericalPlotChart - No data received");
    }
  }, [numMultivariate]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const renderChart = () => {
    if (!numMultivariate || numMultivariate.length === 0 || isLoading) {
      console.log("NumericalPlotChart - No data or loading");
      return null;
    }

    console.log("NumericalPlotChart - Rendering chart");

    const categories = selectedCategory ? [selectedCategory] : Object.keys(numMultivariate[0]);
    const seriesData = categories.map((category) => ({
      name: category,
      data: numMultivariate.map((data) => data[category]),
    }));

    const options = {
      chart: {
        type: "bar",
        backgroundColor: "#3b69c5",
      },
      title: {
        text: "Numerical Data Comparison",
        style: {
          color: "white",
        },
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        categories: categories,
        title: {
          text: "Features",
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
          text: "Values",
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
      legend: {
        itemStyle: {
          color: "white",
        },
      },
      plotOptions: {
        series: {
          borderWidth: 0, // Remove border around bars
        },
      },
      series: seriesData,
    };

    return <HighchartsReact highcharts={Highcharts} options={options} ref={chartRef} />;
  };

  return (
    <div className="wide-chart">
      <div>
        <label htmlFor="category">Select Category:</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All</option>
          {numMultivariate && numMultivariate.length > 0 && // Check if numMultivariate is defined and not empty
            Object.keys(numMultivariate[0]).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>
      </div>
      <div className="chart-container">{renderChart()}</div>
    </div>
  );
};

export default NumericalMultivarPlotChart;
