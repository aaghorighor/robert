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
import { ADD_CONTACT, UPDATE_CONTACT } from '../../../../queries/contact';
import { CONTACT_RULES } from './rules';
import {
  addMyContact,
  updateMyContact,
  resetContact,
} from '../../../../redux/slices/contact-slice';

const ContactFormCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contact = {}, contacts = [] } = useSelector((state) => state.contactSlice);
  const [addContactMutation] = useMutation(ADD_CONTACT);
  const [updateContactMutation] = useMutation(UPDATE_CONTACT);
  const [errorMessages, setErrorMessages] = useState({});
  const [fields, setFields] = useState(CONTACT_RULES.fields);
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [errorType, setErrorType] = useState('error');

  useEffect(() => {
    if (contact && Object.keys(contact).length) {
      setFields({ ...contact });
      dispatch(resetContact());
    }
  }, [contact]);

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
      const { hasError, errors } = validate(fields, CONTACT_RULES.contact);
      if (hasError) {
        setErrorMessages(errors);
        return false;
      }

      setLoading(true);

      const { _id, edit, ...saveFields } = fields;
      const {
        data: { addContact },
      } = await addContactMutation({
        variables: { contactItemInput: saveFields },
      });

      if (Object.keys(addContact).length) {
        setLoading(false);

        dispatch(addMyContact(addContact));

        setErrorType('success');
        setServerErrorMessage('Contact was added successfully.');
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
        CONTACT_RULES.contact,
      );
      if (hasError) {
        setErrorMessages(errors);
        return false;
      }

      const { __typename, edit, _id, createdAt, ...updateFields } = fields;
      setLoading(true);

      const {
        data: { updateContact },
      } = await updateContactMutation({
        variables: { contactId : _id, contactItemInput: updateFields },
      });

      if (updateContact) {
        setLoading(false);

        dispatch(updateMyContact(fields));

        setErrorType('success');
        setServerErrorMessage('Contact was changes was save successfully.');
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
      fullNames: '',
      phone: '',
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
                  maxLength={50}
                  onChange={(e) =>
                    setFields({ ...fields, title: e.target.value })
                  }
                />
              </FormGroup>
            </Form>
            <Form horizontal>
              <FormGroup>
                <Input
                  id="full-names"
                  name="fullNames"
                  placeholder=""
                  label="FullNames"
                  value={fields.fullNames}
                  errorMessage={
                    errorMessages?.fullNames &&
                    errorMessages?.fullNames?.message
                  }
                  maxLength={50}
                  onChange={(e) =>
                    setFields({ ...fields, fullNames: e.target.value })
                  }
                />
              </FormGroup>
            </Form>
            <Form horizontal>
              <FormGroup>
                <Input
                  id="phone"
                  name="phone"
                  placeholder=""
                  label="Phone"
                  value={fields.phone}
                  errorMessage={
                    errorMessages?.phone &&
                    errorMessages?.phone?.message
                  }
                  maxLength={20}
                  onChange={(e) =>
                    setFields({ ...fields, phone: e.target.value })
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
            <div className="flex-row justify-content-start align-items-center mt-3">
              <Button
                className="rounded-circle-30 primary-solid-btn-0"
                disabled={contacts.length === 3}
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

export default ContactFormCard;
