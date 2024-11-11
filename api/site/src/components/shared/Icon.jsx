import React from 'react';
import { Tooltip } from 'react-tooltip';

const Icon = ({ children, message }) => {
    return (
        <div>
            <div
                data-tooltip-id="small-tooltip"
                data-tooltip-content={message}>
                {children}
            </div>
            <Tooltip id="large-tooltip" className="w-30" />
            <Tooltip id="small-tooltip" />
        </div>
    );
}

export default Icon