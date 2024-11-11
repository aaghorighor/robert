import React, { useEffect } from 'react';
import { JaaSMeeting, JitsiMeeting } from '@jitsi/react-sdk';
import { FaWindowClose } from 'react-icons/fa';
import { useAppContext } from './appContext';

const VideoCallPanel = ({ row, isPanelOpen, handlePanelToggle }) => {
  const domain = 'meet.jit.si';
  const { currentUser, token } = useAppContext();
  const fullName = `${currentUser?.first_name ?? ''} ${
    currentUser?.last_name ?? ''
  }`;

  useEffect(() => {
    return () => {
      window.removeEventListener('beforeunload', onUnload);
    };
  }, []);

  const onUnload = () => {};

  const handleApiReady = (JitsiMeetAPI) => {
    JitsiMeetAPI.executeCommand('displayName', fullName);
  };

  const renderSpinner = () => (
    <div
      style={{
        fontFamily: 'sans-serif',
        textAlign: 'center',
      }}
    >
      Loading..
    </div>
  );

  const handleReadyToClose = () => {
    /* eslint-disable-next-line no-alert */
    console.log('Ready to close...');
  };

  const handleJitsiIFrameRef1 = (iframeRef) => {
    iframeRef.style.border = '10px solid #3d3d3d';
    iframeRef.style.background = '#3d3d3d';
    iframeRef.style.height = '100%';
    iframeRef.style.width = '100%';
    iframeRef.style.marginBottom = '20px';
  };

  return (
    <div className={`panel ${isPanelOpen ? 'open' : ''}`}>
      <div className="__header pointer">
        <FaWindowClose size={40} onClick={handlePanelToggle} />
      </div>
      <div className="flex-column justify-content-center align-items-center mt-1">
        <JaaSMeeting
          appId={'vpaas-magic-cookie-895116db795a43699d28eee9886efdc9'}
          jwt={token}
          roomName={row?.slotId ? row?.slotId : 'test'}
          spinner={renderSpinner}
          configOverwrite={{
            subject: row?.service?.name,
            hideConferenceSubject: false,
            startWithAudioMuted: true,
            disableModeratorIndicator: true,
            startScreenSharing: true,
            enableEmailInStats: false,
          }}
          userInfo={{
            displayName: fullName,
          }}
          useStaging={true}
          onApiReady={(externalApi) => handleApiReady(externalApi)}
          onReadyToClose={handleReadyToClose}
          getIFrameRef={handleJitsiIFrameRef1}
        />
      </div>
    </div>
  );
};

export default VideoCallPanel;
