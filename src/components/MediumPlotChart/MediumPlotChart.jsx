import React, { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const MediumPlotChart = ({ dataGroup }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedColumn, setSelectedColumn] = useState("");
    const [chartType, setChartType] = useState("bar"); // Add chartType state
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

                        console.log(
                            "data:",
                            results.data.map((item) => item["Height (cm)"])
                          );

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
            // Initialize selectedColumn with the first option from the respective data group
            let firstOption = "";
            if (dataGroup === 4) {
                const availableOptions = ["Height_(cm)", "Weight_(kg)", "BMI"];
                firstOption = availableOptions.find(option => data[0][option] !== null && data[0][option] !== undefined);
            } else if (dataGroup === 5) {
                const availableOptions = ["Alcohol_Consumption", "Fruit_Consumption", "Green_Vegetables_Consumption", "FriedPotato_Consumption"];
                firstOption = availableOptions.find(option => data[0][option] !== null && data[0][option] !== undefined);
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
        
        // Extract data for the selected column based on the data group
        const columnData = data.map((item) => item[selectedColumn]);
        
        // Filter out null and undefined values
        const filteredData = columnData.filter(
            (value) => value !== null && value !== undefined
        );
        
        // Calculate the frequency of each value
        const valueCounts = filteredData.reduce((counts, value) => {
            counts[value] = (counts[value] || 0) + 1;
            return counts;
        }, {});
        
        // Extract unique values and sort them
        const uniqueValues = Object.keys(valueCounts).sort();
        
        // Extract data for the chart
        const seriesData = uniqueValues.map((value) => ({
            name: value,
            y: valueCounts[value],
        }));
        
        // Render the chart
        const options = {
            chart: {
                type: chartType,
                backgroundColor: "#98ABEE",
                borderRadius: 10,
            },
            title: {
                text: selectedColumn,
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
                categories: uniqueValues,
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
                    categories: valueCounts,
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
        
        return (
            <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartRef}
            />
        );
    };
    
    
    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div id="chart-container" style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: 10, right: "20px", zIndex: 1000 }}>
        <select value={selectedColumn} onChange={handleColumnChange} style={{ color: "black" }}>
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
        <select value={chartType} onChange={handleChartTypeChange} style={{ color: "black" }}>
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
