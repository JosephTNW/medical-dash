import React from 'react';
import MediumPlotChart from '../MediumPlotChart/MediumPlotChart';
import SmallPlotChart from '../SmallPlotChart/SmallPlotChart';

const ThreeCharts = ({ leftDataGroup, rightDataGroup, countResults }) => {
  // Check if data and data.count_results are defined
  if (!countResults) {
    return null; // Render nothing if data is undefined or count_results is undefined
  }

  /*
  // Extracting specific data from countResults
  const leftChartData = data.count_results[leftDataGroup];
  const rightChartData = data.count_results[rightDataGroup];*/

  return (
    <div className="two-chart">
      {/* Pass leftChartData to the first MediumPlotChart */}
      <SmallPlotChart leftDataGroup={leftDataGroup} countResults={countResults} />
      {/* Pass rightChartData to the second MediumPlotChart */}

    </div>
  );
};

export default ThreeCharts;
