import React, { useContext, useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Text,
  validate,
  Input,
  Form,
  FormGroup,
  Spacer,
} from 'suftnet-ui-kit';
import { useMutation } from '@apollo/client';
import { Tooltip } from 'react-tooltip';
import { FiHelpCircle } from 'react-icons/fi';
import Notification from '../../../shared/notification';
import { FaSave, FaUpload } from 'react-icons/fa';
import { appContext } from '../../../shared/appContext';
import { UPDATE_CHURCH_CONTACT } from '../../../../queries/church';
import { UPDATE_CONTACT_RULES } from './rules';
import { uploadImage } from '../../../../utils/helper';

const ContactCard = () => {
  const { currentUser = {}, updateCurrentUser } = useContext(appContext);
  const [updateContactMutation, { error = {}, loading }] = useMutation(
    UPDATE_CHURCH_CONTACT,
  );
  const [errorMessages, setErrorMessages] = useState({});
  const [fields, setFields] = useState(UPDATE_CONTACT_RULES.fields);
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [logoInput, setLogoInput] = useState();
  const [coverPhotoInput, setCoverPhotoInput] = useState();
  const [previewLogo, setPreviewLogo] = useState(null);
  const [previewCoverPhoto, setPreviewCoverPhoto] = useState(null);
  const [errorType, setErrorType] = useState('error');
  const [tabSelected, setTabSelected] = useState("logo");

  useEffect(() => {
    if (error && Object.keys(error).length) {
      setServerErrorMessage(error.message);
      setNotificationStatus(true);
    }
  }, [error]);

  useEffect(() => {
    if (currentUser && Object.keys(currentUser).length) {
      setFields({ ...currentUser?.church });
    }
  }, [currentUser]);

  const handleCoverPhotoClick = () => {
    document.getElementById('upload-cover-photo').click();
  };

  const handleLogoClick = () => {
    document.getElementById('upload-logo').click();
  };

  const handleCoverPhotoChange = (e) => {
    const selectedFile = e.target.files[0];
    // if (selectedFile?.size > 2 * 1000 * 1000) {
    //   setServerErrorMessage('File is too big');
    //   setNotificationStatus(true);
    //   return;
    // }
    setCoverPhotoInput(selectedFile);
    setPreviewCoverPhoto(URL.createObjectURL(selectedFile));
  };

  const handleLogoChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile?.size > 2 * 1000 * 1000) {
      setServerErrorMessage('File is too big');
      setNotificationStatus(true);
      return;
    }
    setLogoInput(selectedFile);
    setPreviewLogo(URL.createObjectURL(selectedFile));
  };

  async function processImage(input, fieldKeyPrefix) {
    if (input) {
      const uploadImageResult = await uploadImage(input);
      if (!uploadImageResult.error) {
        fields[`${fieldKeyPrefix}_id`] = uploadImageResult.public_id;
        fields[`${fieldKeyPrefix}_url`] = uploadImageResult.secure_url;
      }
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorMessages({});

    const { hasError, errors } = validate(fields, UPDATE_CONTACT_RULES.contact);
    if (hasError) {
      setErrorMessages(errors);
      return false;
    }

    await processImage(logoInput, 'logo');
    await processImage(coverPhotoInput, 'secure');

    const {
      data: { updateChurchContact },
    } = await updateContactMutation({
      variables: fields,
    });

    if (updateChurchContact) {

      const body = {
        ...currentUser,
        church: {
          ...fields
        }
      };

      updateCurrentUser(body);
      setErrorType('success');
      setServerErrorMessage('Contact changes was save successfully.');
      setNotificationStatus(true);
    }
  };

  const onReset = () => {
    setNotificationStatus(false);
    setErrorType('error');
    setServerErrorMessage('');
  };

  return (
    <div className={`${loading ? 'overlay__block' : null}`}>
      <Card className="bw-2">
        <div className="bg-light p-3">
          <CardHeader className="flex-row align-items-center justify-content-between">
            <div className="flex-row align-items-center justify-content-between">
              <Text as="h2" className="text-dark fs-23 px-1">
                Contact
              </Text>
              <FiHelpCircle
                size={20}
                data-tooltip-id="large-tooltip"
                data-tooltip-content="This allows you to edit or add Contact effortlessly, when you are done, simply click Save Changes to save the necessary changes."
              />
            </div>
            <div className="flex-row justify-content-start align-items-center">
              <Button
                className="rounded-circle-30 secondary-solid-btn-0"
                onClick={(e) => onSubmit(e)}
              >
                <FaSave
                  size={15}
                  color='#080808'
                  className="pointer mb-1"
                ></FaSave>  <Spacer horizontal={2} /> Save Changes
              </Button>
              <Spacer horizontal={5} />
            </div>
          </CardHeader>
        </div>
        <CardContent className="py-4 p-4 flex-1">
          <>
            <div className="flex-row justify-content-center align-items-center">
              <Button
                className="rounded solid-btn-0"
                onClick={() => setTabSelected("logo")}
              >
                <span className="ms-2">
                  Upload Logo
                </span>
              </Button>
              <Spacer horizontal={2} />
              <Button
                className="rounded solid-btn-0 "
                onClick={() => setTabSelected("coverPhoto")}
              >
                <span className="ms-2">
                  Upload Cover Photo
                </span>
              </Button>
            </div>

            <div className="flex-row justify-content-center align-items-center mb-xl-5 mt-xl-5">

              {
                tabSelected === "logo" && (
                  <div className="flex-column justify-content-center align-items-center">
                    <Avatar
                      imgUrl={previewLogo || currentUser?.church?.logo_url || ''}
                      xxl={true}
                    ></Avatar>
                    <Spacer vertical={2} />
                    <Button
                      className="rounded primary-solid-btn-0"
                      onClick={handleLogoClick}
                    >
                      <span >
                        <FaUpload /> Upload Logo
                      </span>
                    </Button>
                  </div>
                )
              }
              {
                tabSelected === "coverPhoto" && (
                  <div className="flex-column justify-content-center align-items-center">
                    <Avatar
                      imgUrl={previewCoverPhoto || currentUser?.church?.secure_url || ''}
                      xxl={true}
                    ></Avatar>
                    <Spacer vertical={2} />
                    <Button
                      className="rounded primary-solid-btn-0"
                      onClick={handleCoverPhotoClick}
                    >
                      <span className="ms-2">
                        <FaUpload /> Upload Cover Photo
                      </span>
                    </Button>
                  </div>
                )
              }

              <input
                type="file"
                id="upload-logo"
                accept="image/*"
                onChange={handleLogoChange}
                hidden
              />
              <input
                type="file"
                id="upload-cover-photo"
                accept="image/*"
                onChange={handleCoverPhotoChange}
                hidden
              />
            </div>

            <Form horizontal className={'mt-xl-1'}>
              <FormGroup>
                <Input
                  id="name"
                  name="name"
                  placeholder=""
                  label="Church name"
                  maxLength={50}
                  value={fields.name}
                  errorMessage={
                    errorMessages?.name && errorMessages?.name?.message
                  }
                  onChange={(e) =>
                    setFields({ ...fields, name: e.target.value })
                  }
                />
              </FormGroup>
            </Form>
            <Form horizontal>
              <FormGroup>
                <Input
                  id="email"
                  name="email"
                  placeholder=""
                  label="Email"
                  value={fields.email}
                  errorMessage={
                    errorMessages?.email && errorMessages?.email?.message
                  }
                  maxLength={50}
                  onChange={(e) =>
                    setFields({ ...fields, email: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Input
                  id="mobile"
                  name="mobile"
                  placeholder=""
                  label="Mobile"
                  value={fields.mobile}
                  errorMessage={
                    errorMessages?.mobile && errorMessages?.mobile?.message
                  }
                  maxLength={20}
                  onChange={(e) =>
                    setFields({ ...fields, mobile: e.target.value })
                  }
                />
              </FormGroup>
            </Form>
          </>
        </CardContent>
      </Card>

      <Notification
        status={notificationStatus}
        type={errorType}
        message={serverErrorMessage}
        duration={4000}
        onReset={() => onReset()}
      />
      {loading && (
        <div className="overlay">
          <div className="overlay-content"></div>
        </div>
      )}
      <Tooltip id="large-tooltip" className="w-30" />
      <Tooltip id="small-tooltip" />
    </div>
  );
};

export default ContactCard;
