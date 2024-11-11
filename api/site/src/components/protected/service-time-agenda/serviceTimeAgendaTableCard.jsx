import React, { useState, useEffect } from 'react';
import { Table, Spacer } from 'suftnet-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import { AiTwotoneEdit } from 'react-icons/ai';
import ConfirmationPopup from '../../shared/popup';
import Notification from '../../shared/notification';
import { FETCH_SERVICE_TIME_AGENDAS, REMOVE_SERVICE_TIME_AGENDA } from '../../../queries/service-times-agenda';
import {
  loadServiceTimeAgendas,
  deleteMyServiceTimeAgenda,
  editMyServiceTimeAgenda,
} from '../../../redux/slices/service-time-agenda-slice';
import { renderStatusYesNo } from '../../../utils/helper';
import Icon from '../../../components/shared/Icon';

const ServiceTimeAgendaTableCard = () => {
  const location = useLocation()
  const dispatch = useDispatch();
  const { serviceTimeAgendas = [] } = useSelector((state) => state.serviceTimeAgendaSlice);
  const [fetchMyServiceTimeAgendas] = useLazyQuery(FETCH_SERVICE_TIME_AGENDAS);
  const [deleteServiceTimeMutation, { error = {} }] =
    useMutation(REMOVE_SERVICE_TIME_AGENDA);
  const [errorType, setErrorType] = useState('error');
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);

  useEffect(() => {
    const fetchAndLoadServiceTimeAgendas = async () => {
      if (location.state.serviceTimeId) {
        const {
          data: { getServiceTimeAgendasById },
        } = await fetchMyServiceTimeAgendas({
          variables : {
            serviceTimeId : location.state.serviceTimeId
          }
        });
        dispatch(loadServiceTimeAgendas(getServiceTimeAgendasById));
      }
    };

    fetchAndLoadServiceTimeAgendas();
  }, [location.state.serviceTimeId]);

  useEffect(() => {
    if (error && Object.keys(error).length) {
      setLoading(false);
      setServerErrorMessage(error.message);
      setNotificationStatus(true);
    }
  }, [error]);

  const onUpdate = (serviceTimeAgenda) => {
    serviceTimeAgenda = {
      ...serviceTimeAgenda,
      edit: true,
    };
    dispatch(editMyServiceTimeAgenda(serviceTimeAgenda));
  };

  const onConfirm = async (serviceTimeAgendaId) => {
    setLoading(true);

    const {
      data: { removeServiceTimeAgenda },
    } = await deleteServiceTimeMutation({
      variables: {
        agendaId : serviceTimeAgendaId,
        serviceTimeId : location.state.serviceTimeId
      },
    });

    if (removeServiceTimeAgenda) {
      setLoading(false);

      dispatch(deleteMyServiceTimeAgenda(serviceTimeAgendaId));

      setErrorType('success');
      setServerErrorMessage('ServiceTime Agenda was deleted successfully.');
      setNotificationStatus(true);
    }
  };  

  const onCancel = () => {};

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
      sort: true,
      align: 'left',
    },
    {
      title: 'Start Time',
      dataIndex: 'start_time',
      key: 'start_time',
      sort: true,
      align: 'left',
    },
    {
      title: 'End Time',
      dataIndex: 'end_time',
      key: 'end_time',
      sort: true,
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
      sort: true,
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
            message="Are you sure you want to delete this Agenda?"
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
        <Table data={serviceTimeAgendas} columns={columns} pageSize={5} />
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

export default ServiceTimeAgendaTableCard;
