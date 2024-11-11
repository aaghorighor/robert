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
  Select,
  SwitchButton,
} from 'suftnet-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Notification from '../../../shared/notification';
import { appContext } from '../../../shared/appContext';
import { ADD_USER, UPDATE_USER } from '../../../../queries/user';
import { USER_RULES } from './rules';
import {
  addUser,
  updateMyUser,
  resetUser,
} from '../../../../redux/slices/user-slice';
import { USER_ROLES } from '../../../../config/constants';

const UserFormCard = () => {
  const { isMobile, currentUser } = useContext(appContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user ={} } = useSelector((state) => state.userSlice);
  const [addUserMutation] = useMutation(ADD_USER);
  const [updateUserMutation] = useMutation(UPDATE_USER);
  const [errorMessages, setErrorMessages] = useState({});
  const [fields, setFields] = useState(USER_RULES.fields);
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [errorType, setErrorType] = useState('error');

  useEffect(() => {
    if (user && Object.keys(user).length) {
      setFields({ ...user });
      dispatch(resetUser());
    }
  }, [user]);

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
      const { hasError, errors } = validate(fields, USER_RULES.user);
      if (hasError) {
        setErrorMessages(errors);
        return false;
      }

      setLoading(true);

      const { _id, ...saveFields } = fields;
      const {
        data: { createUser },
      } = await addUserMutation({
        variables: saveFields,
      });

      if (Object.keys(createUser).length) {
        setLoading(false);

        dispatch(addUser(createUser));

        setErrorType('success');
        setServerErrorMessage('User was added successfully.');
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

      const { password, ...updatedRules } = USER_RULES.user;
      const { hasError, errors } = validate(
        fields,
        fields.change_password ? USER_RULES.user : updatedRules,
      );
      if (hasError) {
        setErrorMessages(errors);
        return false;
      }

      const { __typename, ...updateFields } = fields;
      setLoading(true);

      const {
        data: { updateUser },
      } = await updateUserMutation({
        variables: updateFields,
      });

      if (updateUser) {
        setLoading(false);

        dispatch(updateMyUser(fields));

        setErrorType('success');
        setServerErrorMessage('User was changes was save successfully.');
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
      first_name: '',
      last_name: '',
      mobile: '',
      email: '',
      password: '',
      user_status: false,
      change_password: false,
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
                <Input
                  id="email"
                  name="email"
                  placeholder=""
                  label="Email"
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
                  placeholder=""
                  label="Mobile"
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
                <Select
                  id={'user_role'}
                  label={'Role'}
                  options={USER_ROLES}
                  value={fields.role}
                  errorMessage={
                    errorMessages?.role && errorMessages?.role?.message
                  }
                  onChange={(e) =>
                    setFields({ ...fields, role: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Input
                  id="password"
                  name="password"
                  placeholder=""
                  label="Password"
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
            </Form>
            <Form horizontal>
              <FormGroup>
                <div className="flex-row align-items-center justify-content-start mt-2">
                  <SwitchButton
                    isChecked={fields.user_status}
                    onToggle={(e) => setFields({ ...fields, user_status: e })}
                  />
                  <label className="px-1 text-mute">Status</label>
                </div>
              </FormGroup>
            </Form>
            {fields?.edit && (
              <Form horizontal>
                <FormGroup>
                  <div className="flex-row align-items-center justify-content-start mt-2">
                    <SwitchButton
                      isChecked={fields.change_password}
                      onToggle={(e) =>
                        setFields({ ...fields, change_password: e })
                      }
                    />
                    <label className="px-1 text-mute">Change Password</label>
                  </div>
                </FormGroup>
              </Form>
            )}
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

export default UserFormCard;
