import React, { Component } from "react";
import ListItem from "../ListItem/ListItem";

class PatientsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: 10,
      page: 0,
      patients: [], // Initialize an empty array to store the patients
    };
  }

  componentDidMount() {
    // Fetch the patients data from an API or any other data source
    // and update the state with the fetched data
    // Example:
    fetch(
      "http://" +
        process.env.REACT_APP_SERVER_ADD +
        this.state.items +
        "/" +
        this.state.page,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ patients: data });
        console.log(this.state.patients);
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
      });
  }

  render() {
    const { patients } = this.state;

    return (
        <div>
            <ul>
                {patients.map((patient) => (
                    <li className="patient-list" key={patient.id}>
                        {patient.sex === "female" ? (
                            <img src="/patient_f.png" />
                        ) : (
                            <img src="/patient_m.png" />
                        )}
                        ID: {patient.id}
                    </li>
                ))}
            </ul>
        </div>
    );
  }
}

export default PatientsList;
