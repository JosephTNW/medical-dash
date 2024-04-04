import React from 'react';

const MenuItem = ({ icon, name }) => {
    return (
        <div className="menu-item">
            <div className="menu-item-icon">{icon}</div>
            <div className="menu-item-name">{name}</div>
        </div>
    );
};

export default MenuItem;