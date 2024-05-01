import React, { useState } from 'react';
import PredictionField from '../Field/PredictionField';



const PredictionResult = ({ predictionResult }) => {

    return (    
        <div className="form"> 
            <h2>Prediction Result</h2>
            <div className="form">
                <PredictionField
                label={"Heart Disease Prediction:"}
                value={predictionResult.Heart_Disease_Prediction === "1" ? "Yes" : "No"}
                />
            </div>
        </div>
      );
  };

export default PredictionResult;