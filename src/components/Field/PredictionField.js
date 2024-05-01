import { React } from "react";

const PredictionField = ({ label, value }) => {
    return (
      <div className="form-child">
        <label className="form_label">{label}</label>
        <input className="select-form" type="text" value={value} readOnly />
      </div>
    );
  };
  
  export default PredictionField;