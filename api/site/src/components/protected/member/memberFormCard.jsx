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
import Notification from '../../shared/notification';
import { appContext } from '../../shared/appContext';
import { ADD_MEMBER, UPDATE_MEMBER } from '../../../queries/member';
import { MEMBER_RULES } from '../settings/cards/rules';
import {
  addMember,
  updateMyMember,
  resetMember,
} from '../../../redux/slices/member-slice';

const MemberFormCard = () => {
  const { isMobile, currentUser } = useContext(appContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { member = {} } = useSelector((state) => state.memberSlice);
  const [addMemberMutation] = useMutation(ADD_MEMBER);
  const [updateMemberMutation] = useMutation(UPDATE_MEMBER);
  const [errorMessages, setErrorMessages] = useState({});
  const [fields, setFields] = useState(MEMBER_RULES.fields);
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [errorType, setErrorType] = useState('error');

  useEffect(() => {
    if (member && Object.keys(member).length) {
      setFields({ ...member });
      dispatch(resetMember());
    }
  }, [member]);

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
      const { hasError, errors } = validate(fields, MEMBER_RULES.member);
      if (hasError) {
        setErrorMessages(errors);
        return false;
      }

      setLoading(true);

      const { _id, edit, ...saveFields } = fields;
      const result = await addMemberMutation({
        variables: {
          input: {
            ...saveFields,
            suid: currentUser.suid
          }
        },
      });

      if (result.data.createMemberManual) {
        const createMember = result.data.createMemberManual

        dispatch(addMember(createMember));

        setErrorType('success');
        setServerErrorMessage('Member was added successfully.');
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

      const { ...updatedRules } = MEMBER_RULES.member;
      const { hasError, errors } = validate(
        fields,
        updatedRules,
      );
      if (hasError) {
        setErrorMessages(errors);
        return false;
      }

      const { __typename, role, edit,createdAt,updatedAt, ...updateFields } = fields;
      setLoading(true);

      const {
        data: { updateMember },
      } = await updateMemberMutation({
        variables: { input: updateFields },
      });

      if (updateMember) {
        dispatch(updateMyMember(fields));
        setErrorType('success');
        setServerErrorMessage('Member was changes was save successfully.');
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
      mobile: '',
      email: '',
      user_status: false,
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
                <div className="flex-row align-items-center justify-content-start mt-2">
                  <SwitchButton
                    isChecked={fields.user_status}
                    onToggle={(e) => setFields({ ...fields, user_status: e })}
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

export default MemberFormCard;
