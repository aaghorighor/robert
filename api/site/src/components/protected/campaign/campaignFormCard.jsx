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
  TextArea,
} from 'suftnet-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { AiTwotoneEdit } from 'react-icons/ai';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Notification from '../../shared/notification';
import { ADD_CAMPAIGN, UPDATE_CAMPAIGN } from '../../../queries/campaign';
import { CAMPAIGN_RULES } from './rules';
import {
  addMyCampaign,
  updateMyCampaign,
  resetCampaign,
} from '../../../redux/slices/campaign-slice';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import UploadImagePanel from '../../shared/upload-panel';
import { convertToUnix, converterTimeStampToDate  } from '../../../utils/helper';

const CampaignFormCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { campaign = {} } = useSelector((state) => state.campaignSlice);
  const [addCampaignMutation] = useMutation(ADD_CAMPAIGN);
  const [updateCampaignMutation] = useMutation(UPDATE_CAMPAIGN);
  const [errorMessages, setErrorMessages] = useState({});
  const [fields, setFields] = useState(CAMPAIGN_RULES.fields);
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [errorType, setErrorType] = useState('error');

  useEffect(() => {
    if (campaign && Object.keys(campaign).length) {
      setFields({ ...campaign, start_date: converterTimeStampToDate(campaign.start_date), end_date: converterTimeStampToDate(campaign.end_date) });
      dispatch(resetCampaign());
    }
  }, [campaign]);

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
      const { hasError, errors } = validate(fields, CAMPAIGN_RULES.campaign);
      if (hasError) {
        setErrorMessages(errors);
        return false;
      }

      setLoading(true);

      const { _id, upload_photo, ...saveFields } = fields;
      const {
        data: { addCampaign },
      } = await addCampaignMutation({
        variables: { campaignInput: saveFields },
      });

      if (addCampaign && Object.keys(addCampaign).length) {
        setLoading(false);

        dispatch(addMyCampaign(addCampaign));

        setErrorType('success');
        setServerErrorMessage('Campaign was added successfully.');
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
      const { hasError, errors } = validate(fields, CAMPAIGN_RULES.campaign);

      if (hasError) {
        setErrorMessages(errors);
        return false;
      }

      const {
        __typename,
        _id,
        edit,
        createdAt,
        upload_photo,
        current_amount_funded,
        ...updateFields
      } = fields;
      setLoading(true);

      const {
        data: { updateCampaign },
      } = await updateCampaignMutation({
        variables: {
          campaignInput: updateFields,
          campaignId: _id,
        },
      });

      if (updateCampaign) {
        setLoading(false);

         const copy = {
          ...fields,
          start_date: convertToUnix(fields.start_date?.toLocaleDateString()),
          end_date: convertToUnix(fields.end_date?.toLocaleDateString())
        }

        dispatch(updateMyCampaign(copy));

        setErrorType('success');
        setServerErrorMessage('Campaign was changes was save successfully.');
        setNotificationStatus(true);
      }
    } catch (error) {
      setLoading(false);
      setServerErrorMessage(error?.message);
      setNotificationStatus(true);
    }
  };

  const handleDateChange = (name, value) => {
    setFields({ ...fields, [name]: value })
    setErrorMessages((pre) => {
      return {
        ...pre,
        [name]: ''
      }
    });
  };

  const resetFields = () => {
    setFields({
      _id: '',
      title: '',
      target_amount: '',
      start_date: new Date(),
      end_date: new Date(),
      description: '',
      status: false,
      secure_url: '',
      public_id: '',
      upload_photo: false,
    });
  };

  const onReset = () => {
    setNotificationStatus(false);
    setLoading(false);

    setServerErrorMessage('');
    if (errorType !== 'error') {
      resetFields();
      setErrorType('error');
    }
  };

  const handleUploadPhoto = (public_id, secure_url) => {
    setFields({ ...fields, public_id, secure_url, upload_photo: false });
  };

  const closeWindow = () => {
    setFields({ ...fields, upload_photo: false });
  }


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
                    errorMessages?.title && errorMessages?.title?.message
                  }
                  maxLength={50}
                  onChange={(e) => handleDateChange("title", e.target.value)}
                />
              </FormGroup>
            </Form>
            <Form horizontal >
              <FormGroup>
                <Input
                  id="target"
                  name="target"
                  placeholder=""
                  label="Target Amount"
                  value={fields.target_amount}
                  errorMessage={
                    errorMessages?.target_amount && errorMessages?.target_amount?.message
                  }
                  type="number"
                  maxLength={9}
                  onChange={(e) => handleDateChange("target_amount", parseFloat(e.target.value))}
                />
              </FormGroup>
            </Form>
             <Form horizontal className="py-2">
              <FormGroup>
                <DatePicker
                  format='D/MM/YYYY'
                  label="Select Start Date"
                  value={dayjs(fields.start_date)}
                  onChange={(newValue) => {
                    setFields({ ...fields, start_date: newValue.toDate() })
                  }}
                />
              </FormGroup>
              <FormGroup>
                <DatePicker
                  format='D/MM/YYYY'
                  label="Select End Date"
                  value={dayjs(fields.end_date)}
                  onChange={(newValue) => {
                    setFields({ ...fields, end_date: newValue.toDate() })
                  }}
                />
              </FormGroup>
            </Form>

            <Form horizontal>
              <FormGroup>
                <TextArea
                  id="description"
                  name="description"
                  placeholder=""
                  label="Description"
                  value={fields.description}
                  errorMessage={
                    errorMessages?.description &&
                    errorMessages?.description?.message
                  }
                  maxLength={1000}
                  onChange={(e) => handleDateChange("description", e.target.value)}
                  rows="5"
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

export default CampaignFormCard;
