import React, { useContext, useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { 
  Text,
  Button,
  Input,
  Form,
  FormGroup,
  CheckBox,
  validate,
} from 'suftnet-ui-kit';
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from 'react-google-recaptcha-v3';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { appContext } from '../../../shared/appContext';
import { VALIDATION_RULES } from './rules';
import { SUBSCRIPTION } from '../../../../queries/secure';
import { fetchPrice } from '../../../../assets/data/pricing';
import Notification from '../../../shared/notification';
import useMobile from '../../../../hooks/useMobile';
import FindAddress from '../../../../components/shared/findAddress';
import { completeAddress as fullAddress } from '../../../../utils/helper';

const CheckOutForm = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [subscriptionMutation, { error = {} }] = useMutation(SUBSCRIPTION);
  const { isMobile } = useMobile();
  const { login } = useContext(appContext);
  const [errorMessages, setErrorMessages] = useState({});
  const [confirmPasswordMessages, setConfirmPasswordMessages] = useState('');
  const [consent, setConsent] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [fields, setFields] = useState(VALIDATION_RULES.fields);
  const [subscriptionResult, setSubscriptionResult] = useState();
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [addressSelected, setAddressSelected] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);

useEffect(() => {
     function fetchAndSetPrice() {
        try {
            const result = fetchPrice(location.state.priceId);
            setFields(prevFields => ({
                ...prevFields, 
                planId: process.env.NODE_ENV === "production" ? result.live_priceId : result.priceId, 
                nickname: result.planName 
            }));
        } catch (error) {
            console.error("Error fetching price:", error);
        }
    }

    fetchAndSetPrice();
}, [location.state.priceId]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessages({});

    if (!stripe || !elements) {
      return;
    }

    if (!isValidToken) {
      return;
    }

    if (!consent) {
      setShowTooltip(true);
      return;
    }

    if (subscriptionResult) {
      setLoading(true);
      subscriptionPayment(subscriptionResult);
      return;
    }

    const { hasError, errors } = validate(fields, VALIDATION_RULES.rules);
    if (hasError) {
      setErrorMessages(errors);
      return false;
    }

    const fieldsCopy = {
      ...fields, address: {
        addressLine1: fields.addressLine1,
        county: fields.county,
        town: fields.town,
        country: fields.country,
        postcode: fields.postcode,
        country_code: fields.country_code,
        completeAddress: fullAddress(fields),
        location: fields.location,
      }
    };

    const { confirm_password, addressLine1, county, town, country, country_code, postcode, location, completeAddress, ...UpdatedFields } = fieldsCopy

    setLoading(true);
    const result = await subscriptionMutation({
      variables: { SubscriberInput: UpdatedFields },
    });

    if (result) {
      setSubscriptionResult(result.data);
      subscriptionPayment(result.data);
    }
  };

  const subscriptionPayment = async (data) => {
    const cardElement = elements.getElement(CardElement);
    let { error, paymentIntent } = await stripe.confirmCardPayment(
      data.createSubscription.clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${data.createSubscription.user.first_name} ${data.createSubscription.user.last_name}`,
            email: `${data.createSubscription.user.email}`,
          },
        },
      },
    );

    if (error) {
      setLoading(false);
      setServerErrorMessage(error.message);
      setNotificationStatus(true);
      return;
    }

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      const params = {
        user: data.createSubscription.user,
        token: data.createSubscription.token,
      };

      login(params);
      setLoading(false);
      navigate(`/check-out-completed`, {
        state: { priceId: location.state.priceId },
      });
    }
  };

  const onReset = () => {
    setNotificationStatus(false);
  };

  const handleReCaptchaVerify = async (token) => {
    if (!token) {
      return;
    }

    setIsValidToken(true);
  };

  const handleSelectedAddress = (selectedAddress) => {

    setAddressSelected(true)
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
        country_code: selectedAddress.address.country_code,
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

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
        border: '3px solid #32325d',
        backgroundColor: '#ffffff',
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
    hidePostalCode: true,
  };

  return (
    <div className={`${loading ? 'overlay__block' : null}`}>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.REACT_APP_RECAPTCHAT_KEY}
        language="en-AU"
      >
        <Form className={`${isMobile ? 'w-100' : 'w-100'}`}>
          <Text as="h6" className="text-start mt-5 fw-bold">
            Billing address
          </Text>
          <GoogleReCaptcha onVerify={(token) => handleReCaptchaVerify(token)} />
          <Form horizontal>
            <FormGroup>
              <Input
                id="church-name"
                name="church-name"
                placeholder="Church name"
                maxLength={50}
                value={fields.church_name}
                errorMessage={
                  errorMessages?.church_name &&
                  errorMessages?.church_name?.message
                }
                onChange={(e) =>
                  setFields({ ...fields, church_name: e.target.value })
                }
              />
            </FormGroup>
          </Form>
          <Form horizontal>
            <FormGroup>
              <Input
                id="first-name"
                name="first_name"
                placeholder="First name"
                maxLength={50}
                value={fields.first_name}
                errorMessage={
                  errorMessages?.first_name &&
                  errorMessages?.first_name?.message
                }
                onChange={(e) =>
                  setFields({ ...fields, first_name: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Input
                id="last-name"
                name="last_name"
                placeholder="Last name"
                maxLength={50}
                value={fields.last_name}
                errorMessage={
                  errorMessages?.last_name && errorMessages?.last_name?.message
                }
                onChange={(e) =>
                  setFields({ ...fields, last_name: e.target.value })
                }
              />
            </FormGroup>
          </Form>
          <Form horizontal>
            <FormGroup>
              <Input
                id="email"
                name="email"
                placeholder="Email"
                value={fields.email}
                errorMessage={
                  errorMessages?.email && errorMessages?.email?.message
                }
                maxLength={50}
                onChange={(e) =>
                  setFields({ ...fields, email: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Input
                id="mobile"
                name="mobile"
                placeholder="Mobile"
                value={fields.mobile}
                errorMessage={
                  errorMessages?.mobile && errorMessages?.mobile?.message
                }
                maxLength={20}
                onChange={(e) =>
                  setFields({ ...fields, mobile: e.target.value })
                }
              />
            </FormGroup>
          </Form>
          <Form horizontal>
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
            </FormGroup>
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
                  setFields({ ...fields, confirm_password: e.target.value })
                }
                onBlur={handleConfirmPassword}
              />
            </FormGroup>
          </Form>
          <FindAddress handleSelectedAddress={handleSelectedAddress} />

          {
            addressSelected && (
              <>
                <Form horizontal>
                  <FormGroup>
                    <Input
                      id="address"
                      name="address-line1"
                      placeholder="Street address"
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
                      placeholder="Town"
                      value={fields.town}
                      errorMessage={
                        errorMessages?.town && errorMessages?.town?.message
                      }
                      maxLength={50}
                      onChange={(e) => setFields({ ...fields, town: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      id="county"
                      name="county"
                      placeholder="County"
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
                      placeholder="Post code"
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
                      placeholder="Country"
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
            <Text as="h6" className="text-start mt-1 fw-bold">
              Payment
            </Text>
          </Form>
          <Form horizontal>
            <div
              style={{
                padding: '10px',
                backgroundColor: '#ffffff',
                border: '0.5px solid #ababaf',
                borderRadius: '30px',
              }}
            >
              <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>
          </Form>
          <Form>
            <div className="flex-row justify-content-start align-items-center">
              <CheckBox
                checked={consent}
                onChange={(e) => {
                  setConsent((option) => !option);
                  setShowTooltip(!e.target.checked);
                }}
              />
              <div>
                <Text as="p" className="muted mb-2">
                  By clicking on the consent box, you agree with the
                  <a> privacy policy </a> and <a> terms and condition</a> to use
                  the website to manage and handle your data.
                </Text>
                {showTooltip && (
                  <span className="text_small1 text-danger">
                    Please click the consent check box before submitting the
                    form.
                  </span>
                )}
              </div>
            </div>
          </Form>
          <Form horizontal>
            {
              addressSelected && (
                <Button
                  primary
                  disabled={fields.password !== fields.confirm_password}
                  className="rounded-circle-30"
                  isLoading={false}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              )
            }
            <Button
              type="default"
              className="rounded-circle-30"
              Component={Link}
              to="/"
            >
              Close
            </Button>
          </Form>
        </Form>
      </GoogleReCaptchaProvider>
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

export default CheckOutForm;
