import React, { useContext, useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  validate,
  Input,
  Form,
  FormGroup,
  Button,
  Spacer,
  TextArea,
  SwitchButton,
} from 'suftnet-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Notification from '../../shared/notification';
import { appContext } from '../../shared/appContext';
import { ADD_Testimony, UPDATE_Testimony } from '../../../queries/testimony';
import { TESTIMONY_RULES } from '../settings/cards/rules';
import {
  addTestimony,
  updateMyTestimony,
  resetTestimony,
} from '../../../redux/slices/testimony-slice';

const TestimonyFormCard = () => {
  const { isMobile, currentUser } = useContext(appContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { testimony = {} } = useSelector((state) => state.testimonySlice);
  const [addTestimonyMutation] = useMutation(ADD_Testimony);
  const [updateTestimonyMutation] = useMutation(UPDATE_Testimony);
  const [errorMessages, setErrorMessages] = useState({});
  const [fields, setFields] = useState(TESTIMONY_RULES.fields);
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [errorType, setErrorType] = useState('error');

  useEffect(() => {
    if (testimony && Object.keys(testimony).length) {
      setFields({ ...testimony });
      dispatch(resetTestimony());
    }
  }, [testimony]);

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
      const { hasError, errors } = validate(fields, TESTIMONY_RULES.testimony);
      if (hasError) {
        setErrorMessages(errors);
        return false;
      }

      setLoading(true);

      const { _id, edit, ...saveFields } = fields;
      const result = await addTestimonyMutation({
        variables: {
          input: {
            ...saveFields,
            suid: currentUser.suid
          }
        },
      });

      if (result.data.createTestimony) {
        const createTestimony = result.data.createTestimony

        dispatch(addTestimony(createTestimony));

        setErrorType('success');
        setServerErrorMessage('Testimony was added successfully.');
        setNotificationStatus(true);
      }
    } catch (error) {

      setServerErrorMessage(error?.message);
      setNotificationStatus(true);
    } finally {
      setLoading(false);
    }
  };
  const updateChanges = async () => {
    try {

      const { ...updatedRules } = TESTIMONY_RULES.testimony;
      const { hasError, errors } = validate(
        fields,
        updatedRules,
      );
      if (hasError) {
        setErrorMessages(errors);
        return false;
      }

      const { __typename, edit,createdAt, ...updateFields } = fields;
      setLoading(true);

      const {
        data: { updateTestimony },
      } = await updateTestimonyMutation({
        variables: { input: {
          ...updateFields,
          suid: currentUser.suid
        } },
      });

      if (updateTestimony) {
        dispatch(updateMyTestimony(fields));
        setErrorType('success');
        setServerErrorMessage('Testimony was changes was save successfully.');
        setNotificationStatus(true);
      }
    } catch (error) {
      setServerErrorMessage(error?.message);
      setNotificationStatus(true);
    } finally {
      setLoading(false);
    }
  };

  const resetFields = () => {
    setFields({
      _id: '',
      first_name: '',
      last_name: '',
      description: '',     
      status: true,
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
                  id="first_name"
                  name="first_name"
                  placeholder=""
                  label="First Name"
                  value={fields.first_name}
                  errorMessage={
                    errorMessages?.first_name &&
                    errorMessages?.first_name?.message
                  }
                  maxLength={50}
                  onChange={(e) =>
                    setFields({ ...fields, first_name: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Input
                  id="last_name"
                  name="last_name"
                  placeholder=""
                  label="LastName"
                  value={fields.last_name}
                  errorMessage={
                    errorMessages?.last_name &&
                    errorMessages?.last_name?.message
                  }
                  maxLength={20}
                  onChange={(e) =>
                    setFields({ ...fields, last_name: e.target.value })
                  }
                />
              </FormGroup>
            </Form>
            <Form horizontal>
              <FormGroup>
                <TextArea
                  id="description"
                  name="description"
                  placeholder=""
                  label="Description"
                  value={fields.description}
                  errorMessage={
                    errorMessages?.description &&
                    errorMessages?.description?.message
                  }
                  maxLength={1000}
                  onChange={(e) =>
                    setFields({ ...fields, description: e.target.value })
                  }
                  rows="8"
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

export default TestimonyFormCard;
