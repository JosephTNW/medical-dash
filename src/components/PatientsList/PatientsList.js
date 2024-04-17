import React, { Component } from "react";
import ListItem from "../ListItem/ListItem";
import BinaryIcon from "../BinaryIcon/BinaryIcon";
import MultiIcon from "../MultiIcon/MultiIcon";
import NumericalIcon from "../NumericalIcon/NumericalIcon";

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
      <>
        <ul>
          {patients.map((patient) => (
            <li
              className={`patient-list ${
                patient.Heart_Disease === "Yes" ? "red" : ""
              }`}
              key={patient.id}
            >
              <div className="card-content">
                <MultiIcon
                  className="patient-icon"
                  categ={patient.Sex}
                  col_name={"Gender"}
                />
                <div className="single-info">
                  ID: {patient.id}
                  <div className="icons">
                    <BinaryIcon
                      reference={patient.Smoking_History}
                      trueCondition={"Yes"}
                      trueSrc={"/smoking.png"}
                      falseSrc={"/no-smoking.png"}
                      info={"Smoking History"}
                    />
                    <BinaryIcon
                      reference={patient.Skin_Cancer}
                      trueCondition={"Yes"}
                      trueSrc={"/skin_cancer.png"}
                      falseSrc={"/no_skin_cancer.png"}
                      info={"Skin Cancer"}
                    />
                    <BinaryIcon
                      reference={patient.Other_Cancer}
                      trueCondition={"Yes"}
                      trueSrc={"/other_cancer.png"}
                      falseSrc={"/no_other_cancer.png"}
                      info={"General Cancer"}
                    />
                    <BinaryIcon
                      reference={patient.Exercise}
                      trueCondition={"Yes"}
                      trueSrc={"/exercise.png"}
                      falseSrc={"/no-exercise.png"}
                      info={"Exercise"}
                    />
                    <BinaryIcon
                      reference={patient.Depression}
                      trueCondition={"Yes"}
                      trueSrc={"/depression.png"}
                      falseSrc={"/no-depression.png"}
                      info={"Depression"}
                    />
                    <BinaryIcon
                      reference={patient.Arthritis}
                      trueCondition={"Yes"}
                      trueSrc={"/arthritis.png"}
                      falseSrc={"/no-arthritis.png"}
                      info={"Arthritis"}
                    />
                    <BinaryIcon
                      reference={patient.Diabetes}
                      trueCondition={"Yes"}
                      trueSrc={"/diabetes.png"}
                      falseSrc={"/no-diabetes.png"}
                      info={"Diabetes"}
                    />
                    <MultiIcon
                      categ={patient.General_Health}
                      col_name={"General Health"}
                    />
                    <MultiIcon categ={patient.Checkup} col_name={"Checkup"} />
                    <NumericalIcon
                      categ="Weight"
                      value={patient.Weight}
                      metric="kg"
                      alt={null}
                    />
                    <NumericalIcon
                      categ="Height"
                      value={patient.Height}
                      metric="cm"
                      alt={null}
                    />
                    <NumericalIcon
                      categ="BMI"
                      value={patient.BMI}
                      metric=""
                      alt={null}
                    />
                    <NumericalIcon
                      categ="Fried Potato Consumption Rate"
                      value={patient.FriedPotato_Consumption}
                      metric=""
                      alt={null}
                    />
                    <NumericalIcon
                      categ="Vegetable Consumption Rate"
                      value={patient.Green_Vegetables_Consumption}
                      metric=""
                      alt={null}
                    />
                    <NumericalIcon
                      categ="Fruit Consumption Rate"
                      value={patient.Fruit_Consumption}
                      metric=""
                      alt={null}
                    />
                    <NumericalIcon
                      categ="Alcohol Consumption Rate"
                      value={patient.Alcohol_Consumption}
                      metric=""
                      alt={null}
                    />
                    <NumericalIcon
                      categ="Age"
                      value={patient.Age_Category}
                      metric=""
                      alt={null}
                      width="extra"
                    />
                  </div>
                </div>
              </div>
              <div className="buttons">
                <button className="btn-edit">
                  <img src="/edit.svg"></img>
                </button>
                <button className="btn-del">
                  <img src="/delete.svg"></img>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default PatientsList;
