import React, { useState, useContext, useEffect } from 'react';
import {
  Card,
  CardContent,
  validate,
  TextArea,
  Form,
  FormGroup,
  Select,
  Button,
  Spacer,
} from 'suftnet-ui-kit';
import { useMutation } from '@apollo/client';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Notification from '../../../shared/notification';
import { UPDATE_APPOINTMENT_NOTE } from '../../../../queries/patient';
import { NOTE_FORM_RULES } from './rules';
import { appContext } from '../../../shared/appContext';
import { APPOINTMENT_STATUS } from '../../../../config/constants';

function NoteForm({ row, handlePanelToggle }) {
  const { currentUser = {} } = useContext(appContext);
  const [addNoteMutation, { error = {} }] = useMutation(
    UPDATE_APPOINTMENT_NOTE,
  );
  const [errorMessages, setErrorMessages] = useState({});
  const [fields, setFields] = useState(NOTE_FORM_RULES.fields);
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [errorType, setErrorType] = useState('error');
  const [notificationStatus, setNotificationStatus] = useState(false);

  useEffect(() => {
    if (row?.note) {
      setFields((j) => {
        return { ...j, note: row?.note };
      });
    }
  }, [row]);

  useEffect(() => {
    if (Object.keys(error).length) {
      setLoading(false);
      setServerErrorMessage(error.message);
      setNotificationStatus(true);
    }
  }, [error]);

  const handleSubmit = async () => {
    setErrorMessages({});
    const { hasError, errors } = validate(fields, NOTE_FORM_RULES.Note);
    if (hasError) {
      setErrorMessages(errors);
      return false;
    }

    setLoading(true);

    const fieldCopy = {
      ...fields,
      slotId: row?.slotId,
      patientId: row?.patientId,
      scheduleId: row?.scheduleId,
      doctorId: currentUser?.userId,
    };

    const {
      data: { updateAppointmentNote },
    } = await addNoteMutation({
      variables: {
        appointmentNote: fieldCopy,
      },
    });

    if (updateAppointmentNote) {
      setLoading(false);

      setErrorType('success');
      setServerErrorMessage('Your Note was save successfully.');
      setNotificationStatus(true);
      handlePanelToggle();
    }
  };

  const resetFields = () => {
    setFields({
      note: '',
      status: '',
    });
  };

  const handleClose = () => {
    onReset();
    handlePanelToggle();
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
    <div className="w-100 mt-2">
      <div className={`${loading ? 'overlay__block' : null} `}>
        <Card className="bw-2  p-4">
          <CardContent className="py-2 flex-1">
            <>
              <Form vertical>
                <ReactQuill
                  value={fields.note}
                  className="ql-editor"
                  theme="snow"
                  onChange={(e) => setFields({ ...fields, note: e })}
                />
                {errorMessages?.note && (
                  <span className="icon-color-3">
                    {errorMessages.note.message}
                  </span>
                )}
              </Form>
              <Form vertical className="mt-4">
                <Select
                  id={'appointment-status'}
                  label={'Appointment Status'}
                  options={APPOINTMENT_STATUS}
                  value={fields.status}
                  errorMessage={
                    errorMessages?.status && errorMessages?.status?.message
                  }
                  onChange={(e) =>
                    setFields({ ...fields, status: e.target.value })
                  }
                />
              </Form>
              <div className="flex-row justify-content-start align-items-center mt-3">
                <Button
                  className="rounded-circle-30 primary-solid-btn-0"
                  onClick={(e) => handleSubmit(e)}
                >
                  Save Changes
                </Button>
                <Spacer horizontal={5} />
                <Button className="rounded-circle-30" onClick={handleClose}>
                  Close
                </Button>
              </div>
            </>
          </CardContent>
        </Card>
      </div>
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
}

export default NoteForm;
