import React from 'react';

const ProgressBar = ({ currentAmount, targetAmount }) => {
    const percentage = Math.min((currentAmount / targetAmount) * 100, 100);

    return (
        <div className="progress-container">
            <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
            <span className="progress-text">{percentage.toFixed(2)}%</span>
        </div>
    );
}

export default ProgressBar;