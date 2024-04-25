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

