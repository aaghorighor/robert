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
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Notification from '../../../shared/notification';
import { ADD_PUSH_NOTIFICATION, UPDATE_PUSH_NOTIFICATION } from '../../../../queries/push-notification';
import { PUSH_NOTIFICATION_RULES } from './rules';
import {
  addMyPushNotification,
  updateMyPushNotification,
  resetPushNotification,
} from '../../../../redux/slices/push-notification-slice';

const PushNotificationFormCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pushNotification = {}, pushNotifications=[] } = useSelector((state) => state.notificationSlice);

  const [addNotificationMutation] = useMutation(ADD_PUSH_NOTIFICATION);
  const [updateNotificationMutation] = useMutation(UPDATE_PUSH_NOTIFICATION);

  const [errorMessages, setErrorMessages] = useState({});
  const [fields, setFields] = useState(PUSH_NOTIFICATION_RULES.fields);
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [errorType, setErrorType] = useState('error');

  useEffect(() => {
    if (pushNotification && Object.keys(pushNotification).length) {
      setFields({ ...pushNotification });
      dispatch(resetPushNotification());
    }
  }, [pushNotification]);

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
      const { hasError, errors } = validate(fields, PUSH_NOTIFICATION_RULES.pushNotification);
      if (hasError) {
        setErrorMessages(errors);
        return false;
      }

      setLoading(true);

      const { _id, edit, ...saveFields } = fields;
      const {
        data: { addPushNotification },
      } = await addNotificationMutation({
        variables: { pushNotificationInput: saveFields },
      });

      if (Object.keys(addPushNotification).length) {
        setLoading(false);

        dispatch(addMyPushNotification(addPushNotification));

        setErrorType('success');
        setServerErrorMessage('Push Notification was added successfully.');
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
        PUSH_NOTIFICATION_RULES.pushNotification,
      );
      if (hasError) {
        setErrorMessages(errors);
        return false;
      }

      const { __typename, edit, _id, createdAt, ...updateFields } = fields;
      setLoading(true);

      const {
        data: { updatePushNotification },
      } = await updateNotificationMutation({
        variables: { _id, pushNotificationInput: updateFields },
      });

      if (updatePushNotification) {
        setLoading(false);

        dispatch(updateMyPushNotification(fields));

        setErrorType('success');
        setServerErrorMessage('Push Notification changes was save successfully.');
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
      edit: false,
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
                  maxLength={31}
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
                  maxLength={75}
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
                <div className="flex-row align-items-center justify-content-start mt-2">
                  <SwitchButton
                    isChecked={fields.send_notification}
                    onToggle={(e) => setFields({ ...fields, send_notification: e })}
                  />
                  <label className="px-1 text-mute">Send Notification</label>
                </div>
              </FormGroup>
            </Form>
            <div className="flex-row justify-content-start align-items-center mt-3">
              <Button
                className="rounded-circle-30 primary-solid-btn-0"
                disabled={fields.edit ? false : pushNotifications.length === 5}
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

export default PushNotificationFormCard;
