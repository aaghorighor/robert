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
  Select,
} from 'suftnet-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Notification from '../../shared/notification';
import { ADD_FELLOWSHIP, UPDATE_FELLOWSHIP } from '../../../queries/fellowship';
import { FELLOWSHIP_RULES } from './rules';
import {
  addMyFellowship,
  updateMyFellowship,
  resetFellowship,
} from '../../../redux/slices/fellowship-slice';
import FindAddress from '../../../components/shared/findAddress';
import { completeAddress } from '../../../utils/helper';

const FellowshipFormCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fellowship = {} } = useSelector((state) => state.fellowshipSlice);
  const [addFellowshipMutation] = useMutation(ADD_FELLOWSHIP);
  const [updateFellowshipMutation] = useMutation(UPDATE_FELLOWSHIP);
  const [errorMessages, setErrorMessages] = useState({});
  const [fields, setFields] = useState(FELLOWSHIP_RULES.fields);
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [errorType, setErrorType] = useState('error');

  useEffect(() => {
    if (fellowship && Object.keys(fellowship).length) {
      setFields({ ...fellowship });
      dispatch(resetFellowship());
    }
  }, [fellowship]);

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
      const { hasError, errors } = validate(fields, FELLOWSHIP_RULES.fellowship);
      if (hasError) {
        setErrorMessages(errors);
        return false;
      }

      setLoading(true);

      fields.completeAddress = completeAddress(fields)
      const { _id, ...saveFields } = fields;

      const {
        data: { addFellowship },
      } = await addFellowshipMutation({
        variables: { fellowshipInput: saveFields },
      });

      if (addFellowship && Object.keys(addFellowship).length) {
        setLoading(false);

        dispatch(addMyFellowship(addFellowship));

        setErrorType('success');
        setServerErrorMessage('Fellowship was added successfully.');
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
      const { hasError, errors } = validate(fields, FELLOWSHIP_RULES.fellowship);

      if (hasError) {
        setErrorMessages(errors);
        return false;
      }

      const {
        __typename,
        _id,
        edit,
        createdAt,
        location: { coordinates, type },
        ...updateFields
      } = fields;
      setLoading(true);

      const {
        data: { updateFellowship },
      } = await updateFellowshipMutation({
        variables: {
          fellowshipInput: {
            ...updateFields,
            location: {
              type,
              coordinates,
            },
          },
          fellowshipId: _id,
          completeAddress: completeAddress(fields)
        },
      });

      if (updateFellowship) {
        dispatch(updateMyFellowship(fields));

        setErrorType('success');
        setServerErrorMessage('Fellowship was changes was save successfully.');
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
      name: '',
      mobile: '',
      addressLine1: '',
      county: '',
      town: '',
      country: '',
      postcode: '',
      completeAddress: '',
      location: {
        type: '',
        coordinates: [],
      },
      status: false,
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

  const handleSelectedAddress = (selectedAddress) => {
    setFields((prev) => {
      return {
        ...prev,
        addressLine1: selectedAddress.address.suburb || selectedAddress.address.place || selectedAddress.address.municipality,
        town: selectedAddress.address.town || selectedAddress.address.city || selectedAddress.address.county,
        county: selectedAddress.address.county || selectedAddress.address.state || selectedAddress.address.state_district,
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

  return (
    <div className={`${loading ? 'overlay__block' : null}`}>
      <Card className="bw-0 p-4">
        <CardContent className="py-2 flex-1">
          <>
            <Form horizontal>
              <FormGroup>
                <Input
                  id="name"
                  name="name"
                  placeholder=""
                  label="Name"
                  value={fields.name}
                  errorMessage={
                    errorMessages?.name && errorMessages?.name?.message
                  }
                  maxLength={50}
                  onChange={(e) => handleDateChange("name", e.target.value)}
                />
              </FormGroup>
            </Form>
            <Form horizontal>
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
                  onChange={(e) => handleDateChange("mobile", e.target.value)}
                />
              </FormGroup>
            </Form>
            <FindAddress handleSelectedAddress={handleSelectedAddress} />
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
                  onChange={(e) => handleDateChange("addressLine1", e.target.value)}

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
                  onChange={(e) => handleDateChange("town", e.target.value)}

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
                  onChange={(e) => handleDateChange("county", e.target.value)}

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
                  onChange={(e) => handleDateChange("postcode", e.target.value)}
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
                  onChange={(e) => handleDateChange("country", e.target.value)}
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
          isPanelOpen={fields.upload_photo}
          handleUploadPhoto={handleUploadPhoto}
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

export default FellowshipFormCard;
