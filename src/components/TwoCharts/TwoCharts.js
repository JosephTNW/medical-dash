import React from 'react';
import MediumPlotChart from '../MediumPlotChart/MediumPlotChart';

const TwoCharts = ({ leftDataGroup, rightDataGroup }) => {
  return (
    <div className="two-chart">
      <MediumPlotChart dataGroup={leftDataGroup} />
      <MediumPlotChart dataGroup={rightDataGroup} />
    </div>
  );
};

export default TwoCharts;
