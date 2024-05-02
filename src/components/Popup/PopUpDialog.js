import React from "react";

const PopupDialog = ({
    isOpen,
    onClose,
    children
}) => {
    if (!isOpen) return null;

    return (
        <div className="popup">
            <div className="popup-content">
                <button className="close-btn" onClick={onClose}>
                    <img src="cross.png"></img>
                </button>
                <div className="margin-up">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PopupDialog;