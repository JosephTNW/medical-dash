import React from 'react';
import HealthForm from '../Form/HealthForm';
import PatientsList from "../PatientsList/PatientsList";
import FloatingButton from "../FloatingButton/FloatingButton";

const connection_string = "http://" + process.env.REACT_APP_SERVER_ADD;

class PredictionPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            action: "predict",
            data: [],
            isLoading: true,
        };
        this.handleBackClick = this.handleBackClick.bind(this);
        this.createPrediction = this.createPrediction.bind(this);
    }

    handleBackClick() {
        this.setState({ action: "read" });
    }

    async createPrediction(values) {
        console.log("createPrediction function called with values:", values);
        try{
            console.log("Sending POST request to:", connection_string + "preprocess");
            const response = await fetch(connection_string + "preprocess", {
                method: "POST",
                headers: {
                "Content-Type" : "application/json"
                },
                body: JSON.stringify(values)
            });
            console.log("Response received:", response);
            if(response.ok){
                // Handle successful response
                console.log("Prediction created successfully");
                const predictionData = await response.json();
                this.setState({ data: predictionData, isLoading: false });
            } else {
                // Handle error response
                console.error("Error creating prediction:", response.statusText);
            }
            } catch(error) {
                console.error("Error creating prediction:", error);
        }
    }
    
    render() {
        const { action, data, isLoading } = this.state;
        if (action === "predict") {
          return (
            <>
              <HealthForm 
              action={this.createPrediction} />
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <div>
                  <h2>Prediction Results</h2>
                  {/* Display the prediction data */}
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
              )}
            </>
          );
        }
    }
}

export default PredictionPage;