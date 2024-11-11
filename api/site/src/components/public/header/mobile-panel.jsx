import React from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { Text, Avatar, Card, CardContent } from 'suftnet-ui-kit';
import Logo from './logo';
import Menu from './menu';

const MobilePanel = ({ isPanelOpen, handlePanelToggle }) => {
  return (
    <div className={`panel __mobile ${isPanelOpen ? 'open' : ''}`}>
      <div className="__header flex-row justify-content-between align-items-center">
        <Logo />
        <FaWindowClose
          size={40}
          onClick={handlePanelToggle}
          className="pointer"
        />
      </div>
      <div className="__body flex-column justify-content-center align-items-center py-4">
        <Menu styles='menu flex-column justify-content-start align-items-center min-vh-100' />
      </div>
    </div>
  );
};

export default MobilePanel;
