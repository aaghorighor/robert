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
import { AiTwotoneEdit } from 'react-icons/ai';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Notification from '../../shared/notification';
import { ADD_EVENT, UPDATE_EVENT } from '../../../queries/event';
import { EVENT_RULES } from './rules';
import {
  addMyEvent,
  updateMyEvent,
  resetEvent,
} from '../../../redux/slices/event-slice';
import { fullDayTimeSlots } from '../../../utils/time-slots-helpers';
import { completeAddress, convertToUnix, converterTimeStampToDate } from '../../../utils/helper';
import dayjs from 'dayjs';
import UploadImagePanel from '../../../components/shared/upload-panel';
import FindAddress from '../../../components/shared/findAddress';
import { useAppContext } from '../../../components/shared/appContext';
import { DatePicker } from '@mui/x-date-pickers';

const EventFormCard = () => {
  const { currentUser } = useAppContext()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { event = {} } = useSelector((state) => state.eventSlice);
  const [addEventMutation] = useMutation(ADD_EVENT);
  const [updateEventMutation] = useMutation(UPDATE_EVENT);
  const [errorMessages, setErrorMessages] = useState({});
  const [fields, setFields] = useState(EVENT_RULES.fields);
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [errorType, setErrorType] = useState('error');

  useEffect(() => {
    if (event && Object.keys(event).length) {
      setFields({ ...event, start_date: converterTimeStampToDate(event.start_date), end_date: converterTimeStampToDate(event.end_date) });
      dispatch(resetEvent());
    }
  }, [event]);

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
      const { hasError, errors } = validate(fields, EVENT_RULES.event);
      if (hasError) {
        setErrorMessages(errors);
        return false;
      }

      setLoading(true);
      fields.completeAddress = completeAddress(fields)

      const { _id, upload_photo, ...saveFields } = fields;
      const {
        data: { addEvent },
      } = await addEventMutation({
        variables: { eventInput: saveFields },
      });

      if (addEvent && Object.keys(addEvent).length) {
        setLoading(false);

        dispatch(addMyEvent(addEvent));

        setErrorType('success');
        setServerErrorMessage('Event was added successfully.');
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
      const { hasError, errors } = validate(fields, EVENT_RULES.event);

      if (hasError) {
        setErrorMessages(errors);
        return false;
      }

      fields.completeAddress = completeAddress(fields)

      const {
        __typename,
        _id,
        edit,
        agenda,
        createdAt,
        upload_photo,
        register,
        ...updateFields
      } = fields;
      setLoading(true);

      const {
        data: { editEvent },
      } = await updateEventMutation({
        variables: {
          eventInput: {
            ...updateFields,
            location: {
              type: fields.location.type,
              coordinates: fields.location.coordinates,
            }
          },
          eventId: _id,
        }
      },
      );


      if (editEvent) {
        setLoading(false);
       
        const copy = {
          ...fields,
          start_date: convertToUnix(fields.start_date?.toLocaleDateString()),
          end_date: convertToUnix(fields.end_date?.toLocaleDateString())
        }

        dispatch(updateMyEvent(copy));

        setErrorType('success');
        setServerErrorMessage('Event was changes was save successfully.');
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
      start_time: '',
      end_time: '',
      start_date: new Date(),
      end_date: new Date(),
      description: '',
      secure_url: '',
      public_id: '',
      status: false,
      upload_photo: false,
      addressLine1: '',
      county: '',
      town: '',
      country: '',
      postcode: '',
      completeAddress: '',
      location: {
        type: "Point",
        coordinates: [],
      },
    });
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

  const handleSelectedAddress = (selectedAddress) => {
    setFields((prev) => {
      return {
        ...prev,
        addressLine1: selectedAddress.address.suburb || selectedAddress.address.place || selectedAddress.address.municipality,
        town: selectedAddress.address.town || selectedAddress.address.city,
        county: selectedAddress.address.county || selectedAddress.address.state,
        postcode:
          selectedAddress.address.country_code === 'gb' ||
            selectedAddress.address.country_code === 'us'
            ? selectedAddress.address.postcode
            : '',
        country: selectedAddress.address.country,
        completeAddress: selectedAddress.display_name,
        location: {
          type: 'Point',
          coordinates: [
            parseFloat(selectedAddress.lat),
            parseFloat(selectedAddress.lon),
          ],
        },
      };
    });
  };

  const closeWindow = () => {
    setFields({ ...fields, upload_photo: false });
  }

  return (
    <div className={`${loading ? 'overlay__block' : null}`}>
      <Card className="bw-2  p-4">
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
                  onChange={(e) =>
                    setFields({ ...fields, start_time: e.target.value })
                  }
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
                  onChange={(e) =>
                    setFields({ ...fields, end_time: e.target.value })
                  }
                />
              </FormGroup>
            </Form>
            <FindAddress handleSelectedAddress={handleSelectedAddress} />
            {
              fields.addressLine1 && (
                <>
                  <Form horizontal>
                    <FormGroup>
                      <Input
                        id="address"
                        name="address-line1"
                        placeholder=""
                        label="Street address"
                        value={fields.addressLine1}
                        errorMessage={
                          errorMessages?.addressLine1 &&
                          errorMessages?.addressLine1?.message
                        }
                        maxLength={50}
                        onChange={(e) =>
                          setFields({ ...fields, addressLine1: e.target.value })
                        }
                      />
                    </FormGroup>
                  </Form>
                  <Form horizontal>
                    <FormGroup>
                      <Input
                        id="town"
                        name="town"
                        placeholder=""
                        label="Town"
                        value={fields.town}
                        errorMessage={
                          errorMessages?.town && errorMessages?.town?.message
                        }
                        maxLength={50}
                        onChange={(e) =>
                          setFields({ ...fields, town: e.target.value })
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        id="county"
                        name="county"
                        placeholder=""
                        label="County"
                        value={fields.county}
                        maxLength={50}
                        onChange={(e) =>
                          setFields({ ...fields, county: e.target.value })
                        }
                      />
                    </FormGroup>
                  </Form>
                  <Form horizontal>
                    <FormGroup>
                      <Input
                        id="post-code"
                        name="postcode"
                        placeholder=""
                        label="Post code"
                        value={fields.postcode}
                        maxLength={50}
                        onChange={(e) =>
                          setFields({ ...fields, postcode: e.target.value })
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        id="country"
                        name="country"
                        placeholder=""
                        label="Country"
                        value={fields.country}
                        errorMessage={
                          errorMessages?.country && errorMessages?.country?.message
                        }
                        maxLength={50}
                        onChange={(e) =>
                          setFields({ ...fields, country: e.target.value })
                        }
                      />
                    </FormGroup>
                  </Form>
                </>
              )
            }

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
                  onChange={(e) =>
                    setFields({ ...fields, description: e.target.value })
                  }
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
            <Form horizontal>
              <FormGroup>
                <div className="flex-row align-items-center justify-content-start">
                  <SwitchButton
                    isChecked={fields.can_register}
                    onToggle={(e) => setFields({ ...fields, can_register: e })}
                  />
                  <label className="px-1 text-mute">Require Registration</label>
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

export default EventFormCard;
