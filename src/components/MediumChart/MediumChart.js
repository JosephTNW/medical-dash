import React from 'react';
import MediumPlotChart from '../MediumPlotChart/MediumPlotChart';

const MediumChart = () => {
    return (
        <div className="medium-chart">
            <MediumPlotChart leftDataGroup={4} />
            <MediumPlotChart rightDataGroup={5} />
        </div>
    );
};

export default MediumChart;