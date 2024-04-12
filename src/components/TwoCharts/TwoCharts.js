import React from 'react';
import MediumPlotChart from '../MediumPlotChart/MediumPlotChart';

const TwoCharts = () => {
  return (
    <div className="two-chart">
      <MediumPlotChart dataGroup={4} />
      <MediumPlotChart dataGroup={5} />
    </div>
  );
};

export default TwoCharts;