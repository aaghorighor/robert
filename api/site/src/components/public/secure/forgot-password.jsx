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
} from 'suftnet-ui-kit';
import { useMutation } from '@apollo/client';
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from 'react-google-recaptcha-v3';
import { useNavigate, Link } from 'react-router-dom';
import Scroll from '../shared/scroll-up';
import { useAppContext } from '../../shared/appContext';
import { FORGOT_PASSWORD_RULES } from './rules';
import { FORGOT_PASSWORD } from '../../../queries/secure';
import Notification from '../../shared/notification';

const ForgotPassword = () => {
  const { isMobile } = useAppContext();
  const navigate = useNavigate();
  const [forgotMutation, { error }] = useMutation(FORGOT_PASSWORD);
  const [errorMessages, setErrorMessages] = useState({});
  const [fields, setFields] = useState(FORGOT_PASSWORD_RULES.fields);
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    if (error) {
      setLoading(false);
      setServerErrorMessage(error.message);
      setNotificationStatus(true);
    }
  }, [error]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorMessages({});

    if (!isValidToken) {
      return;
    }

    const { hasError, errors } = validate(fields, FORGOT_PASSWORD_RULES.forgot);
    if (hasError) {
      setErrorMessages(errors);
      return false;
    }

    setLoading(true);
    const result = await forgotMutation({
      variables: fields,
    });

    if (result) {
      setLoading(false);
      navigate(`/forgot-password-completed`);
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
                        Forgot Password
                      </Text>
                      <Text as="p" className="text-center mb-4">
                        Please provide the email address associated with your
                        account at the time of registration
                      </Text>
                      <Input
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={fields.email}
                        maxLength={50}
                        errorMessage={
                          errorMessages?.email && errorMessages?.email?.message
                        }
                        onChange={(e) =>
                          setFields({ ...fields, email: e.target.value })
                        }
                      />
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

export default ForgotPassword;
