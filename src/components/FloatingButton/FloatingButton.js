import React from 'react';

class FloatingButton extends React.Component {
    handleCreate(item) {
        this.props.onCreateClick(item);
    }

    render() {
        const { src, className, buttonName } = this.props;
        let btnClassName = "btn-float"
        if (className !== undefined) {
            btnClassName += className;
        }
        return (
            <>
                <button className={btnClassName} onClick={() => this.handleCreate()}>
                    <img src={src} alt={buttonName}></img>
                </button>
            </>
        );
    }
}

export default FloatingButton;