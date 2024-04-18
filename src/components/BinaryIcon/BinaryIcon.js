import React, { Component } from "react";

class BinaryIcon extends Component {
  render() {
    const {
      className,
      reference,
      trueCondition,
      trueSrc,
      falseSrc,
      alt,
      info,
    } = this.props;
    const imgClassName = className === undefined ? "info-icon" : className;

    let src, desc;

    if(new RegExp(trueCondition).test(reference)) {
      src = trueSrc;
      desc = "Has " + info
    } else {
      src = falseSrc;
      desc = "No " + info
    }


    if (src === falseSrc && falseSrc === undefined) {
      return null;
    } else {
      return (
        <div className="icon-container" data-tooltip={desc}>
          <img className={imgClassName} src={src} alt={alt} />
        </div>
      );
    }
  }
}

export default BinaryIcon;
