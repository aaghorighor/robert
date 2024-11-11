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
import { ADD_EVENT_AGENDA, UPDATE_EVENT_AGENDA } from '../../../queries/event-agenda';
import { EVENT_AGENDA_RULES } from './rules';
import {
  addMyEventAgenda,
  updateMyEventAgenda,
  resetEventAgenda,
} from '../../../redux/slices/event-agenda-slice';
import { fullDayTimeSlots } from '../../../utils/time-slots-helpers';


const EventAgendaFormCard = () => {
  const dispatch = useDispatch();
  const location = useLocation()
  const navigate = useNavigate();
  const { eventAgenda = {} } = useSelector((state) => state.eventAgendaSlice);
  const [addEventAgendaMutation] = useMutation(ADD_EVENT_AGENDA);
  const [updateEventAgendaMutation] = useMutation(UPDATE_EVENT_AGENDA);
  const [errorMessages, setErrorMessages] = useState({});
  const [fields, setFields] = useState(EVENT_AGENDA_RULES.fields);
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [errorType, setErrorType] = useState('error');

  useEffect(() => {
    if (eventAgenda && Object.keys(eventAgenda).length) {
      setFields({ ...eventAgenda });
      dispatch(resetEventAgenda());
    }
  }, [eventAgenda]);

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
      const { hasError, errors } = validate(fields, EVENT_AGENDA_RULES.eventAgenda);
      if (hasError) {
        setErrorMessages(errors);
        return false;
      }

      setLoading(true);

      const { _id, ...saveFields } = fields;    
      const {
        data: { addEventAgenda },
      } = await addEventAgendaMutation({
        variables: { eventAgendaItemInput: {...saveFields, eventId :location.state.eventId } },
      });

      if (addEventAgenda && Object.keys(addEventAgenda).length) {
        setLoading(false);

        dispatch(addMyEventAgenda(addEventAgenda));

        setErrorType('success');
        setServerErrorMessage('Event Agenda was added successfully.');
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
      const { hasError, errors } = validate(fields, EVENT_AGENDA_RULES.eventAgenda);

      if (hasError) {
        setErrorMessages(errors);
        return false;
      }

      const {
        __typename,
        _id,
        edit,
        ...updateFields
      } = fields;
      setLoading(true);

      const {
        data: { updateEventAgenda },
      } = await updateEventAgendaMutation({
        variables: {
          eventAgendaItemInput: {...updateFields, eventId :location.state.eventId },
          agendaId: _id,
        },
      });

      if (updateEventAgenda) {
        setLoading(false);

        dispatch(updateMyEventAgenda(fields));

        setErrorType('success');
        setServerErrorMessage('Event Agenda was changes was save successfully.');
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
      start_time: '',
      end_time: '',
      description: '',
      status: false,
      facilitator: '',
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
                  rows="5"
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
                onClick={() => navigate(`/v1/events`)}
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

export default EventAgendaFormCard;
