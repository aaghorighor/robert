import React, { useState, useEffect } from 'react';
import { Table, Spacer } from 'suftnet-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery, useMutation } from '@apollo/client';
import { AiTwotoneEdit } from 'react-icons/ai';
import ConfirmationPopup from '../../../shared/popup';
import Notification from '../../../shared/notification';
import { FETCH_CONTACTS, REMOVE_CONTACT } from '../../../../queries/contact';
import {
  loadContacts,
  deleteContact,
  editContact,
} from '../../../../redux/slices/contact-slice';
import { renderStatusYesNo } from '../../../../utils/helper';

const ContactTableCard = () => {
  const dispatch = useDispatch();
  const { contacts } = useSelector((state) => state.contactSlice);
  const [fetchMyContacts] = useLazyQuery(FETCH_CONTACTS);
  const [deleteContactMutation, { error = {} }] = useMutation(REMOVE_CONTACT);
  const [errorType, setErrorType] = useState('error');
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);

  useEffect(() => {
    const fetchAndLoadContacts = async () => {
       const {
          data: { getAllContacts },
        } = await fetchMyContacts();
        dispatch(loadContacts(getAllContacts));
    };

    fetchAndLoadContacts();
  }, []);

  useEffect(() => {
    if (error && Object.keys(error).length) {
      setLoading(false);
      setServerErrorMessage(error.message);
      setNotificationStatus(true);
    }
  }, [error]);

  const onUpdate = (contact) => {
    contact = {
      ...contact,
      edit: true,
    };
    dispatch(editContact(contact));
  };

  const onConfirm = async (id) => {
    setLoading(true);

    const {
      data: { removeContact },
    } = await deleteContactMutation({
      variables: {
        contactId :id,
      },
    });

    if (removeContact) {
      setLoading(false);

      dispatch(deleteContact(id));

      setErrorType('success');
      setServerErrorMessage('Contact was deleted successfully.');
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
      title: 'Contact',
      dataIndex: 'fullNames',
      key: 'fullNames',
      sort: true,
      align: 'left',
    },  
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
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
            message="Are you sure you want to delete this Contact?"
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
        <Table data={contacts} columns={columns} pageSize={5} />
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

export default ContactTableCard;
