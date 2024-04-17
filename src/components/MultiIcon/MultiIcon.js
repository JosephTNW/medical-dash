import React, { Component } from "react";

class MultiIcon extends Component {
  render() {
    const { categ, col_name, alt, className } = this.props;
    const src = col_name +  " " + categ + ".png"
    let imgClassName = "info-icon"
    if (className !== undefined) {
      imgClassName = className;
    }
    const desc = categ.charAt(0).toUpperCase() + categ.slice(1).toLowerCase() + " " + col_name.toLowerCase();
    return (
      <div className="icon-container" data-tooltip={desc}>
        <img className={imgClassName} src={src} alt={alt} />
      </div>
    );
  }
}

export default MultiIcon;
