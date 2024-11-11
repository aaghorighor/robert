import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import DonationReportPanel from './report-panel';
import { useAppContext } from '../../shared/appContext';

const Menu = () => {
  const { currentUser } = useAppContext()
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const handlePanelToggle = () => {
    setIsPanelOpen(false);
  };
  
  return (
    <>
      <div className="menu flex-0">
        <Link to="/v1/dashboard">
          <span className="text-white-80"> Dashboard </span>
        </Link>
        <Link to="/v1/service-time">
        
          <span className="text-white-80">Service Time</span>
        </Link>
        <Link to="/v1/events">
          <span className="text-white-80">Events</span>
        </Link>
        {
          !currentUser?.features?.includes("9") && (
            <Link to="/v1/donations">
              <span className="text-white-80">Donations</span>
            </Link>
          )
        }
        {
          !currentUser?.features?.includes("3") && (
            <Link to="/v1/campaigns">
              <span className="text-white-80">Campaigns</span>
            </Link>
          )
        }
        <Link to="/v1/fellowships">
          <span className="text-white-80">Fellowships</span>
        </Link>
        {
          !currentUser?.features?.includes("6") && (
            <Link to="/v1/members">
              <span className="text-white-80">Members</span>
            </Link>
          )
        }
        <Link to="/v1/testimonies">
          <span className="text-white-80">Testimonies</span>
        </Link>
        <Link onClick={() => setIsPanelOpen(true)}>
          <span className="text-white-80">Reports</span>
        </Link>
      </div>
      {isPanelOpen && createPortal(
        <DonationReportPanel
          isPanelOpen={isPanelOpen}
          handlePanelToggle={handlePanelToggle}
        />,
        document.getElementById('dialogue-portal')
      )}
    </>

  )
};
export default Menu;
