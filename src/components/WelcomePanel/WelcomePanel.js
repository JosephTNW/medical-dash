import React from 'react';

const WelcomePanel = () => {
    return (
        <div className="wide-panel">
            <div className="text-container">
                <h2>Welcome to your Medical Dashboard!</h2>
                <p>Get access to all your medical information in one place.</p>
            </div>
            <div className="image-container">
                <img src="logo512.png" alt="Medical Dashboard" />
            </div>
        </div>
    );
};

export default WelcomePanel;