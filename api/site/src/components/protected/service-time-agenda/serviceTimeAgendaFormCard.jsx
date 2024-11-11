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
  Select,
  SwitchButton,
  TextArea,
} from 'suftnet-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import Notification from '../../shared/notification';
import {
  ADD_SERVICE_TIME_AGENDA,
  UPDATE_SERVICE_TIME_AGENDA,
} from '../../../queries/service-times-agenda';
import { SERVICE_TIME_AGENDA_RULES } from './rules';
import {
  addMyServiceTimeAgenda,
  updateMyServiceTimeAgenda,
  resetServiceTimeAgenda,
} from '../../../redux/slices/service-time-agenda-slice';
import { fullDayTimeSlots, morningEveningTimeSlots } from '../../../utils/time-slots-helpers';

const ServiceTimeFormCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()
  const { serviceTimeAgenda = {} } = useSelector((state) => state.serviceTimeAgendaSlice);
  const [addServiceTimeAgendaMutation] = useMutation(ADD_SERVICE_TIME_AGENDA);
  const [updateServiceTimeMutation] = useMutation(UPDATE_SERVICE_TIME_AGENDA);
  const [errorMessages, setErrorMessages] = useState({});
  const [fields, setFields] = useState(SERVICE_TIME_AGENDA_RULES.fields);
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [errorType, setErrorType] = useState('error');

  useEffect(() => {
    if (serviceTimeAgenda && Object.keys(serviceTimeAgenda).length) {
      setFields({ ...serviceTimeAgenda });
      dispatch(resetServiceTimeAgenda());
    }
  }, [serviceTimeAgenda]);

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
      const { hasError, errors } = validate(
        fields,
        SERVICE_TIME_AGENDA_RULES.serviceTimeAgenda,
      );
      if (hasError) {
        setErrorMessages(errors);
        return false;
      }

      setLoading(true);

      const { _id, ...saveFields } = fields;
      const {
        data: { addServiceTimeAgenda },
      } = await addServiceTimeAgendaMutation({
        variables: { agendaItemInput: { ...saveFields, serviceTimeId: location.state.serviceTimeId } },
      });

      if (addServiceTimeAgenda && Object.keys(addServiceTimeAgenda).length) {

        dispatch(addMyServiceTimeAgenda(addServiceTimeAgenda));

        setErrorType('success');
        setServerErrorMessage('ServiceTime Agenda was added successfully.');
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
      const { hasError, errors } = validate(
        fields,
        SERVICE_TIME_AGENDA_RULES.serviceTimeAgenda,
      );

      if (hasError) {
        setErrorMessages(errors);
        return false;
      }

      const { __typename, edit, _id, ...updateFields } = fields;
      setLoading(true);

      const {
        data: { updateServiceTimeAgenda },
      } = await updateServiceTimeMutation({
        variables: {
          agendaItemInput: { ...updateFields, serviceTimeId: location.state.serviceTimeId },
          agendaId: _id,
        },
      });

      if (updateServiceTimeAgenda) {
        dispatch(updateMyServiceTimeAgenda(fields));

        setErrorType('success');
        setServerErrorMessage(
          'ServiceTime Agenda was changes was save successfully.',
        );
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
      title: '',
      start_time: '',
      end_time: '',
      description: '',
      sequency_no: 0,
      facilitator: '',
      status: false,
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
      <Card className="bw-0 p-4">
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
                    errorMessages?.title && errorMessages?.title?.message
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
                <Select
                  id={'start_time'}
                  label={'Start Time'}
                  options={(fullDayTimeSlots() || []).map((j) => {
                    return { description: j, value: j };
                  })}
                  value={fields.start_time}
                  errorMessage={
                    errorMessages?.start_time &&
                    errorMessages?.start_time?.message
                  }
                  onChange={(e) =>
                    setFields({ ...fields, start_time: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Select
                  id={'end_time'}
                  label={'End Time'}
                  options={(fullDayTimeSlots() || []).map((j) => {
                    return { description: j, value: j };
                  })}
                  value={fields.end_time}
                  errorMessage={
                    errorMessages?.end_time && errorMessages?.end_time?.message
                  }
                  onChange={(e) =>
                    setFields({ ...fields, end_time: e.target.value })
                  }
                />
              </FormGroup>
            </Form>
            <Form horizontal>
              <FormGroup>
                <Input
                  id="facilitator"
                  name="facilitator"
                  placeholder=""
                  label="Facilitator"
                  value={fields.facilitator}
                  errorMessage={
                    errorMessages?.facilitator && errorMessages?.facilitator?.message
                  }
                  maxLength={50}
                  onChange={(e) =>
                    setFields({ ...fields, facilitator: e.target.value })
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
                />
              </FormGroup>
            </Form>
            <Form horizontal>
              <FormGroup>
                <Select
                  id={'sequency_no'}
                  label={'Sequency'}
                  options={Array.from({ length: 20 }, (_, i) => i + 1).map((j) => {
                    return { description: j, value: j };
                  })}
                  value={fields.sequency_no}
                  errorMessage={
                    errorMessages?.sequency_no &&
                    errorMessages?.sequency_no?.message
                  }
                   onChange={(e) =>
                    setFields({ ...fields, sequency_no: parseInt(e.target.value) })
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
                onClick={(e) => onSubmit(e)}
              >
                Save Changes
              </Button>
              <Spacer horizontal={5} />
              <Button
                className="rounded-circle-30"
                onClick={() => navigate(`/v1/service-time`)}
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

export default ServiceTimeFormCard;
