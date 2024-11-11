import React, { useState, useEffect } from 'react';
import { Table, Spacer } from 'suftnet-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery, useMutation } from '@apollo/client';
import { AiTwotoneEdit } from 'react-icons/ai';
import ConfirmationPopup from '../../../shared/popup';
import Notification from '../../../shared/notification';
import { FETCH_PUSH_NOTIFICATION, REMOVE_PUSH_NOTIFICATION } from '../../../../queries/push-notification';
import {
  loadPushNotifications,
  deletePushNotification,
  editPushNotification,
} from '../../../../redux/slices/push-notification-slice';
import { renderStatusYesNo } from '../../../../utils/helper';

const PushNotificationTableCard = () => {
  const dispatch = useDispatch();
  const { pushNotifications } = useSelector((state) => state.notificationSlice);
  const [fetchMyPushNotifications] = useLazyQuery(FETCH_PUSH_NOTIFICATION);
  const [deletePushNotificationMutation, { error = {} }] = useMutation(REMOVE_PUSH_NOTIFICATION);
  const [errorType, setErrorType] = useState('error');
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);

  useEffect(() => {
    const fetchAndLoadPushNotifications = async () => {
       const {
          data: { getAllPushNotifications },
        } = await fetchMyPushNotifications();
        dispatch(loadPushNotifications(getAllPushNotifications));
    };

    fetchAndLoadPushNotifications();
  }, []);

  useEffect(() => {
    if (error && Object.keys(error).length) {
      setLoading(false);
      setServerErrorMessage(error.message);
      setNotificationStatus(true);
    }
  }, [error]);

  const onUpdate = (pushNotification) => {
    pushNotification = {
      ...pushNotification,
      edit: true,
    };
    dispatch(editPushNotification(pushNotification));
  };

  const onConfirm = async (id) => {
    setLoading(true);

    const {
      data: { removePushNotification },
    } = await deletePushNotificationMutation({
      variables: {
        notificationId :id,
      },
    });

    if (removePushNotification) {
      setLoading(false);

      dispatch(deletePushNotification(id));

      setErrorType('success');
      setServerErrorMessage('Push Notification was deleted successfully.');
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sort: true,
      align: 'left',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
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
          className={`badge badge-pill bc-2 ${renderStatusYesNo(
            row.status,
          )}`}
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
          <AiTwotoneEdit
            size={25}
            className="pointer"
            onClick={() => onUpdate(row)}
          />
          <Spacer horizontal={10} />
          <ConfirmationPopup
            title={'Delete confirmation'}
            message="Are you sure you want to delete this Notification?"
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
        <Table data={pushNotifications} columns={columns} pageSize={5} />
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

export default PushNotificationTableCard;
