import React, { Component } from "react";
import ListItem from "../ListItem/ListItem";
import BinaryIcon from "../BinaryIcon/BinaryIcon";
import MultiIcon from "../MultiIcon/MultiIcon";
import NumericalIcon from "../NumericalIcon/NumericalIcon";
import Pagination from "./Pagination";

class PatientsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: 10,
      tot_items: 0,
      page: 0,
      patients: [], // Initialize an empty array to store the patients
      isLoading: true,
    };

    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleEndClick = this.handleEndClick.bind(this);
  }

  handleChangePage(page) {
    this.fetchData(page);
  }

  handleStartClick() {
    this.fetchData(0);
  }

  handleEndClick() {
    this.fetchData(Math.ceil(this.state.tot_items / this.state.items) - 1);
  }

  fetchData(page) {
    this.setState({ isLoading: true });
    fetch(
      "http://" +
        process.env.REACT_APP_SERVER_ADD +
        this.state.items +
        "/" +
        page,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ patients: data, isLoading: false, page: page});
        console.log(this.state.patients);
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
      });
  }

  componentDidMount() {
    this.fetchData(0);
    fetch("http://" + process.env.REACT_APP_SERVER_ADD + "count", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ tot_items: data[0].count });
      });
  }

  handleEdit(item) {
    this.props.onEditClick(item);
  }

  handleDelete(id) {
    this.props.onDeleteClick(id);
  }

  render() {
    const { patients, isLoading, tot_items, page, items } = this.state;

    return (
      <>
        {isLoading ? (
          <div className="loading-animation"></div>
        ) : (
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
                        <MultiIcon
                          categ={patient.Checkup}
                          col_name={"Checkup"}
                        />
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
                    <button
                      className="btn-edit"
                      onClick={() => this.handleEdit(patient)}
                    >
                      <img src="/edit.svg"></img>
                    </button>
                    <button
                      className="btn-del"
                      onClick={() => this.handleDelete(patient.id)}
                    >
                      <img src="/delete.svg"></img>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <Pagination
              tot_items={tot_items}
              items={items}
              curr_page={page}
              onStartClick={this.handleStartClick}
              onChangePage={this.handleChangePage}
              onEndClick={this.handleEndClick}
            />
          </>
        )}
      </>
    );
  }
}

export default PatientsList;
