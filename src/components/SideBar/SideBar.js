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
        const { selected } = this.props;

        return (
        <div className="sidebar">
            <Brand />
            <Menu selected={selected} onClick={this.handleClick}/>
        </div>
        );
  }
}

export default SideBar;
