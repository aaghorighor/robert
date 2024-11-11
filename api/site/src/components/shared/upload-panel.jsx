import React, { useState } from 'react';
import { FaWindowClose, FaUpload, FaSave } from 'react-icons/fa';
import { Text, Button } from 'suftnet-ui-kit';
import Notification from './notification';
import { uploadImage } from '../../utils/helper';

const UploadImagePanel = ({ isPanelOpen, handleUploadPhoto, secure_url, closeWindow }) => {
  const [loading, setLoading] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [fileInput, setFileInput] = useState();
  const [preview, setPreview] = useState(secure_url);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // if (selectedFile?.size > 2 * 1000 * 1000) {
    //   setServerErrorMessage('File is too big');
    //   setNotificationStatus(true);
    //   return;
    // }

    setFileInput(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleImageClick = () => {
    document.getElementById('file-input').click();
  };

  const handleSave = async () => { 
       
    if (fileInput) {
       setLoading(true);
      const uploadImageResult = await uploadImage(fileInput);
      if (!uploadImageResult.error) {
        handleUploadPhoto(
          uploadImageResult.public_id,
          uploadImageResult.secure_url,
        );
      } else {
        setServerErrorMessage(uploadImageResult.error.message);
        setNotificationStatus(true);
      }
      setLoading(false);
    }
  };

  const onReset = () => {
    setNotificationStatus(false);
    setLoading(false);
    setServerErrorMessage('');
  };

  return (
    <div className={`panel ${isPanelOpen ? 'open' : ''} ${loading ? 'overlay__block' : null}`}>
      <div className="__header flex-row justify-content-between align-items-center">
        <Text as="p" className="fs-20 fw-normal">
          Upload Image
        </Text>
        <FaWindowClose
          size={40}
          onClick={closeWindow}
          className="pointer"
        />
      </div>
      <div className="__body flex-column justify-content-start align-items-center py-4">
        <div className="flex-column justify-content-center align-items-center mb-xl-5 mt-xl-5">
          <div className="px-5">
            <img src={preview || ''} className="img-fluid"></img>
          </div>

          <div className="flex-row justify-content-start align-items-center mt-3">
            <Button
              className="rounded-circle-30 ms-xl-4"
              onClick={handleImageClick}
            >
              <span className="ms-2">
                <FaUpload /> Select Photo
              </span>
            </Button>
            <Button           
               className="rounded-circle-30 primary-solid-btn-0 ms-xl-4"
              onClick={handleSave}
            >
              <span className="ms-2">
                <FaSave /> Save Photo
              </span>
            </Button>
          </div>

          <input
            type="file"
            id="file-input"
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
        </div>
      </div>
      <Notification
        status={notificationStatus}
        type={'error'}
        message={serverErrorMessage}
        duration={4000}
        onReset={() => onReset()}
      />
      {loading && (
        <div className="overlay">
          <div className="overlay-content"></div>
        </div>
      )}
    </div>
  );
};

export default UploadImagePanel;
