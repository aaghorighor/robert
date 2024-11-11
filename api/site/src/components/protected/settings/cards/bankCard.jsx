import React, { useContext, useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Text,
  Form,
  FormGroup,
  Input,
  validate,
  Button,
  Spacer,
  SwitchButton
} from 'suftnet-ui-kit';
import { useMutation } from '@apollo/client';
import { appContext } from '../../../shared/appContext';
import { FaSave } from 'react-icons/fa';
import { FiHelpCircle } from 'react-icons/fi';
import { UPDATE_BULK } from '../../../../queries/church';
import { CHURCH_GENERAL_SETTINGS_RULES } from './rules';
import Notification from '../../../shared/notification';
import { onStripeOnBoarding } from '../../../../utils/helper';

const BankCard = () => {
  const { currentUser = {}, updateCurrentUser } = useContext(appContext);
  const [updateBulkMutation, { error = {} }] = useMutation(UPDATE_BULK);
  const [errorMessages, setErrorMessages] = useState({});
  const [fields, setFields] = useState(CHURCH_GENERAL_SETTINGS_RULES.fields);
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);
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
      setFields({
        currency: currentUser?.currency,
        tax_rate: currentUser?.tax_rate,
        isSearchable: currentUser?.isSearchable,
        bank_name: currentUser?.bank_name || "",
        sort_code: currentUser?.sort_code || "",
        reference: currentUser?.reference || "",
        account_number: currentUser?.account_number || "",
        giving_url: currentUser?.giving_url,
        enable_url_giving: currentUser?.enable_url_giving, 
        enable_bank_transfer: currentUser?.enable_bank_transfer,
        enable_app_giving: currentUser?.enable_app_giving
      });
    }
  }, [currentUser]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorMessages({});

    const { hasError, errors } = validate(
      fields,
      CHURCH_GENERAL_SETTINGS_RULES.bankRules,
    );

    if (hasError) {
      setErrorMessages(errors);
      return false;
    }

    setLoading(true);

    try {
      const {
        data: { updateBulk },
      } = await updateBulkMutation({
        variables: { bulkInput: fields },
      });

      if (updateBulk) {
        const body = {
          ...currentUser,
          ...fields,
        };

        updateCurrentUser(body);
        setErrorType('success');
        setServerErrorMessage('Your changes was save successfully.');
        setNotificationStatus(true);
      }
    } finally {
      setLoading(false);
    }
  }

  const handleStripeOnBoarding = async () => {
    if (currentUser && currentUser?.stripe_user_id) {
      const body = {
        stripe_user_id: currentUser?.stripe_user_id
      }
      await onStripeOnBoarding(body)
    }
  }

  const handleStripeDashboard = async () => {
    let anchor = document.createElement('a');
    anchor.href = "https://stripe.com/";
    anchor.target = "_blank";
    document.body.appendChild(anchor); // Attach to the document
    anchor.click(); // Simulate a click
    document.body.removeChild(anchor); // Remove from the document
  }

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
                Giving
              </Text>
              <FiHelpCircle
                size={20}
                data-tooltip-id="large-tooltip"
                data-tooltip-content="This editor allows you to set up various giving options , when you are done editing, simply click Save Changes to save the necessary changes."
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
        <CardContent className="py-4 p-4 flex-1 ">
          <>
            <Form horizontal>
              <FormGroup>
                <div className="flex-row align-items-center justify-content-between mt-2">
                  {/* <label className="text">Bank Transfer</label> */}
                  <Text as="h3" className="text-dark fs-23">
                    Bank Transfer
                  </Text>
                  <SwitchButton
                    isChecked={fields.enable_bank_transfer}
                    onToggle={(e) =>
                      setFields({ ...fields, enable_bank_transfer: e })
                    }
                  />

                </div>
              </FormGroup>
            </Form>
            {
               fields.enable_bank_transfer && (
                <>
                  <Form horizontal>
                    <FormGroup>
                      <Input
                        id="bank_name"
                        name="bank_name"
                        placeholder=""
                        label="Bank name"
                        value={fields.bank_name}
                        errorMessage={
                          errorMessages?.bank_name && errorMessages?.bank_name?.message
                        }
                        maxLength={50}
                        onChange={(e) =>
                          setFields({ ...fields, bank_name: e.target.value })
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        id="sort_code"
                        name="sort_code"
                        placeholder=""
                        label="Sort Code"
                        value={fields.sort_code}
                        errorMessage={
                          errorMessages?.sort_code && errorMessages?.sort_code?.message
                        }
                        maxLength={10}
                        onChange={(e) =>
                          setFields({
                            ...fields,
                            sort_code: e.target.value,
                          })
                        }
                      />
                    </FormGroup>
                  </Form>
                  <Form horizontal>
                    <FormGroup>
                      <Input
                        id="account_number"
                        name="account_number"
                        placeholder=""
                        label="Account Number"
                        value={fields.account_number}
                        errorMessage={
                          errorMessages?.account_number && errorMessages?.account_number?.message
                        }
                        maxLength={10}
                        onChange={(e) =>
                          setFields({
                            ...fields,
                            account_number: e.target.value,
                          })
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        id="reference"
                        name="reference"
                        placeholder=""
                        label="Reference"
                        value={fields.reference}
                        errorMessage={
                          errorMessages?.reference && errorMessages?.reference?.message
                        }
                        maxLength={50}
                        onChange={(e) =>
                          setFields({
                            ...fields,
                            reference: e.target.value,
                          })
                        }
                      />
                    </FormGroup>
                  </Form>
                </>
               )
            }
            <Form horizontal>
              <FormGroup>
                <div className="flex-row align-items-center justify-content-between mt-2">
                  <Text as="h3" className="text-dark fs-23">
                    Online Giving
                  </Text>
                  <SwitchButton
                    isChecked={fields.enable_url_giving}
                    onToggle={(e) =>
                      setFields({ ...fields, enable_url_giving: e })
                    }
                  />

                </div>
              </FormGroup>
            </Form>
            {
              fields.enable_url_giving && (
                <Form horizontal>
                  <FormGroup>
                    <Input
                      id="giving"
                      name="giving"
                      placeholder=""
                      label="Url"
                      value={fields.giving_url}
                      errorMessage={
                        errorMessages?.giving_url && errorMessages?.giving_url?.message
                      }
                      maxLength={50}
                      onChange={(e) =>
                        setFields({ ...fields, giving_url: e.target.value })
                      }
                    />
                  </FormGroup>
                </Form>
              )
            }
            <Form horizontal>
              <FormGroup>
                <div className="flex-row align-items-center justify-content-between mt-2">
                  <Text as="h3" className="text-dark fs-23">
                    In App Giving
                  </Text>
                  <SwitchButton
                    isChecked={fields.enable_app_giving}
                    onToggle={(e) =>
                      setFields({ ...fields, enable_app_giving: e })
                    }
                  />

                </div>
              </FormGroup>
            </Form>
            {
              fields.enable_app_giving && (
                <>
                  {
                    currentUser?.onboardingComplete ? <>
                      <Button
                        className="rounded-circle-30 primary-solid-btn-0 btn-color-12 py-0"
                        onClick={() => handleStripeDashboard()}
                      > Stripe Dashboard</Button>

                    </> : <>
                      <Button
                        className="rounded-circle-30 primary-solid-btn-0 btn-color-11"
                        onClick={() => handleStripeOnBoarding()}
                      >  <FaStripeS
                        size={20}
                        className="text-white pointer mx-xl-1"
                      ></FaStripeS> Setup Stripe Account</Button>
                    </>}
                </>
              )
            }

           
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
    </div>
  );
};

export default BankCard;
