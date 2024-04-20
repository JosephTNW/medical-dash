import React from "react";
import PatientsList from "../PatientsList/PatientsList";
import FloatingButton from "../FloatingButton/FloatingButton";
import HealthForm from "../Form/HealthForm";

class ManagePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: "read",
      patient: "",
      patient_id: ""
    };
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleCreateClick() {
    this.setState({ action: "create" });
  }

  handleEditClick(values) {
    this.setState({ action: "edit", patient: values });
    console.log("edit clicked")
  }

  handleDeleteClick(id) {
    this.setState({ action: "delete" });
  }

  handleBackClick() {
    this.setState({ action: "read" });
  }

  render() {
    const { action, patient } = this.state;
    if (action === "read" || action === "delete") {
      return (
        <>
          <PatientsList onEditClick={this.handleEditClick} onDeleteClick={this.handleDeleteClick}/>
          <FloatingButton src="/add.svg" buttonName="Create Button" onCreateClick={this.handleCreateClick} />
        </>
      );
    } else if (action === "edit") {
        return (
            <>
                <HealthForm values={patient} onBackClick={this.handleBackClick}/>
            </>
        )
    } else if (action === "create"){
        return (
            <>
                <HealthForm onBackClick={this.handleBackClick}/>
            </>
        )
    }
  }
}

export default ManagePage;
