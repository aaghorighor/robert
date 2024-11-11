import React, { useContext, useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Text,
  Button,
  Spacer
} from 'suftnet-ui-kit';
import { Tooltip } from 'react-tooltip';
import { useMutation } from '@apollo/client';
import { appContext } from '../../../shared/appContext';
import { FaSave } from 'react-icons/fa';
import { FiHelpCircle } from 'react-icons/fi';
import { UPDATE_FEATURES } from '../../../../queries/church';
import Notification from '../../../shared/notification';
import { FEATURES } from '../../../../config/constants';

const Features = () => {
  const { currentUser = {}, updateCurrentUser } = useContext(appContext);
  const [updateMutation, { error = {} }] = useMutation(UPDATE_FEATURES);

  const [fields, setFields] = useState([]);
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [errorType, setErrorType] = useState('error');

  useEffect(() => {
    if (currentUser && Object.keys(currentUser).length) {
      currentUser?.features && setFields([...currentUser?.features]);
    }
  }, [currentUser]);
 
  useEffect(() => {
    if (error && Object.keys(error).length) {
      setLoading(false);
      setServerErrorMessage(error.message);
      setNotificationStatus(true);
    }
  }, [error]);

  const handleButtonClick = (value) => {
    if (fields.includes(value)) {
      setFields(fields.filter((j) => j !== value));
    } else {
      setFields([...fields, value]);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    const result = await updateMutation({
      variables: { features: fields },
    });

    if (result) {
      setLoading(false);

      const body = {
        ...currentUser,
        features: fields,
      };
      updateCurrentUser(body);
    }
    setErrorType('success');
    setServerErrorMessage('Features was save successfully.');
    setNotificationStatus(true);
  };

  const onReset = () => {
    setNotificationStatus(false);
    setLoading(false);
    setErrorType('error');
    setServerErrorMessage('');
  };

  return (
    <div >
      <Card className="bw-2">
        <div className="bg-light p-3">
          <CardHeader className="flex-row align-items-center justify-content-between">
            <div className="flex-row align-items-center justify-content-between">
              <Text as="h2" className="text-dark fs-23 px-1">
                Features
              </Text>
              <FiHelpCircle
                size={20}
                data-tooltip-id="large-tooltip"
                data-tooltip-content="This editor allows you to enable or disabled feature from your account, when you are done doing it, simply click Save Changes to save the necessary changes."
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
        <CardContent className="py-4  p-4">
          {(FEATURES || []).map((option, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(option.id)}
              style={{
                backgroundColor: fields?.includes(option.id)
                  ? option.color
                  : 'white',
                border: `1px solid  ${option.color}`,
                borderRadius: '30px',
                padding: '5px 15px',
                marginRight: '5px',
                cursor: 'pointer',
                marginBottom: '5px',
                color: fields?.includes(option.id) ? 'white' : '#000000',
              }}
            >
              {option.name}
            </button>
          ))}
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

export default Features;
