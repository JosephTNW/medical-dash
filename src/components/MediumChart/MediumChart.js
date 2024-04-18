import React from 'react';
import MediumPlotChart from '../MediumPlotChart/MediumPlotChart';

const MediumChart = () => {
    return (
        <div className="medium-chart">
            <MediumPlotChart dataGroup={4} />
            <MediumPlotChart dataGroup={5} />
        </div>
    );
};

export default MediumChart;