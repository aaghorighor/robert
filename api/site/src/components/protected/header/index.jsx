import React, { useState, useContext } from 'react';
import { Header, Text } from 'suftnet-ui-kit';
import { Tooltip } from 'react-tooltip';
import { FaBars, FaSignOutAlt, FaStripeS, FaRegUserCircle } from 'react-icons/fa';
import { MdHelpOutline } from 'react-icons/md';
import { createPortal } from 'react-dom';
import { AiOutlineSetting, AiOutlineHome } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { appContext } from '../../shared/appContext';
import { useMutation } from '@apollo/client';
import Menu from './menu';
import useSticky from '../../../hooks/useSticky';
import HelpPanel from './help-panel';
import { LOGOUT } from '../../../queries/secure';

const SecureHeader = () => {
  const { isMobile, currentUser, signOut } = useContext(appContext);
  const [logoutMutation, { error }] = useMutation(LOGOUT);
  const navigate = useNavigate();
  const sticky = useSticky(200);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handlePanelToggle = () => {
    setIsPanelOpen(false);
  };

  const logoutHandler = async () => {

    try {
      const { data: { logout } } = await logoutMutation();
      if (logout) {
        signOut();
        navigate(`/`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const clickHandler = () => {
    navigate(`/v1/settings`);
  };

  const handleHome = () => {
    switch (currentUser?.role) {
      case 'admin':
        navigate(`/v1/dashboard`);
        break;
      case 'user':
        navigate(`/v1/dashboard`);
        break;
      default:
        navigate(`/v1/dashboard`);
    }
  };
 
  return (
    <Header
      justifyContent="start"
      direction="column"
      alignItems="center"
      className={`zero ${sticky ? 'sticky' : ''}`}
    >
      <div className="w-100">       
        <nav
          className={`flex-row justify-content-between align-items-center bg-secondary py-2`}
        >
          {!isMobile ? (
            <div className="flex-row justify-content-between align-items-center w-80 ">
              <div className="flex-row justify-content-start align-items-center px-2">                
                <Text as="h3" className='display-6 text-white'>Jerur</Text>
              </div>
              <div className="px-3 me-3"></div>
              <Menu />
              
              <div
                className={`flex-row justify-content-between align-items-center`}
              >                               
                <div className="px-2"></div>
                <AiOutlineHome
                  className="text-white pointer"
                  size={30}
                  onClick={handleHome}
                  data-tooltip-id="small-tooltip"
                  data-tooltip-content="Go to Home"
                ></AiOutlineHome>
                  <div className="px-2"></div>
                    <FaRegUserCircle
                      className="text-white pointer"
                      size={30}
                      onClick={() => navigate('/v1/profile')}
                      data-tooltip-id="small-tooltip"
                      data-tooltip-content="View and manage your Profile"
                    ></FaRegUserCircle>
                  <div className="px-2"></div>
                 <AiOutlineSetting
                  className="text-white pointer"
                  size={30}
                  onClick={clickHandler}
                  data-tooltip-id="small-tooltip"
                  data-tooltip-content="View and manage Settings"
                ></AiOutlineSetting>
                <div className="px-2"></div>
                <MdHelpOutline
                  size={30}
                  className="text-white pointer"
                  onClick={() => setIsPanelOpen(true)}
                ></MdHelpOutline>
                <p className="text-white text_small1 px-1">help</p>
                <FaSignOutAlt
                  size={30}
                  className="text-white pointer px-1"
                  onClick={logoutHandler}
                ></FaSignOutAlt>
              </div>
            </div>
          ) : (
            <>
              <FaBars
                size={30}
                className="hamburger"
                onClick={() => {
                  setShowPanel(true);
                }}
              />
            </>
          )}
        </nav>
        {/* <nav
          className={`flex-row justify-content-between align-items-center bg-secondary py-2`}
        >
          {!isMobile ? (
            <div className="flex-row justify-content-between align-items-center w-80 h-10">
              <Grid row spacing={1}>
                <Grid
                  col
                  lg={8}
                  xs={12}
                  className={`flex-row justify-content-between align-items-center`}
                >

                  <div className="flex-row justify-content-start align-items-center px-2">
                    <BsCompass
                      size={15}
                      className='text-white'
                    />
                    <Text as="h4" className='text-white'>Jerur</Text>
                  </div>
                  <Menu />
                </Grid>
                <Grid
                  col
                  lg={4}
                  xs={12}
                  className={`flex-row justify-content-end align-items-center`}
                >
                  <AiOutlineHome
                    className="text-white pointer"
                    size={30}
                    onClick={handleHome}
                    data-tooltip-id="small-tooltip"
                    data-tooltip-content="Go to Home"
                  ></AiOutlineHome>                

                  <div className="px-3"></div>
                  <AiOutlineSetting
                    className="text-white pointer"
                    size={30}
                    onClick={clickHandler}
                    data-tooltip-id="small-tooltip"
                    data-tooltip-content="View and manage Settings"
                  ></AiOutlineSetting>
                     <div className="px-3"></div>
                  <MdHelpOutline
                    size={30}
                    className="text-white pointer"
                    onClick={() => setIsPanelOpen(true)}
                  ></MdHelpOutline>
                  <p className="text-white text_small1 px-1">help</p>
                  <FaSignOutAlt
                    size={30}
                    className="text-white pointer px-1"
                    onClick={logoutHandler}
                  ></FaSignOutAlt>
                </Grid>
              </Grid>
            </div>
          ) : (
            <>
              <FaBars
                size={30}
                className="hamburger"
                onClick={() => {
                  setShowPanel(true);
                }}
              />
            </>
          )}
        </nav> */}
        {isPanelOpen && createPortal(
          <HelpPanel
            isPanelOpen={isPanelOpen}
            handlePanelToggle={handlePanelToggle}
          />,
          document.getElementById('dialogue-portal')
        )}
        <Tooltip id="large-tooltip" className="w-30" />
        <Tooltip id="small-tooltip" />
      </div>
    </Header>
  );
};

export default SecureHeader;
