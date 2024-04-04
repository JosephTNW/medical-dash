import logo from "./logo.svg";
import "./App.css";
import SideBar from "./components/SideBar/SideBar";
import MainSection from "./components/MainSection/MainSection";
import React from "react";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected: "dashboard"
    };
    this.handleSidebarClick = this.handleSidebarClick.bind(this);
  }

  handleSidebarClick(item) {
    this.setState({ selected: item });
  }

  render() {
    return (
      <div className="App-background">
        <SideBar onClick={this.handleSidebarClick}/>
        <MainSection selected={this.state.selected}/>
      </div>
    );
  }
}

export default App;
