import React, { Component } from "react";

class NumericalIcon extends Component {
  render() {
    const { categ, value, alt, metric, width } = this.props;
    const src =  categ + ".png"
    const desc = (categ === "BMI") ? categ + " " + value : categ.charAt(0).toUpperCase() + categ.slice(1).toLowerCase() + " " + value + metric;
    const firstWord = categ.split(" ")[0];
    const col_adj = ' ' + firstWord.charAt(0).toLowerCase() + firstWord.slice(1).toLowerCase()
    let size_adj = ''
    if (value.toString().length > 4) {
        size_adj = '-xs'
    } else if (value.toString().length > 2) {
        size_adj = '-s'
    }
    let imgClassName = "info-icon"
    if (width !== undefined) {
        imgClassName += "-w";
    }
    return (
      <div className="icon-container numerical" data-tooltip={desc}>
        <img className={imgClassName} src={src} alt={alt} />
        <p className={"icon-value" + size_adj + col_adj}>{value}<span className="icon-metric">{metric}</span></p>
      </div>
    );
  }
}

export default NumericalIcon;
