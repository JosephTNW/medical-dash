import React, { useState, useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";


const WidePlotChart = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState("Heart_Disease");
  const [chartType, setChartType] = useState("bar");
  const [isLoading, setIsLoading] = useState(true); // Define isLoading variable
  const chartRef = useRef(null);

  console.log("this is fikin dataa", data);
  
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setSelectedCategory(Object.keys(data)[0]);
      setIsLoading(false);
      console.log("Data loaded successfully. isLoading set to false.");
    }
  }, [data]);

  useEffect(() => {
    if (selectedCategory && data && data[selectedCategory]) {
      renderChart();
    }
  }, [selectedCategory, data, chartType]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const renderChart = () => {
    /*console.log("Inside renderChart function");
    console.log("Selected category:", selectedCategory);*/

    console.log("Rendering chart for category:", selectedCategory);
  
    if (isLoading) {
      console.log("Data is loading");
      return <div className="loading-animation"></div>;
    }
  
    if (!data[selectedCategory]) {
      console.log("Selected category data is missing");
      return null;
    }
  
    console.log("Rendering chart for category:", selectedCategory);

    const columnData = data[selectedCategory];
    console.log("Column data:", columnData);
  
    // Function to render categorical chart
    const renderCategoricalChart = (columnData) => {
      // Aggregate counts for each category
      const categoryCounts = {};
      columnData.forEach((item) => {
        const category = item[selectedCategory];
        categoryCounts[category] = (categoryCounts[category] || 0) + item.category_count;
      });
  
      // Convert counts to series data format
      const seriesData = Object.keys(categoryCounts).map(category => ({
        name: category,
        y: categoryCounts[category],
      }));
  
      return seriesData;
    };
  
    // Render the chart
    const seriesData = renderCategoricalChart(columnData);
    console.log("Series data:", seriesData);


    const options = {
      chart: {
        type: chartType,
        backgroundColor: "#3b69c5", 
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
        categories: columnData.map((item) => item[selectedCategory]),
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
  
    console.log("Chart Options:", options);

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

          <>
            <div className="data-type">
              <select
                className="dropdown-toggle"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="Heart_Disease">Heart Disease</option>
                <option value="Skin_Cancer">Skin Cancer</option>
                <option value="Other_Cancer">Other Cancer</option>
                <option value="Depression">Depression</option>
                <option value="Diabetes">Diabetes</option>
                <option value="Arthritis">Arthritis</option>
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
                <option value="pie">Pie Chart</option>
                <option value="area">Area</option>
              </select>
              <div className="dropdown-toggle-arrow">&#9662;</div>
              {/* The arrow symbol "&#9662;" */}
            </div>
            {renderChart()}
          </>
        
      </div>
    </div>
  );  
};

export default WidePlotChart;
