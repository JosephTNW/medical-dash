import React from 'react';
import Brand from '../Brand/Brand';
import Menu from '../Menu/Menu';

const SideBar = () => {
    return (
        <div className="sidebar">
            <Brand/>
            <Menu/>
        </div>
    );
};

export default SideBar;