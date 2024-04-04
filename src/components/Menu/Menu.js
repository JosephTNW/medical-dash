import React from 'react';
import MenuItem from '../../MenuItem/MenuItem';

const Menu = () => {
    return (
        <div className="menu">
            <MenuItem icon="🏠" name="Dashboard" />
            <MenuItem icon="🧐" name="Predict" />
        </div>
    );
};

export default Menu;