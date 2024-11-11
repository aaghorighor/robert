import React, { useContext, useState, useEffect } from 'react';
import { Table, Spacer } from 'suftnet-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery, useMutation } from '@apollo/client';
import { AiTwotoneEdit } from 'react-icons/ai';
import { appContext } from '../../shared/appContext';
import ConfirmationPopup from '../../shared/popup';
import Notification from '../../shared/notification';
import { FETCH_FELLOWSHIP, REMOVE_FELLOWSHIP } from '../../../queries/fellowship';
import {
  loadFellowships,
  deleteMyFellowship,
  editMyFellowship,
} from '../../../redux/slices/fellowship-slice';
import { renderStatusYesNo, timeStampConverter } from '../../../utils/helper';
import Icon from '../../shared/Icon';

const FellowshipTableCard = () => {
  const { currentUser = {} } = useContext(appContext);
  const dispatch = useDispatch();
  const { fellowships = {} } = useSelector((state) => state.fellowshipSlice);
  const [fetchMyFellowships] = useLazyQuery(FETCH_FELLOWSHIP);
  const [deleteFellowshipMutation, { error = {} }] = useMutation(REMOVE_FELLOWSHIP);
  const [errorType, setErrorType] = useState('error');
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);

  useEffect(() => {
    const fetchAndLoadFellowships = async () => {
      if (currentUser && Object.keys(currentUser).length) {
        const {
          data: { getAllFellowships },
        } = await fetchMyFellowships();
        dispatch(loadFellowships(getAllFellowships));
      }
    };

    fetchAndLoadFellowships();
  }, [currentUser]);

  useEffect(() => {
    if (error && Object.keys(error).length) {
      setLoading(false);
      setServerErrorMessage(error.message);
      setNotificationStatus(true);
    }
  }, [error]);

  const onUpdate = (fellowship) => {
    fellowship = {
      ...fellowship,
      edit: true,
    };
    dispatch(editMyFellowship(fellowship));
  };

  const onConfirm = async (fellowshipId) => {
    setLoading(true);

    const {
      data: { deleteFellowship },
    } = await deleteFellowshipMutation({
      variables: {
        fellowshipId,
      },
    });

    if (deleteFellowship) {
      setLoading(false);

      dispatch(deleteMyFellowship(fellowshipId));

      setErrorType('success');
      setServerErrorMessage('Fellowship was deleted successfully.');
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
      title: 'Date',
      dataIndex: '',
      key: '',
      sort: false,
      align: 'left',
      render: (_, row) => <>{timeStampConverter(row.createdAt, 'en-GB')}</>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
      title: 'Address',
      dataIndex: 'addressLine1',
      key: 'addressLine1',
      sort: true,
      align: 'left',
    },
    {
      title: 'Town',
      dataIndex: 'town',
      key: 'town',
      sort: true,
      align: 'left',
    },
    {
      title: 'County',
      dataIndex: 'county',
      key: 'county',
      sort: true,
      align: 'left',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
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
            message="Are you sure you want to delete this campaign?"
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
        <Table data={fellowships} columns={columns} pageSize={5} />
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

export default FellowshipTableCard;
