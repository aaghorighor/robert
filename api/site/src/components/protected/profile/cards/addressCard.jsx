import React, { useContext, useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Text,
  validate,
  Input,
  Form,
  FormGroup,
  Spacer,
  Button
} from 'suftnet-ui-kit';
import { useMutation } from '@apollo/client';
import { Tooltip } from 'react-tooltip';
import Notification from '../../../shared/notification';
import { FaRegEdit, FaRegWindowClose, FaSave } from 'react-icons/fa';
import { FiHelpCircle } from 'react-icons/fi';
import { appContext } from '../../../shared/appContext';
import { ADDRESS_VALIDATION_RULES } from './rules';
import { UPDATE_CHURCH_ADDRESS } from '../../../../queries/church';
import FindAddress from '../../../../components/shared/findAddress';
import { completeAddress } from '../../../../utils/helper';

const AddressCard = () => {
  const { currentUser = {}, updateCurrentUser } = useContext(appContext);
  const [updateChurchAddressMutation, { error = {} }] = useMutation(
    UPDATE_CHURCH_ADDRESS,
  );
  const [errorMessages, setErrorMessages] = useState({});
  const [fields, setFields] = useState(ADDRESS_VALIDATION_RULES.fields);
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [edit, setEdit] = useState(false);
  const [errorType, setErrorType] = useState('error');

  useEffect(() => {
    if (error && Object.keys(error).length) {
      setLoading(false);
      setServerErrorMessage(error.message);
      setNotificationStatus(true);
    }
  }, [error]);

  useEffect(() => {
    if (currentUser && Object.keys(currentUser).length) {
      setFields({ ...currentUser?.address });
    }
  }, [currentUser]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorMessages({});

    try {
      const { hasError, errors } = validate(
        fields,
        ADDRESS_VALIDATION_RULES.address,
      );
      if (hasError) {
        setErrorMessages(errors);
        return false;
      }

      setLoading(true);
     
      const { __typename, location: { coordinates, type }, ...updatedField } = fields
      const {
        data: { updateChurchAddress },
      } = await updateChurchAddressMutation({
        variables: {
          addressInput: {
            ...updatedField, location: {
              type,
              coordinates
            },
            completeAddress : completeAddress(fields)
          }
        },
      });

      if (updateChurchAddress) {
        const body = {
          ...currentUser,
          address: fields,
        };
        updateCurrentUser(body);

        setErrorType('success');
        setServerErrorMessage('Address changes was save successfully.');
        setNotificationStatus(true);
      }
    } catch (e) {
      console.error(e)
    } finally {
      setEdit(false);
      setLoading(false);
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

  const onReset = () => {
    setNotificationStatus(false);
    setLoading(false);
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
              Address
              </Text>
              <FiHelpCircle
                size={20}
                data-tooltip-id="large-tooltip"
            data-tooltip-content="This allows you to edit or add your address effortlessly, When you are done,  Simply click the Save Changes to necessary changes."
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

        <CardContent className="py-4  p-4 flex-1 ">
          <>
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

export default AddressCard;
