import React, { useContext, useState, useEffect } from 'react';
import { Table, Spacer } from 'suftnet-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery, useMutation } from '@apollo/client';
import { AiTwotoneEdit } from 'react-icons/ai';
import { appContext } from '../../shared/appContext';
import ConfirmationPopup from '../../shared/popup';
import Notification from '../../shared/notification';
import { GET_Testimonies, REMOVE_Testimony } from '../../../queries/testimony';
import {
  loadTestimonies,
  deleteMyTestimony,
  editTestimony,
} from '../../../redux/slices/testimony-slice';
import { renderStatusYesNo, timeStampConverter } from '../../../utils/helper';

const TestimonyTableCard = () => {
  const { currentUser = {} } = useContext(appContext);
  const dispatch = useDispatch();
  const { testimonies } = useSelector((state) => state.testimonySlice);
  const [fetchMyMembers] = useLazyQuery(GET_Testimonies);
  const [deleteTestimonyMutation, { error = {} }] = useMutation(REMOVE_Testimony);
  const [errorType, setErrorType] = useState('error');
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);

  useEffect(() => {
    const fetchAndLoadTestimonies = async () => {
      if (currentUser && Object.keys(currentUser).length) {
        const {
          data: { getTestimonies },
        } = await fetchMyMembers({
          variables: {
            suid: currentUser.suid,
          },
        });
        dispatch(loadTestimonies(getTestimonies));
      }
    };

    fetchAndLoadTestimonies();
  }, [currentUser]);

  useEffect(() => {
    if (error && Object.keys(error).length) {
      setLoading(false);
      setServerErrorMessage(error.message);
      setNotificationStatus(true);
    }
  }, [error]);

  const onUpdate = (testimony) => {
    testimony = {
      ...testimony,
      edit: true,
    };
    dispatch(editTestimony(testimony));
  };

  const onConfirm = async (id) => {
    setLoading(true);

    try {
      const {
        data: { removeTestimony },
      } = await deleteTestimonyMutation({
        variables: {
          id,
        },
      });
    
      if (removeTestimony) {
        dispatch(deleteMyTestimony(id));
        setErrorType('success');
        setServerErrorMessage('Testimony was deleted successfully.');
        setNotificationStatus(true);
      }
    } finally {
      setLoading(false);
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
      title: 'Date',
      dataIndex: '',
      key: '',
      sort: false,
      align: 'left',
      render: (_, row) => <>{timeStampConverter(row.createdAt, 'en-GB')}</>,
    },
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
            message="Are you sure you want to delete this Testimony?"
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
        <Table data={testimonies} columns={columns} pageSize={50} />
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

export default TestimonyTableCard;
