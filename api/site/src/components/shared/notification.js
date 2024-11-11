import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Notification = ({ status, type, message, duration, onReset }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (status) {
      setVisible(true);

      const timeout = setTimeout(() => {
        setVisible(false);
        onReset();
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [status, duration]);

  if (!visible) {
    return null;
  }

  let icon;
  if (type === 'success') {
    icon = <span className="uil-check-circle text_small2 text-white"></span>;
  } else if (type === 'error') {
    icon = (
      <span className="uil-exclamation-triangle text_small2 text-white "></span>
    );
  }

  let bgColor;

  if (type === 'success') {
    bgColor = '#00cc99';
  } else if (type === 'error') {
    bgColor = '#ff0066';
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        backgroundColor: `${bgColor}`,
        padding: '20px',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
      }}
      className="rounded-2"
    >
      <div style={{ marginRight: '10px' }}>{icon}</div>
      <div style={{ color: '#ffffff' }}>{message}</div>
    </div>
  );
};

Notification.propTypes = {
  status: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(['success', 'error']).isRequired,
  message: PropTypes.string,
  duration: PropTypes.number,
};

export default Notification;
