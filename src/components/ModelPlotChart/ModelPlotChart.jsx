import React, { useState, useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ModelPlotChart = ({ modelResults }) => {
  console.log("ModelPlotChart - modelResults:", modelResults);

  const [isLoading, setIsLoading] = useState(true);
  const [maxScore, setMaxScore] = useState(0);
  const chartRef = useRef(null);

  useEffect(() => {
    if (modelResults && Object.keys(modelResults).length > 0) {
      const scores = Object.values(modelResults).flatMap(scores => [scores.test_f1_score, scores.train_f1_score]);
      const max = Math.max(...scores);
      setMaxScore(max);
      setIsLoading(false);
      console.log("Data loaded successfully. isLoading set to false.");
    }
  }, [modelResults]);

  const renderChart = () => {
    if (isLoading) {
      console.log("Data is loading");
      return <div className="loading-animation"></div>;
    }

    const categories = Object.keys(modelResults);
    const seriesData = [
      { name: 'test_f1_score', data: categories.map(category => modelResults[category].test_f1_score || 0) },
      { name: 'train_f1_score', data: categories.map(category => modelResults[category].train_f1_score || 0) }
    ];

    const options = {
        chart: {
          type: 'bar',
          backgroundColor: "#3b69c5",
        },
        title: {
          text: 'Classifier Scores',
          style: {
            color: 'white'
          }
        },
        credits: {
          enabled: false,
        },
        xAxis: {
          categories: categories,
          title: {
            text: 'Classifiers',
            style: {
              color: 'white'
            }
          },
          labels: {
            style: {
              color: 'white'
            }
          },
        },
        yAxis: {
          title: {
            text: 'Scores',
            style: {
              color: 'white'
            }
          },
          labels: {
            style: {
              color: 'white'
            }
          },
          min: 0,
          max: maxScore
        },
        legend: {
          itemStyle: {
            color: 'white'
          }
        },
        plotOptions: {
            series: {
              borderWidth: 0, // Remove border around bars
            },
          },
        series: seriesData.map((data, index) => ({
          ...data,
          color: index % 2 === 0 ? '#59c3ff' : '#FFD700', // Alternating colors for the bars
        }))
      };
      
      return <HighchartsReact highcharts={Highcharts} options={options} ref={chartRef} />;
      
  };

  return (
    <div className="wide-chart">
      <div className="chart-container">
        {renderChart()}
      </div>
    </div>
  );
};

export default ModelPlotChart;
