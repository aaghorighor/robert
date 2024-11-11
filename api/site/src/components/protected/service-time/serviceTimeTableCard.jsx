import React, { useContext, useState, useEffect } from 'react';
import { Table, Spacer } from 'suftnet-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery, useMutation } from '@apollo/client';
import { AiTwotoneEdit } from 'react-icons/ai';
import { TfiAgenda } from 'react-icons/tfi';
import { appContext } from '../../shared/appContext';
import ConfirmationPopup from '../../shared/popup';
import Notification from '../../shared/notification';
import { FETCH_SERVICE_TIME, REMOVE_SERVICE_TIME } from '../../../queries/service-times';
import {
  loadServiceTimes,
  deleteMyServiceTime,
  editMyServiceTime,
} from '../../../redux/slices/service-time-slice';
import { renderStatusYesNo, timeStampConverter } from '../../../utils/helper';
import { useNavigate } from 'react-router-dom';
import Icon from '../../shared/Icon';

const ServiceTimeTableCard = () => {
  const { currentUser = {} } = useContext(appContext);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { serviceTimes = [] } = useSelector((state) => state.serviceTimeSlice);
  const [fetchMyServiceTimes] = useLazyQuery(FETCH_SERVICE_TIME);
  const [deleteServiceTimeMutation, { error = {} }] =
    useMutation(REMOVE_SERVICE_TIME);
  const [errorType, setErrorType] = useState('error');
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);

  useEffect(() => {
    const fetchAndLoadServiceTimes = async () => {
      if (currentUser && Object.keys(currentUser).length) {
        const {
          data: { getAllServiceTimes },
        } = await fetchMyServiceTimes();
        dispatch(loadServiceTimes(getAllServiceTimes));
      }
    };

    fetchAndLoadServiceTimes();
  }, [currentUser]);

  useEffect(() => {
    if (error && Object.keys(error).length) {
      setLoading(false);
      setServerErrorMessage(error.message);
      setNotificationStatus(true);
    }
  }, [error]);

  const onUpdate = (serviceTime) => {
    serviceTime = {
      ...serviceTime,
      edit: true,
    };
    dispatch(editMyServiceTime(serviceTime));
  };

  const onConfirm = async (serviceTimeId) => {
    setLoading(true);

    const {
      data: { deleteServiceTime },
    } = await deleteServiceTimeMutation({
      variables: {
        serviceTimeId,
      },
    });

    if (deleteServiceTime) {
      setLoading(false);

      dispatch(deleteMyServiceTime(serviceTimeId));

      setErrorType('success');
      setServerErrorMessage('Service Time was deleted successfully.');
      setNotificationStatus(true);
    }
  };

  const onServiceTimeAgenda = (row) => {
    navigate("/v1/service-time-agenda", {
      state: {
        serviceTimeId: row._id
      }
    })
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
      title: 'Date',
      dataIndex: '',
      key: '',
      sort: false,
      align: 'left',
      render: (_, row) => <>{timeStampConverter(row.createdAt, 'en-GB')}</>,
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
      title: 'Remote',
      dataIndex: 'Remote',
      key: 'remote',
      sort: true,
      render: (_, row) => (
        <button
          className={`badge badge-pill bc-2 ${renderStatusYesNo(row.remote)}`}
        >
          {row.remote ? 'YES' : 'NO'}
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
        ><Icon message={"Service Agenda"}>
            <TfiAgenda
              size={20}
              className="pointer"
              onClick={() => onServiceTimeAgenda(row)}
            />
          </Icon>
          <Spacer horizontal={10} />
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
            message="Are you sure you want to delete this item?"
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
        <Table data={serviceTimes} columns={columns} pageSize={5} />
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

export default ServiceTimeTableCard;
