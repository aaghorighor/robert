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
} from 'suftnet-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Notification from '../../shared/notification';
import { ADD_DONATION, UPDATE_DONATION } from '../../../queries/donation';
import { DONATION_RULES } from './rules';
import {
  addMyDonation,
  updateMyDonation,
  resetDonation,
} from '../../../redux/slices/donation-slice';
import { converterTimeStampToDate, convertToUnix } from '../../../utils/helper';
import { DONATION_TYPE } from '../../../config/constants';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';

const DonationFormCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { donation = {} } = useSelector((state) => state.donationSlice);
  const [addDonationMutation] = useMutation(ADD_DONATION);
  const [updateDonationMutation] = useMutation(UPDATE_DONATION);
  const [errorMessages, setErrorMessages] = useState({});
  const [fields, setFields] = useState(DONATION_RULES.fields);
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [errorType, setErrorType] = useState('error');

  useEffect(() => {
    if (donation && Object.keys(donation).length) {
      setFields({ ...donation, date_donated: converterTimeStampToDate(donation.date_donated) });
      dispatch(resetDonation());
    }
  }, [donation]);

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
      const { hasError, errors } = validate(fields, DONATION_RULES.donation);
      if (hasError) {
        setErrorMessages(errors);
        return false;
      }

      setLoading(true);

      const { _id, ...saveFields } = fields;
      const {
        data: { addDonation },
      } = await addDonationMutation({
        variables: { donationInput: saveFields },
      });

      if (addDonation && Object.keys(addDonation).length) {
        dispatch(addMyDonation(addDonation));
        setErrorType('success');
        setServerErrorMessage('Donation was added successfully.');
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
      const { hasError, errors } = validate(fields, DONATION_RULES.event);

      if (hasError) {
        setErrorMessages(errors);
        return false;
      }

      const {
        __typename,
        _id,
        edit,
        createdAt,
        ...updateFields
      } = fields;
      setLoading(true);

      const {
        data: { updateDonation },
      } = await updateDonationMutation({
        variables: {
          donationInput: updateFields,
          donationId: _id,
        },
      });

      if (updateDonation) {
        setLoading(false);

         const copy = {
          ...fields,
          date_donated: convertToUnix(fields.date_donated?.toLocaleDateString()),      
        }

        dispatch(updateMyDonation(copy));

        setErrorType('success');
        setServerErrorMessage('Donation was changes was save successfully.');
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
      amount: '',
      date_donated: new Date(),
      online: false,
      email: '',
      last_name: '',
      first_name: '',
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
      <Card className="bw-0 p-4">
        <CardContent className="py-2 flex-1">
          <>
            <Form horizontal>
              <FormGroup>
                <Select
                  id={'donation-type'}
                  label={'Donation Type'}
                  options={DONATION_TYPE}
                  value={fields.donation_type}
                  errorMessage={
                    errorMessages?.donation_type && errorMessages?.donation_type?.message
                  }               
                  onChange={(e) => handleDateChange("donation_type", e.target.value)}
                />
              </FormGroup>
            </Form>
            <Form horizontal>
              <FormGroup>
                <Input
                  id="amount"
                  name="amount"
                  placeholder=""
                  label="Amount*"
                  type="number"
                  value={fields.amount}
                  errorMessage={
                    errorMessages?.amount && errorMessages?.amount?.message
                  }
                  maxLength={9}                 
                  onChange={(e) => handleDateChange("amount", parseFloat(e.target.value))}
                />
              </FormGroup>
            </Form>
            <Form horizontal>
              <FormGroup>
                <Input
                  id="first_name"
                  name="first_name"
                  placeholder=""
                  label="First Name"
                  value={fields.first_name}
                  maxLength={50}
                  onChange={(e) => handleDateChange("first_name", e.target.value)}                 
                />
              </FormGroup>
              <FormGroup>
                <Input
                  id="last_name"
                  name="last_name"
                  placeholder=""
                  label="LastName"
                  value={fields.last_name}
                  maxLength={20}
                  onChange={(e) => handleDateChange("last_name", e.target.value)}                   
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
                  onChange={(e) => handleDateChange("email", e.target.value)}                  
                />
              </FormGroup>
            </Form>
            <Form horizontal className="py-2">
              <FormGroup>
                <DatePicker
                  format='D/MM/YYYY'
                  label="Select Start Date"
                  value={dayjs(fields.date_donated)}
                  onChange={(newValue) => {
                    setFields({ ...fields, date_donated: newValue.toDate() })
                  }}
                />
              </FormGroup>
            </Form>

            <Form horizontal>
              <FormGroup>
                <div className="flex-row align-items-center justify-content-start mt-2">
                  <SwitchButton
                    isChecked={fields.online}
                    onToggle={(e) => setFields({ ...fields, online: e })}
                  />
                  <label className="px-1 text-mute">On line</label>
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

export default DonationFormCard;
