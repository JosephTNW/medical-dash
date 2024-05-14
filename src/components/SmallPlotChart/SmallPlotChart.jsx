import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import bullet from "highcharts/modules/bullet";

bullet(Highcharts);

const SmallPlotChart = () => {
  const generalHealthData = [
    { category: "Excellent", yes: 1115, no: 54839 },
    { category: "Fair", yes: 6789, no: 29021 },
    { category: "Good", yes: 8643, no: 86721 },
    { category: "Poor", yes: 3602, no: 7729 },
    { category: "Very Good", yes: 4822, no: 105573 }
  ];

  const checkupData = [
    { category: "5 or more years ago", yes: 342, no: 13079 },
    { category: "Never", yes: 58, no: 1349 },
    { category: "Within the past 2 years", yes: 1465, no: 35748 },
    { category: "Within the past 5 years", yes: 471, no: 16971 },
    { category: "Within the past year", yes: 22635, no: 216736 }
  ];

  const exerciseData = [
    { category: "No", yes: 9004, no: 60469 },
    { category: "Yes", yes: 15967, no: 223414 }
  ];

  const heartData = [
    { category: "Yes", yes: 24971, no: 0 },
    { category: "No", yes: 0, no: 283883 }
  ];

  const skinData = [
    { category: "No", yes: 20281, no: 258579 },
    { category: "Yes", yes: 4690, no: 25304 }
  ];

  const otherData = [
    { category: "No", yes: 20256, no: 258720 },
    { category: "Yes", yes: 4715, no: 25163 }
  ];

  const depressionData = [
    { category: "No", yes: 18870, no: 228083 },
    { category: "Yes", yes: 6101, no: 55800 }
  ];

  const diabetesData = [
    { category: "No", yes: 16499, no: 249538 },
    { category: "Yes", yes: 8472, no: 34345 }
  ];

  const arthritisData = [
    { category: "No", yes: 10719, no: 197064 },
    { category: "Yes", yes: 14252, no: 86819 }
  ];

  const sexData = [
    { category: "Female", yes: 9898, no: 150298 },
    { category: "Male", yes: 15073, no: 133585 }
  ];

  const ageData = [
    { category: "18-24", yes: 94, no: 18587 },
    { category: "25-29", yes: 113, no: 15381 },
    { category: "30-34", yes: 201, no: 18227 },
    { category: "35-39", yes: 274, no: 20332 },
    { category: "40-44", yes: 435, no: 21160 },
    { category: "45-49", yes: 678, no: 20290 },
    { category: "50-54", yes: 1181, no: 23916 },
    { category: "55-59", yes: 1991, no: 26063 },
    { category: "60-64", yes: 3012, no: 29406 },
    { category: "65-69", yes: 3823, no: 29611 },
    { category: "70-74", yes: 4561, no: 26542 },
    { category: "75-79", yes: 3752, no: 16953 },
    { category: "80+", yes: 4856, no: 17415 },
  ];

  const smokingData = [
    { category: "No", yes: 10387, no: 173203 },
    { category: "Yes", yes: 14584, no: 110680 }
  ];

  const renderBulletChart = (columnData, selectedColumn) => {
    return {
      chart: {
        type: "column",
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
      xAxis: {
        categories: columnData.map((item) => item.category),
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
          text: "Ratio",
          style: {
            color: "white",
          },
        },
        labels: {
          format: "{value:.2f}",
          style: {
            color: "white",
          },
        },
        max: 1, // Set maximum value of y-axis to 1
        // reversed: true,
      },
      plotOptions: {
        column: {
          stacking: "normal",
          dataLabels: {
            enabled: true,
            color: "white",
            style: {
                fontSize: "14px", // Increase font size
                textOutline: "none", // Remove text outline
              },
            formatter: function () {
              return Highcharts.numberFormat(this.y, 2); // Format value with 2 decimal places
            },
          },
        },
      },
      series: [
        {
          name: "No Risk",
          data: columnData.map((data) => data.no / (data.yes + data.no)),
          color: "green",
          showInLegend: true,
        },
        {
          name: "At Risk",
          data: columnData.map((data) => data.yes / (data.yes + data.no)),
          color: "red",
          showInLegend: true,
        },
      ],
      legend: {
        itemStyle: {
          color: "white", // Set legend label color to white
        },
      },
    };
  };

  const renderChart = (data, columnName) => (
    <div style={{ width: "100%", flexGrow: 1 }}>
      <HighchartsReact
        highcharts={Highcharts}
        options={renderBulletChart(data, columnName)}
      />
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {renderChart(generalHealthData, "General Health")}
        {renderChart(checkupData, "Checkup")}
        {renderChart(exerciseData, "Exercise")}
        {renderChart(heartData, "Heart Disease")}
        {renderChart(skinData, "Skin Cancer")}
        {renderChart(otherData, "Other Cancer")}
        {renderChart(depressionData, "Depression")}
        {renderChart(diabetesData, "Diabetes")}
        {renderChart(arthritisData, "Arthritis")}
        {renderChart(sexData, "Sex")}
        {renderChart(ageData, "Age Category")}
        {renderChart(smokingData, "Smoking History")}
        {/* Add more charts using renderChart */}
      </div>
    </div>
  );
};

export default SmallPlotChart;
