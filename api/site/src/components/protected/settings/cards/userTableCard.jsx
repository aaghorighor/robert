import React, { useContext, useState, useEffect } from 'react';
import { Table, Spacer } from 'suftnet-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery, useMutation } from '@apollo/client';
import { AiTwotoneEdit } from 'react-icons/ai';
import { appContext } from '../../../shared/appContext';
import ConfirmationPopup from '../../../shared/popup';
import Notification from '../../../shared/notification';
import { FETCH_USERS, REMOVE_USER } from '../../../../queries/user';
import {
  loadUsers,
  deleteUser,
  editUser,
} from '../../../../redux/slices/user-slice';
import { renderStatusYesNo } from '../../../../utils/helper';

const UserTableCard = () => {
  const { currentUser = {} } = useContext(appContext);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userSlice);
  const [fetchMyUsers] = useLazyQuery(FETCH_USERS);
  const [deleteUserMutation, { error = {} }] = useMutation(REMOVE_USER);
  const [errorType, setErrorType] = useState('error');
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);

  useEffect(() => {
    const fetchAndLoadUsers = async () => {
      if (currentUser && Object.keys(currentUser).length) {
        const {
          data: { getUsers },
        } = await fetchMyUsers();
        dispatch(loadUsers(getUsers));
      }
    };

    fetchAndLoadUsers();
  }, [currentUser]);

  useEffect(() => {
    if (error && Object.keys(error).length) {
      setLoading(false);
      setServerErrorMessage(error.message);
      setNotificationStatus(true);
    }
  }, [error]);

  const onUpdate = (user) => {
    user = {
      ...user,
      edit: true,
    };
    dispatch(editUser(user));
  };

  const onConfirm = async (id) => {
    setLoading(true);

    const {
      data: { removeUser },
    } = await deleteUserMutation({
      variables: {
        id,
      },
    });

    if (removeUser) {
      setLoading(false);

      dispatch(deleteUser(id));

      setErrorType('success');
      setServerErrorMessage('User was deleted successfully.');
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
      title: 'FirstName',
      dataIndex: 'first_name',
      key: 'first_name',
      sort: true,
      align: 'left',
    },
    {
      title: 'LastName',
      dataIndex: 'last_name',
      key: 'last_name',
      sort: true,
      align: 'left',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sort: true,
      align: 'left',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
      sort: true,
      align: 'left',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
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
            row.user_status,
          )}`}
        >
          {row.user_status ? 'YES' : 'NO'}
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
        <Table data={users} columns={columns} pageSize={5} />
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

export default UserTableCard;
