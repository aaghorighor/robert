import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  validate,
  Input,
  Form,
  FormGroup,
  Button,
  Spacer,
  SwitchButton,
  TextArea
} from 'suftnet-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { AiTwotoneEdit } from 'react-icons/ai';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Notification from '../../../shared/notification';
import { ADD_SLIDER, UPDATE_SLIDER } from '../../../../queries/slider';
import { SLIDER_RULES } from './rules';
import {
  addMySlider,
  updateMySlider,
  resetSlider,
} from '../../../../redux/slices/slider-slice';
import UploadImagePanel from '../../../../components/shared/upload-panel';

const SliderFormCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slider = {}, sliders = [] } = useSelector((state) => state.sliderSlice);
  const [addSliderMutation] = useMutation(ADD_SLIDER);
  const [updateSliderMutation] = useMutation(UPDATE_SLIDER);
  const [errorMessages, setErrorMessages] = useState({});
  const [fields, setFields] = useState(SLIDER_RULES.fields);
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [errorType, setErrorType] = useState('error');

  useEffect(() => {
    if (slider && Object.keys(slider).length) {
      setFields({ ...slider });
      dispatch(resetSlider());
    }
  }, [slider]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorMessages({});

    if (fields._id?.length) {
      updateChanges();
    } else {
      saveChanges();
    }
  };

  const saveChanges = async () => {
    try {
      const { hasError, errors } = validate(fields, SLIDER_RULES.slider);
      if (hasError) {
        setErrorMessages(errors);
        return false;
      }

      setLoading(true);

      const { _id, edit, upload_photo, ...saveFields } = fields;
      const {
        data: { addSlider },
      } = await addSliderMutation({
        variables: { sliderItemInput: saveFields },
      });

      if (Object.keys(addSlider).length) {
        setLoading(false);

        dispatch(addMySlider(addSlider));

        setErrorType('success');
        setServerErrorMessage('Slider was added successfully.');
        setNotificationStatus(true);
      }
    } catch (error) {
      setLoading(false);
      setServerErrorMessage(error?.message);
      setNotificationStatus(true);
    }
  };
  const updateChanges = async () => {
    try {

      const { hasError, errors } = validate(
        fields,
        SLIDER_RULES.slider,
      );
      if (hasError) {
        setErrorMessages(errors);
        return false;
      }

      const { __typename, edit, _id, createdAt, upload_photo, ...updateFields } = fields;
      setLoading(true);

      const {
        data: { updateSlider },
      } = await updateSliderMutation({
        variables: { _id, sliderItemInput: updateFields },
      });

      if (updateSlider) {
        setLoading(false);

        dispatch(updateMySlider(fields));

        setErrorType('success');
        setServerErrorMessage('Slider was changes was save successfully.');
        setNotificationStatus(true);
      }
    } catch (error) {
      setLoading(false);
      setServerErrorMessage(error?.message);
      setNotificationStatus(true);
    }
  };

  const resetFields = () => {
    setFields({
      _id: '',
      title: '',
      message: '',
      status: false,
      imageOnly : false,
      edit: false,
      secure_url: '',
      public_id: '',
      upload_photo: false,
    });
  };

  const handleUploadPhoto = (public_id, secure_url) => {
    setFields({ ...fields, public_id, secure_url, upload_photo: false });
  };

  const closeWindow = () => {
    setFields({ ...fields, upload_photo: false });
  }

  const onReset = () => {
    setNotificationStatus(false);
    setLoading(false);

    setServerErrorMessage('');
    if (errorType !== 'error') {
      resetFields();
      setErrorType('error');
    }
  };

  return (
    <div className={`${loading ? 'overlay__block' : null}`}>
      <Card className="bw-2 p-4">
        <CardContent className="py-2 flex-1">
          <>
            <Form horizontal>
              <FormGroup>
                <Input
                  id="title"
                  name="title"
                  placeholder=""
                  label="Title"
                  value={fields.title}
                  errorMessage={
                    errorMessages?.title &&
                    errorMessages?.title?.message
                  }
                  maxLength={50}
                  onChange={(e) =>
                    setFields({ ...fields, title: e.target.value })
                  }
                />
              </FormGroup>
            </Form>
            <Form horizontal>
              <FormGroup>
                <TextArea
                  id="message"
                  name="message"
                  placeholder=""
                  label="Message"
                  value={fields.message}
                  errorMessage={
                    errorMessages?.message &&
                    errorMessages?.message?.message
                  }
                  maxLength={90}
                  onChange={(e) =>
                    setFields({ ...fields, message: e.target.value })
                  }
                />
              </FormGroup>
            </Form>
            <Form horizontal>
              <FormGroup>
                <div className="flex-row align-items-center justify-content-start mt-2">
                  <SwitchButton
                    isChecked={fields.status}
                    onToggle={(e) => setFields({ ...fields, status: e })}
                  />
                  <label className="px-1 text-mute">Status</label>
                </div>
              </FormGroup>
            </Form>
            <Form horizontal>
              <FormGroup>
                <div className="flex-row align-items-center justify-content-start">
                  <SwitchButton
                    isChecked={fields.imageOnly}
                    onToggle={(e) => setFields({ ...fields, imageOnly: e })}
                  />
                  <label className="px-1 text-mute">Image Only</label>
                </div>
              </FormGroup>
            </Form>
             <Form horizontal>
              <FormGroup>
                <div className="flex-row align-items-center justify-content-between">
                  <div className="flex-row align-items-center justify-content-start">
                    <SwitchButton
                      isChecked={fields.upload_photo}
                      onToggle={(e) =>
                        setFields({ ...fields, upload_photo: e })
                      }
                    />
                    <label className="px-1 text-mute">Upload Photo</label>
                  </div>
                  {fields.secure_url && (
                    <AiTwotoneEdit size={48} onClick={() => setFields({ ...fields, upload_photo: true })} className='pointer' color="#5eb9f0" />
                  )}
                </div>
              </FormGroup>
            </Form>
            <div className="flex-row justify-content-start align-items-center mt-3">
              <Button
                className="rounded-circle-30 primary-solid-btn-0"
                // disabled={fields.edit ? false : sliders.length === 3}
                onClick={(e) => onSubmit(e)}
              >
                Save Changes
              </Button>
              <Spacer horizontal={5} />
              <Button
                className="rounded-circle-30"
                onClick={() => navigate(`/v1/dashboard`)}
              >
                Close
              </Button>
            </div>
          </>
        </CardContent>
      </Card>
      {fields.upload_photo && (
        <UploadImagePanel
          secure_url={fields.secure_url || null}
          isPanelOpen={fields.upload_photo}
          handleUploadPhoto={handleUploadPhoto}
          closeWindow={closeWindow}
        />
      )}
      <Notification
        status={notificationStatus}
        type={errorType}
        message={serverErrorMessage}
        duration={errorType === 'error' ? 4000 : 1000}
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

export default SliderFormCard;
