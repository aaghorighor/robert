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
  User,
} from 'suftnet-ui-kit';
import { useMutation } from '@apollo/client';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from 'react-google-recaptcha-v3';
import { Link, useNavigate } from 'react-router-dom';
import Scroll from '../../../components/public/shared/scroll-up';
import { useAppContext } from '../../../components/shared/appContext';
import { LOGIN_RULES } from './rules';
import { SIGN_ON } from '../../../queries/secure';
import Notification from '../../shared/notification';
import { connectStripeCustomerPortal } from '../../../utils/helper';
import {
  STATUS_ACTIVE,
  STATUS_CANCELLED,
  STATUS_INCOMPLETE,
  STATUS_SUSPENDED,
  STATUS_TRIALING,
} from '../../../config/constants';

const Login = () => {
  const { isMobile, login, signOut } = useAppContext();
  const navigate = useNavigate();
  const [loginMutation, { error = {} }] = useMutation(SIGN_ON);
  const [errorMessages, setErrorMessages] = useState({});
  const [fields, setFields] = useState(LOGIN_RULES.fields);
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [isValidToken, setIsValidToken] = useState(false);
  const [expiredSubscription, setExpiredSubscription] = useState(false);
  const [cancelledSubscription, setCancelledSubscription] = useState(false);

  useEffect(() => {
    signOut();
  }, []);

  useEffect(() => {
    if (error && Object.keys(error).length) {
      setLoading(false);
      setServerErrorMessage(error.message);
      setNotificationStatus(true);
    }
  }, [error]);


  function handleActiveOrTrialing(signOn) {
    login({ ...signOn });
    navigate('/v1/dashboard');
  }

  function handleSuspendedOrIncomplete(signOn) {
    connectStripeCustomerPortal(signOn?.token, signOn.user)
  }

  const onKeyPress = async (event) => {
    event.preventDefault();
    if (event.key === 'Enter' && !event.shiftKey) {
      onSaveChange();
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    onSaveChange();
  };

  const onSaveChange = async () => {
    setErrorMessages({});

    if (!isValidToken) {
      return;
    }

    const { hasError, errors } = validate(fields, LOGIN_RULES.login);
    if (hasError) {
      setErrorMessages(errors);
      return false;
    }

    setLoading(true);
    const {
      data: { signOn },
    } = await loginMutation({
      variables: fields,
    });

    if (signOn && typeof signOn === 'object') {
      setLoading(false);

      switch (signOn.user.status.toLowerCase()) {
        case STATUS_ACTIVE:
        case STATUS_TRIALING:
          handleActiveOrTrialing(signOn);
          break;
        case STATUS_CANCELLED:          
        case STATUS_SUSPENDED:
        case STATUS_INCOMPLETE:
          const match = ["admin", "owner"].includes(signOn.user.role)
          if (match) {
            login({ ...signOn });
            handleSuspendedOrIncomplete(signOn);
          } else {
            setExpiredSubscription(true)
          }
          return;
        default:
          return;
      }
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
              className={`${isMobile ? 'mt-2 w-100' : 'mt-1'
                } w-100 justify-content-center align-items-center `}
            >
              <Grid col lg={3} md={4} xs={12}>
                {
                  expiredSubscription && (
                    <Card className="p-3 flex-column justify-content-center align-items-center">
                      <Text
                        as="h3"
                        className={`text-black fw-normal ms-2 text-center`}
                      >
                        Your subscription has expired.
                      </Text>
                      <Text
                        as="p"
                        className={`text-black fw-normal ms-2`}
                      >
                        Please contact the admin for renewal
                      </Text>
                    </Card>
                  )
                }
                {
                  cancelledSubscription && (
                    <Card className="p-3 flex-column justify-content-center align-items-center">
                      <Text
                        as="h3"
                        className={`text-black fw-normal ms-2 text-center`}
                      >
                        Your subscription is Canceled.
                      </Text>
                      <Text
                        as="p"
                        className={`text-black fw-normal ms-2`}
                      >
                        Your subscription has been canceled. Please renew to continue using the service.
                      </Text>
                    </Card>
                  )
                }
                <Card className="p-5 mt-2 shadow">
                  <GoogleReCaptchaProvider
                    reCaptchaKey={process.env.REACT_APP_RECAPTCHAT_KEY}
                    language="en-AU"
                  >
                    <Form>
                      <div className="flex-row justify-content-center align-items-center">
                        <User />
                        <Text
                          as="h3"
                          className={`text-black fw-normal ms-2 mb-2 ${isMobile ? 'text-center' : ''
                            }`}
                        >
                          Login
                        </Text>
                      </div>
                      <GoogleReCaptcha
                        onVerify={(token) => handleReCaptchaVerify(token)}
                      />
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
                      <Input
                        id="password"
                        name="password"
                        placeholder="Password"
                        type={'password'}
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
                    </Form>
                    <div className="flex-row justify-content-between align-items-center mt-3">
                      <Button
                        className="primary-solid-btn-0"
                        onKeyPress={onKeyPress}
                        onClick={onSubmit}
                      >
                        Sign In
                      </Button>
                      <Button
                        clear
                        className="rounded-circle-30 muted  solid-btn-0"
                        Component={Link}
                        to="/forgot-password"
                      >
                        Forgot Password
                      </Button>
                    </div>
                    <div className="flex-column justify-content-center align-items-center mt-3">
                      <FaRegArrowAltCircleLeft
                        size={30}
                        onClick={() => navigate('/')}
                        className="pointer"
                      />
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

export default Login;
