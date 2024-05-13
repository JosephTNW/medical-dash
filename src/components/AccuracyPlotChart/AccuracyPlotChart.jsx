import React, { useState, useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const AccuracyPlotChart = ({ accuracyResults }) => {
  console.log("AccuracyPlotChart - accuracyResults:", accuracyResults);

  const [isLoading, setIsLoading] = useState(true);
  const [maxScore, setMaxScore] = useState(0);
  const chartRef = useRef(null);

  useEffect(() => {
    if (accuracyResults && Object.keys(accuracyResults).length > 0) {
      const scores = Object.values(accuracyResults).flatMap(scores => [scores.train_accuracy_score, scores.test_accuracy_score]);
      const max = Math.max(...scores);
      setMaxScore(max);
      setIsLoading(false);
      console.log("Data loaded successfully. isLoading set to false.");
    }
  }, [accuracyResults]);

  const renderChart = () => {
    if (isLoading) {
      console.log("Data is loading");
      return <div className="loading-animation"></div>;
    }

    const categories = Object.keys(accuracyResults);
    const seriesData = [
      { name: 'test_accuracy_score', data: categories.map(category => accuracyResults[category].test_accuracy_score || 0) },
      { name: 'train_accuracy_score', data: categories.map(category => accuracyResults[category].train_accuracy_score || 0) }
    ];

    const options = {
        chart: {
          type: 'bar',
          backgroundColor: "#3b69c5",
        },
        title: {
          text: 'Classifier Scores - Accuracy Comparison',
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

export default AccuracyPlotChart;