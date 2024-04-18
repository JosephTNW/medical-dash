import logo from "./logo.svg";
import "./App.css";
import SideBar from "./components/SideBar/SideBar";
import MainSection from "./components/MainSection/MainSection";
import React from "react";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected: localStorage.getItem("selected") || "Dashboard"
    };
    this.handleSidebarClick = this.handleSidebarClick.bind(this);
  }

  handleSidebarClick(item) {
    this.setState({ selected: item });
    localStorage.setItem("selected", item);
  }

  render() {
    return (
      <div className="App-background">
        <SideBar selected={this.state.selected} onClick={this.handleSidebarClick}/>
        <MainSection selected={this.state.selected}/>
      </div>
    );
  }
}

export default App;
