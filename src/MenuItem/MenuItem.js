import React from "react";

class MenuItem extends React.Component {

  render() {
    return (
      <div onClick={this.props.onClick} className="menu-item">
        <div className="menu-item-icon">{this.props.icon}</div>
        <div className="menu-item-name">{this.props.name}</div>
      </div>
    );
  }
}

export default MenuItem;
