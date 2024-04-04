import React from "react";
import MenuItem from "../../MenuItem/MenuItem";

class Menu extends React.Component {
    constructor(props){
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
    }

  handleItemClick = (item) => {
    this.props.onClick(item);
  };

  render() {
    return (
      <div className="menu">
        <MenuItem icon="🏠" name="Dashboard" onClick={this.handleItemClick("dashboard")} />
        <MenuItem icon="🧐" name="Predict" onClick={this.handleItemClick("form")}/>
      </div>
    );
  }
}

export default Menu;
