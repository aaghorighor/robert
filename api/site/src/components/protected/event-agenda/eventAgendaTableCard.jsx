import React, { useState, useEffect } from 'react';
import { Table, Spacer } from 'suftnet-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery, useMutation } from '@apollo/client';
import { AiTwotoneEdit } from 'react-icons/ai';
import ConfirmationPopup from '../../shared/popup';
import Notification from '../../shared/notification';
import { FETCH_EVENT_AGENDAS, REMOVE_EVENT_AGENDA } from '../../../queries/event-agenda';
import {
  loadEventAgendas,
  deleteMyEventAgenda,
  editMyEventAgenda,
} from '../../../redux/slices/event-agenda-slice';
import { renderStatusYesNo } from '../../../utils/helper';
import { useLocation } from 'react-router-dom';
import Icon from '../../../components/shared/Icon';

const EventAgendaTableCard = () => {
  const dispatch = useDispatch();
  const location = useLocation()
  const { eventAgendas = {} } = useSelector((state) => state.eventAgendaSlice);
  const [fetchMyEventAgendas] = useLazyQuery(FETCH_EVENT_AGENDAS);
  const [deleteEventAgendaMutation, { error = {} }] = useMutation(REMOVE_EVENT_AGENDA);
  const [errorType, setErrorType] = useState('error');
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);

  useEffect(() => {
    const fetchAndLoadEventAgendas = async () => {
      if (location.state.eventId) {
        const {
          data: { getEventAgendasById },
        } = await fetchMyEventAgendas({
          variables: {
            eventId: location.state.eventId
          }
        });
        dispatch(loadEventAgendas(getEventAgendasById));
      }
    };

    fetchAndLoadEventAgendas();
  }, [location.state.eventId]);

  useEffect(() => {
    if (error && Object.keys(error).length) {
      setLoading(false);
      setServerErrorMessage(error.message);
      setNotificationStatus(true);
    }
  }, [error]);

  const onUpdate = (eventAgenda) => {
    eventAgenda = {
      ...eventAgenda,
      edit: true,
    };
    dispatch(editMyEventAgenda(eventAgenda));
  };

  const onConfirm = async (eventAgendaId) => {
    setLoading(true);

    const {
      data: { removeEventAgenda },
    } = await deleteEventAgendaMutation({
      variables: {
        agendaId: eventAgendaId,
        eventId: location.state.eventId
      },
    });

    if (removeEventAgenda) {
      setLoading(false);

      dispatch(deleteMyEventAgenda(eventAgendaId));

      setErrorType('success');
      setServerErrorMessage('Event Agenda was deleted successfully.');
      setNotificationStatus(true);
    }
  };

  const onCancel = () => { };

  const onReset = () => {
    setNotificationStatus(false);
    setLoading(false);
    setErrorType('error');
    setServerErrorMessage('');
  };

  const columns = [
     {
      title: 'Sn',
      dataIndex: 'sequency_no',
      key: 'sequency_no',
      sort: true,
      align: 'left'
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sort: false,
      align: 'left',
    },
    {
      title: 'Start Time',
      dataIndex: 'start_time',
      key: 'start_time',
      sort: false,
      align: 'left',
    },
    {
      title: 'End Time',
      dataIndex: 'end_time',
      key: 'end_time',
      sort: false,
      align: 'left',
    },
    {
      title: 'Facilitator',
      dataIndex: 'facilitator',
      key: 'facilitator',
      sort: true,
      align: 'left',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sort: false,
      render: (_, row) => (
        <button
          className={`badge badge-pill bc-2 ${renderStatusYesNo(row.status)}`}
        >
          {row.status ? 'YES' : 'NO'}
        </button>
      ),
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      render: (_, row) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Icon message={"Edit this row"}>
            <AiTwotoneEdit
              size={25}
              className="pointer"
              onClick={() => onUpdate(row)}
            />
          </Icon>
          <Spacer horizontal={10} />
          <ConfirmationPopup
            title={'Delete confirmation'}
            message="Are you sure you want to delete this agenda?"
            onConfirm={(id) => onConfirm(id)}
            onCancel={() => onCancel()}
            id={row._id}
            position={'top'}
            okText={'Ok'}
            cancelText={'No'}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className={`${loading ? 'overlay__block' : null}`}>
        <Table
          data={eventAgendas}
          columns={columns}
          serverSidePaging={false}
          pageSize={5}
        />
      </div>
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
    </>
  );
};

export default EventAgendaTableCard;
