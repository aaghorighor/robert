import React, { useEffect, useState } from 'react';
import {
  Grid,
  Flex,
  Text,
  Button,
  Input,
  Form,
  Layout,
  Content,
  Card,
  validate,
  FormGroup,
} from 'suftnet-ui-kit';
import { useMutation } from '@apollo/client';
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from 'react-google-recaptcha-v3';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Scroll from '../shared/scroll-up';
import { useAppContext } from '../../shared/appContext';
import { RESET_PASSWORD_RULES } from './rules';
import { RESET_PASSWORD } from '../../../queries/secure';
import Notification from '../../shared/notification';

const ResetPassword = () => {
  const { isMobile } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const resetToken = searchParams.get('token');
  const [resetMutation, { error }] = useMutation(RESET_PASSWORD);
  const [errorMessages, setErrorMessages] = useState({});
  const [fields, setFields] = useState(RESET_PASSWORD_RULES.fields);
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [confirmPasswordMessages, setConfirmPasswordMessages] = useState('');
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    if (!resetToken) {
      navigate('/login');
    } else {
      setFields({ ...fields, token: resetToken });
      searchParams.delete('token');
      const updatedURL = `${location.pathname}?${searchParams.toString()}`;
      window.history.replaceState(null, '', updatedURL);
    }

    if (error) {
      setLoading(false);
      setServerErrorMessage(error.message);
      setNotificationStatus(true);
    }
  }, [error, resetToken]);

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

    if (!isValidToken) {
      return;
    }

    const { hasError, errors } = validate(fields, RESET_PASSWORD_RULES.reset);
    if (hasError) {
      setErrorMessages(errors);
      return false;
    }

    const fieldsCopy = { ...fields };
    delete fieldsCopy.confirm_password;

    setLoading(true);
    const result = await resetMutation({
      variables: fieldsCopy,
    });

    if (result) {
      setLoading(false);
      navigate(`/reset-password-completed`);
    }
  };

  const onReset = () => {
    setNotificationStatus(false);
    setLoading(false);
  };

  const handleReCaptchaVerify = async (token) => {
    if (!token) {
      return;
    }

    setIsValidToken(true);
  };

  return (
    <div className={`${loading ? 'overlay__block' : null}`}>
      <Layout>
        <Content
          justifyContent="center"
          direction="column"
          alignItems="center"
          className="mt-0"
        >
          <Scroll />
          <Flex
            justifyContent="center"
            direction="column"
            alignItems="center"
            className="py-5"
          >
            <Grid
              row
              spacing={4}
              className={`${
                isMobile ? 'mt-2 w-100' : 'mt-1'
              } w-100 justify-content-center align-items-center `}
            >
              <Grid col lg={3} md={4} xs={12}>
                <Card className="p-5 shadow">
                  <GoogleReCaptchaProvider
                    reCaptchaKey={process.env.REACT_APP_RECAPTCHAT_KEY}
                    language="en-AU"
                  >
                    <GoogleReCaptcha
                      onVerify={(token) => handleReCaptchaVerify(token)}
                    />
                    <Form>
                      <Text as="h3" className="text-center mb-4">
                        Reset Password
                      </Text>
                      <Text as="p" className="text-center mb-4">
                        You can use a combination of 8 or more characters,
                        including a variety of letters, numbers, and symbols.
                      </Text>
                      <FormGroup>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Password"
                          value={fields.password}
                          errorMessage={
                            errorMessages?.password &&
                            errorMessages?.password?.message
                          }
                          maxLength={20}
                          onChange={(e) =>
                            setFields({ ...fields, password: e.target.value })
                          }
                        />
                      </FormGroup>{' '}
                      <FormGroup>
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
                            setFields({
                              ...fields,
                              confirm_password: e.target.value,
                            })
                          }
                          onBlur={handleConfirmPassword}
                        />
                      </FormGroup>
                    </Form>
                    <div className="flex-row justify-content-between align-items-center mt-3">
                      <Button
                        className="primary-solid-btn-0"
                        onClick={onSubmit}
                      >
                        Submit
                      </Button>
                      <Button clear Component={Link} to="/login">
                        Cancel
                      </Button>
                    </div>
                  </GoogleReCaptchaProvider>
                </Card>
              </Grid>
            </Grid>
          </Flex>
        </Content>
      </Layout>
      <Notification
        status={notificationStatus}
        type="error"
        message={serverErrorMessage}
        duration={4000}
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

export default ResetPassword;
