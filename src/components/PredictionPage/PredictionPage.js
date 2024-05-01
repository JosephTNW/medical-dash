import React from 'react';
import HealthForm from '../Form/HealthForm';
import PredictionResult from "../Form/PredictionResult";
import PopupDialog from '../Popup/PopUpDialog';

const connection_string = "http://" + process.env.REACT_APP_SERVER_ADD;

class PredictionPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            isLoading: true,
            showPopup: false,
            error: null,
        };
        this.handleBackClick = this.handleBackClick.bind(this);
        this.createPrediction = this.createPrediction.bind(this);
        this.openPopup = this.openPopup.bind(this)
        this.closePopup = this.closePopup.bind(this)
    }

    openPopup(){
      this.setState({ showPopup: true });
    }

    closePopup(){
      this.setState({ showPopup: false, data: [], isLoading: true});
    }

    handleBackClick() {
        this.setState({ action: "predict", data: [], isLoading: true});
    }

    async createPrediction(values) {
        this.openPopup();
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
                this.setState({ 
                  data: predictionData, 
                  isLoading: false, 
                  error: null 
                });
            } else {
                // Handle error response
                console.error("Error creating prediction:", response.statusText);
                this.setState({ isLoading: false, error: "Failed to create prediction" });
            }
            } catch(error) {
                console.error("Error creating prediction:", error);
                this.setState({ isLoading: false, error: "An error has occured" });
        }
    }
    
    render() {
        const { data, isLoading, showPopup, error} = this.state;
        return (
          <>
            <HealthForm 
            action={this.createPrediction} />
            {showPopup && (
              <PopupDialog isOpen={showPopup} onClose={this.closePopup}>
                {isLoading ? (
                  <div>loading...</div>
                ) : error ?(
                  <div>
                    <span role="img" aria-label="Error">❌</span> {error}
                  </div>
                ) : (
                  <PredictionResult 
                  predictionResult={data}
                  onBackClick={this.handleBackClick}/>
                )}
                </PopupDialog>
            )}
          </>
        );
    }
}
  
export default PredictionPage;