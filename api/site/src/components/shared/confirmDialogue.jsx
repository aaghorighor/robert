import React, { useState } from 'react';
import { BsExclamationTriangle } from 'react-icons/bs';

const ConfirmationDialog = ({
  title = 'Confirmation',
  message = 'Are you sure you want to proceed?',
  closeDialog,
  handleConfirmation,
  isOpen,
}) => {
  return (
    <div>
      {isOpen && (
        <div className="dialogue__overlay">
          <div className="dialog">
            <div className="flex-row justify-content-start align-items-center mb-2">
              <BsExclamationTriangle color="#ffad33" size={30} />
              <h3 className="me-xl-5 px-2">{title}</h3>
            </div>
            <p>{message}</p>
            <div className="buttons mt-4">
              <button onClick={handleConfirmation}>Yes</button>
              <button onClick={closeDialog}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmationDialog;
