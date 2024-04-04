import React from "react";
import Brand from "../Brand/Brand";
import Menu from "../Menu/Menu";

class SideBar extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(item) {
        this.props.onClick(item);
    }
  
    render() {
        return (
        <div className="sidebar">
            <Brand />
            <Menu onClick={this.handleClick}/>
        </div>
        );
  }
}

export default SideBar;
