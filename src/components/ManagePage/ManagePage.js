import React from "react";
import PatientsList from "../PatientsList/PatientsList";
import FloatingButton from "../FloatingButton/FloatingButton";
import HealthForm from "../Form/HealthForm";

const connection_string = "http://" + process.env.REACT_APP_SERVER_ADD

class ManagePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: "read",
      patient: "",
      patient_id: "",
    };
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.updatePatient = this.updatePatient.bind(this);
    this.createPatient = this.createPatient.bind(this);
    this.refetchData = React.createRef();
  }

  callRefetchData() {
    this.refetchData.current.refetchData();
  }

  handleCreateClick() {
    this.setState({ action: "create" });
  }

  handleEditClick(values) {
    this.setState({ action: "edit", patient: values });
  }

  handleDeleteClick(id) {
    this.deletePatient(id);
    this.callRefetchData();
  }

  handleBackClick() {
    this.setState({ action: "read" });
  }

  async createPatient(values) {
    try {
      const response = await fetch(connection_string + "create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });
      if (response.ok) {
        // Handle successful response
        console.log("Patient created successfully");
        this.setState({ action: "read" });
      } else {
        // Handle error response
        console.error("Failed to create patient");
      }
    } catch (error) {
      // Handle network error
      console.error("Network error:", error);
    }
  }

  async updatePatient(values) {
    try {
      const response = await fetch(connection_string + "update/" + values.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });
      if (response.status === 200) {
        // Handle successful response
        console.log("Patient updated successfully");
        this.setState({ action: "read" });
      } else {
        // Handle error response
        console.error("Failed to update patient");
      }
    } catch (error) {
      // Handle network error
      console.error("Network error:", error);
    }
  }

  async deletePatient(id) {
    try {
      const response = await fetch(connection_string + "delete/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.status === 200) {
        // Handle successful response
        console.log("Patient deleted successfully");
      } else {
        // Handle error response
        console.error("Failed to delete patient");
      }
    } catch (error) {
      // Handle network error
      console.error("Network error:", error);
    }
  }

  render() {
    const { action, patient } = this.state;
    if (action === "read" || action === "delete") {
      return (
        <>
          <PatientsList 
            onEditClick={this.handleEditClick} 
            onDeleteClick={this.handleDeleteClick}
            connection_string={connection_string}
            ref={this.refetchData}
            />
          <FloatingButton 
            src="/add.svg" 
            buttonName="Create Button" 
            onCreateClick={this.handleCreateClick} />
        </>
      );
    } else if (action === "edit") {
      return (
        <>
          <HealthForm 
            values={patient} 
            onBackClick={this.handleBackClick}
            action={this.updatePatient}/>
        </>
      )
    } else if (action === "create"){
      return (
        <>
          <HealthForm 
            onBackClick={this.handleBackClick}
            action={this.createPatient}/>
        </>
      )
    }
  }
}

export default ManagePage;
