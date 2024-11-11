import React, { useState } from 'react';
import { BsExclamationTriangle } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import { Tooltip } from 'react-tooltip';

const ConfirmationPopup = ({
  title = '',
  message = '',
  position,
  onConfirm,
  onCancel,
  okText = 'Ok',
  cancelText = 'No',
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = (id) => {
    setIsOpen(false);
    onConfirm(id);
  };

  const handleCancel = () => {
    setIsOpen(false);
    onCancel();
  };

  const popupPositionClass =
    position === 'top' ? 'position-top' : 'position-bottom';

  return (
    <div>
      <div
        data-tooltip-id="small-tooltip"
        data-tooltip-content="Delete this row">
        <AiOutlineDelete
          size={25}
          className="pointer"
          onClick={() => setIsOpen(true)}
        />
      </div>

      {isOpen && (
        <div className={`popup-overlay ${popupPositionClass}`}>
          <div className="popup-content">
            <div className="flex-row justify-content-start align-items-center mb-1">
              <BsExclamationTriangle color="#ffad33" size={30} />
              <h3 className="me-xl-5 px-2">{title}</h3>
            </div>
            <p>{message}</p>
            <div className="popup-buttons">
              <button onClick={() => handleConfirm(id)}>{okText}</button>
              <button onClick={() => handleCancel()}>{cancelText}</button>
            </div>
          </div>
        </div>
      )}
      <Tooltip id="large-tooltip" className="w-30" />
      <Tooltip id="small-tooltip" />
    </div>
  );
};

export default ConfirmationPopup;
