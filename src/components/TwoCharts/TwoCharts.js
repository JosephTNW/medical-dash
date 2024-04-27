/*
import React from 'react';
import MediumPlotChart from '../MediumPlotChart/MediumPlotChart';

const TwoCharts = ({ leftDataGroup, rightDataGroup, data }) => {
  return (
    <div className="two-chart">
      <MediumPlotChart leftDataGroup={leftDataGroup} data={data} />
      <MediumPlotChart rightDataGroup={rightDataGroup} data={data} />
    </div>
  );
};

export default TwoCharts;
*/

import React from 'react';
import MediumPlotChart from '../MediumPlotChart/MediumPlotChart';

const TwoCharts = ({ leftDataGroup, rightDataGroup, countResults }) => {
  // Check if data and data.count_results are defined
  if (!countResults) {
    return "this is wrong"; // Render nothing if data is undefined or count_results is undefined
  }

  /*
  // Extracting specific data from countResults
  const leftChartData = data.count_results[leftDataGroup];
  const rightChartData = data.count_results[rightDataGroup];*/

  return (
    <div className="two-chart">
      {/* Pass leftChartData to the first MediumPlotChart */}
      <MediumPlotChart leftDataGroup={leftDataGroup} countResults={countResults} />
      {/* Pass rightChartData to the second MediumPlotChart */}
      <MediumPlotChart rightDataGroup={rightDataGroup} countResults={countResults} />
    </div>
  );
};

export default TwoCharts;
