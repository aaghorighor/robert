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
  SwitchButton,
  Spacer
} from 'suftnet-ui-kit';
import { useMutation } from '@apollo/client';
import { appContext } from '../../../shared/appContext';
import { FaSave } from 'react-icons/fa';
import { FiHelpCircle } from 'react-icons/fi';
import { UPDATE_BULK } from '../../../../queries/church';
import { CHURCH_GENERAL_SETTINGS_RULES } from './rules';
import Notification from '../../../shared/notification';

const GeneralCard = () => {
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
        bank_name: currentUser?.bank_name,
        sort_code: currentUser?.sort_code,
        reference: currentUser?.reference,
        account_number: currentUser?.account_number,
        prayer_request_email: currentUser?.prayer_request_email     
      });
    }
  }, [currentUser]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorMessages({});

    const copyFields = {
      ...fields,
      tax_rate: parseFloat(fields.tax_rate)
    }

    const { hasError, errors } = validate(
      copyFields,
      CHURCH_GENERAL_SETTINGS_RULES.General,
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
        variables: { bulkInput: copyFields },
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
                General
              </Text>
              <FiHelpCircle
                size={20}
                data-tooltip-id="large-tooltip"
                data-tooltip-content="This editor allows you to edit application fields, when you are done editing, simply click Save Changes to save the necessary changes."
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
                <Input
                  id="currency"
                  name="currency"
                  placeholder=""
                  label="Currency Symbol"
                  value={fields.currency}
                  errorMessage={
                    errorMessages?.currency && errorMessages?.currency?.message
                  }
                  maxLength={3}
                  onChange={(e) =>
                    setFields({ ...fields, currency: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Input
                  id="tax_rate"
                  name="tax_rate"
                  placeholder=""
                  label="Tax Rate"
                  value={fields.tax_rate}
                  errorMessage={
                    errorMessages?.tax_rate && errorMessages?.tax_rate?.message
                  }
                  maxLength={50}
                  onChange={(e) =>
                    setFields({
                      ...fields,
                      tax_rate: e.target.value,
                    })
                  }
                />
              </FormGroup>
            </Form>
            <Form horizontal>
              <FormGroup>
                <Input
                  id="email"
                  name="email"
                  placeholder=""
                  label="Prayer Request Email"
                  value={fields.prayer_request_email}
                  errorMessage={
                    errorMessages?.prayer_request_email && errorMessages?.prayer_request_email?.message
                  }
                  maxLength={50}
                  onChange={(e) =>
                    setFields({ ...fields, prayer_request_email: e.target.value })
                  }
                />
              </FormGroup>
            </Form>           
            <Form horizontal>
              <FormGroup>
                <div className="flex-row align-items-center justify-content-start mt-2">
                  <SwitchButton
                    isChecked={fields.isSearchable}
                    onToggle={(e) =>
                      setFields({ ...fields, isSearchable: e })
                    }
                  />
                  <label className="px-1 text-mute">Search by Members</label>
                </div>
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
    </div>
  );
};

export default GeneralCard;
