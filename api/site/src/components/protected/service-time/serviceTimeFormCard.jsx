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
  Select,
  SwitchButton,
  TextArea,
} from 'suftnet-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Notification from '../../shared/notification';
import {
  ADD_SERVICE_TIME,
  UPDATE_SERVICE_TIME,
} from '../../../queries/service-times';
import { SERVICE_TIME_RULES } from './rules';
import {
  addMyServiceTime,
  updateMyServiceTime,
  resetServiceTime,
} from '../../../redux/slices/service-time-slice';
import { fullDayTimeSlots, morningEveningTimeSlots } from '../../../utils/time-slots-helpers';

const ServiceTimeFormCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { serviceTime = {} } = useSelector((state) => state.serviceTimeSlice);
  const [addServiceTimeMutation] = useMutation(ADD_SERVICE_TIME);
  const [updateServiceTimeMutation] = useMutation(UPDATE_SERVICE_TIME);
  const [errorMessages, setErrorMessages] = useState({});
  const [fields, setFields] = useState(SERVICE_TIME_RULES.fields);
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [errorType, setErrorType] = useState('error');

  useEffect(() => {
    if (serviceTime && Object.keys(serviceTime).length) {
      setFields({ ...serviceTime });
      dispatch(resetServiceTime());
    }
  }, [serviceTime]);

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
      setErrorMessages({})
      const { hasError, errors } = validate(
        fields,
        SERVICE_TIME_RULES.serviceTime,
      );

      if (hasError || fields.remote && !fields.remote_link) {
        const copyErrors = {
          ...errors
        }

        if (fields.remote && !fields.remote_link) {
          copyErrors.remote_link = {
            message: 'remote link is required'
          }
        }
        setErrorMessages(copyErrors);
        return false;
      }

      const { _id, ...saveFields } = fields;
      setLoading(true);
      const {
        data: { addServiceTime },
      } = await addServiceTimeMutation({
        variables: { serviceTimeInput: saveFields },
      });

      if (addServiceTime && Object.keys(addServiceTime).length) {

        dispatch(addMyServiceTime(addServiceTime));

        setErrorType('success');
        setServerErrorMessage('ServiceTime was added successfully.');
        setNotificationStatus(true);
      }
    } catch (error) {
      setServerErrorMessage(error?.message);
      setNotificationStatus(true);
    } finally {
      setLoading(false);
    }
  };
  const updateChanges = async () => {
    try {
      const { hasError, errors } = validate(
        fields,
        SERVICE_TIME_RULES.serviceTime,
      );

      if (hasError || fields.remote && !fields.remote_link) {
        const copyErrors = {
          ...errors
        }

        if (fields.remote && !fields.remote_link) {
          copyErrors.remote_link = {
            message: 'remote link is required'
          }
        }
        setErrorMessages(copyErrors);
        return false;
      }

      const { __typename, edit, agenda, createdAt, suid, _id, ...updateFields } = fields;
      setLoading(true);

      const {
        data: { editServiceTime },
      } = await updateServiceTimeMutation({
        variables: {
          serviceTimeInput: updateFields,
          serviceTimeId: _id,
        },
      });

      if (editServiceTime) {
        dispatch(updateMyServiceTime(fields));

        setErrorType('success');
        setServerErrorMessage(
          'Service Time was changes was save successfully.',
        );
        setNotificationStatus(true);
      }
    } catch (error) {
      setServerErrorMessage(error?.message);
      setNotificationStatus(true);
    } finally {
      setLoading(false);
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
      start_time: '',
      end_time: '',
      description: '',
      status: false,
      remote: false,
      remote_link: '',
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

  return (
    <div className={`${loading ? 'overlay__block' : null}`}>
      <Card className="bw-0  p-4">
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
            <Form horizontal>
              <FormGroup>
                <Select
                  id={'start_time'}
                  label={'Start Time'}
                  options={(fullDayTimeSlots() || []).map((j) => {
                    return { description: j, value: j };
                  })}
                  value={fields.start_time}
                  errorMessage={
                    errorMessages?.start_time &&
                    errorMessages?.start_time?.message
                  }
                  onChange={(e) => handleDateChange("start_time", e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Select
                  id={'end_time'}
                  label={'End Time'}
                  options={(fullDayTimeSlots() || []).map((j) => {
                    return { description: j, value: j };
                  })}
                  value={fields.end_time}
                  errorMessage={
                    errorMessages?.end_time && errorMessages?.end_time?.message
                  }
                  onChange={(e) => handleDateChange("end_time", e.target.value)}

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
                  maxLength={500}
                  onChange={(e) => handleDateChange("description", e.target.value)}
                />
              </FormGroup>
            </Form>
            <Form horizontal>
              <FormGroup>
                <Select
                  id={'sequency_no'}
                  label={'Sequency'}
                  options={Array.from({ length: 20 }, (_, i) => i + 1).map((j) => {
                    return { description: j, value: j };
                  })}
                  value={fields.sequency_no}
                  errorMessage={
                    errorMessages?.sequency_no &&
                    errorMessages?.sequency_no?.message
                  }
                  onChange={(e) => handleDateChange("sequency_no", parseInt(e.target.value))}
                />
              </FormGroup>             
            </Form>
            <Form horizontal>
              <FormGroup>
                <div className="flex-row align-items-center justify-content-start mt-2">
                  <SwitchButton
                    isChecked={fields.remote}
                    onToggle={(e) => setFields({ ...fields, remote: e })}
                  />
                  <label className="px-1 text-mute">Remote</label>
                </div>
              </FormGroup>
            </Form>
            {
              fields.remote && (
                <Form horizontal>
                  <FormGroup>
                    <TextArea
                      id="remote_link"
                      name="remote_link"
                      placeholder=""
                      label="Past Zoom or Team link"
                      value={fields.remote_link}
                      errorMessage={
                        errorMessages?.remote_link &&
                        errorMessages?.remote_link?.message
                      }
                      maxLength={500}
                      onChange={(e) => handleDateChange("remote_link", e.target.value)}
                    />
                  </FormGroup>
                </Form>
              )
            }
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

export default ServiceTimeFormCard;
