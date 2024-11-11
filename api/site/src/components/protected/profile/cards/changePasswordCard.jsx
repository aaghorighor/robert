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
  Button,
  Spacer
} from 'suftnet-ui-kit';
import { useMutation } from '@apollo/client';
import { Tooltip } from 'react-tooltip';
import { FiHelpCircle } from 'react-icons/fi';
import Notification from '../../../shared/notification';
import { FaRegEdit, FaRegWindowClose, FaSave } from 'react-icons/fa';
import { appContext } from '../../../shared/appContext';
import { CHANGE_USER_PASSWORD } from '../../../../queries/user';
import { PASSWORD_VALIDATION_RULES } from './rules';

const ChangePasswordCard = () => {
  const { isMobile } = useContext(appContext);
  const [changePasswordMutation, { error = {} }] = useMutation(CHANGE_USER_PASSWORD);
  const [errorMessages, setErrorMessages] = useState({});
  const [fields, setFields] = useState(PASSWORD_VALIDATION_RULES.fields);
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [edit, setEdit] = useState(false);
  const [confirmPasswordMessages, setConfirmPasswordMessages] = useState('');
  const [errorType, setErrorType] = useState('error');

  useEffect(() => {
    if (error && Object.keys(error).length) {
      setLoading(false);
      setServerErrorMessage(error.message);
      setNotificationStatus(true);
    }

  }, [error]);

  const handleConfirmPassword = (event) => {
    event.preventDefault();
    setConfirmPasswordMessages('');
    if (fields.password !== fields.confirm_password)
      setConfirmPasswordMessages(
        'The confirm password does not match the entered password',
      );
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorMessages({});

    const { hasError, errors } = validate(
      fields,
      PASSWORD_VALIDATION_RULES.password,
    );
    if (hasError) {
      setErrorMessages(errors);
      return false;
    }

    const fieldsCopy = { ...fields };
    delete fieldsCopy.confirm_password;

    setLoading(true);

    const result = await changePasswordMutation({
      variables: fieldsCopy,
    });

    if (result) {
      setEdit(false);
      setLoading(false);

      setErrorType('success')
      setServerErrorMessage("Password changes was save successfully.");
      setNotificationStatus(true);
    }
  };

  const onReset = () => {
    setNotificationStatus(false);
    setLoading(false);
    setErrorType('error')
    setServerErrorMessage("");
  };

  return (
    <div className={`${loading ? 'overlay__block' : null}`}>
      <Card className="bw-2">
        <div className='bg-light p-3'>
          <CardHeader className="flex-row align-items-center justify-content-between">
            <div className="flex-row align-items-center justify-content-between">
              <Text as="h2" className="text-dark fs-23 px-1">
                Change Password
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
        <CardContent className="py-4  p-4 flex-1 ">
          <Form vertical>
            <FormGroup>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={fields.password}
                errorMessage={
                  errorMessages?.password && errorMessages?.password?.message
                }
                maxLength={20}
                onChange={(e) =>
                  setFields({ ...fields, password: e.target.value })
                }
              />
              <div className="py-1"></div>
              <Input
                id="confirm_password"
                name="confirm_password"
                placeholder="Confirm password"
                type="password"
                value={fields.confirm_password}
                errorMessage={
                  confirmPasswordMessages
                    ? confirmPasswordMessages
                    : errorMessages?.confirm_password &&
                    errorMessages?.confirm_password?.message
                }
                maxLength={20}
                onChange={(e) =>
                  setFields({ ...fields, confirm_password: e.target.value })
                }
                onBlur={handleConfirmPassword}
              />
            </FormGroup>
          </Form>
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

export default ChangePasswordCard;
