import React from "react";
import MenuItem from "../MenuItem/MenuItem";

class Menu extends React.Component {
  constructor(props){
      super(props);
      this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick = (item) => {
    this.props.onClick(item);
  };

  render() {
    const { selected } = this.props;

    return (
      <div className="menu">
        <MenuItem selected={selected} icon="🏠" name="Dashboard" onClick={() => this.handleItemClick('Dashboard')} />
        <MenuItem selected={selected} icon="👨‍💼" name="Manage" onClick={() => this.handleItemClick('Manage')}/>
        <MenuItem selected={selected} icon="🧐" name="Predict" onClick={() => this.handleItemClick('Predict')}/>
      </div>
    );
  }
}

export default Menu;
