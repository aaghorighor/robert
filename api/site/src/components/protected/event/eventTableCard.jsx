import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Table, Spacer, debounce } from 'suftnet-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery, useMutation } from '@apollo/client';
import { createPortal } from 'react-dom';
import { AiTwotoneEdit } from 'react-icons/ai';
import { FaUserFriends } from 'react-icons/fa';
import { TfiAgenda } from 'react-icons/tfi';
import { appContext } from '../../shared/appContext';
import ConfirmationPopup from '../../shared/popup';
import Notification from '../../shared/notification';
import { FETCH_EVENTs, REMOVE_EVENT } from '../../../queries/event';
import {
  loadEvents,
  deleteMyEvent,
  editMyEvent,
} from '../../../redux/slices/event-slice';
import { renderStatusYesNo } from '../../../utils/helper';
import { timeStampConverter } from '../../../utils/helper';
import { useNavigate } from 'react-router-dom';
import Icon from '../../shared/Icon';
import EventRegisterReportPanel from '../event/event-register-report-panel'

const EventTableCard = () => {
  const { currentUser = {} } = useContext(appContext);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { events = {} } = useSelector((state) => state.eventSlice);
  const [fetchMyEvents] = useLazyQuery(FETCH_EVENTs);
  const [deleteEventMutation, { error = {} }] = useMutation(REMOVE_EVENT);
  const [errorType, setErrorType] = useState('error');
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState('');
  const [pageInfo, setPageInfo] = useState({});
  const [registerPanelOpen, setRegisterPanelOpen] = useState({
    isPanel: false,
    title: '',
    attendances: []
  });
  const pageSize = 10

  useEffect(() => {
    const fetchAndLoadEvents = async () => {
      const {
        data: { getEvents },
      } = await fetchMyEvents({
        variables: {
          pageSize: pageSize,
          pageNumber: currentPage,
          filterTerm: filterValue
        },
      });

      dispatch(loadEvents(getEvents.events));
      setPageInfo(getEvents.pageInfo);
    };

    fetchAndLoadEvents();
  }, [currentPage, filterValue]);

  useEffect(() => {
    if (error && Object.keys(error).length) {
      setLoading(false);
      setServerErrorMessage(error.message);
      setNotificationStatus(true);
    }
  }, [error]);

  const onUpdate = (event) => {
    event = {
      ...event,
      edit: true,
    };
    dispatch(editMyEvent(event));
  };

  const onConfirm = async (eventId) => {
    setLoading(true);

    const {
      data: { deleteEvent },
    } = await deleteEventMutation({
      variables: {
        eventId,
      },
    });

    if (deleteEvent) {
      setLoading(false);
      dispatch(deleteMyEvent(eventId));

      setErrorType('success');
      setServerErrorMessage('Event was deleted successfully.');
      setNotificationStatus(true);
    }
  };

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, [])

  const handleFilterChange = useCallback(async (value) => {
    setFilterValue(value);
    setCurrentPage(1);
  }, [])

  const debouncedFilterChange = debounce(handleFilterChange, 100);
  const onEventAgenda = (row) => {
    navigate("/v1/event-agenda", {
      state: {
        eventId: row._id
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

  const handlePanelToggle = () => {
    setRegisterPanelOpen((pre) => {
      return {   
        ...pre,    
        isPanel: false
      }
    })
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sort: false,
      align: 'left',
    },
    {
      title: 'Start Date',
      dataIndex: '',
      key: '',
      sort: false,
      align: 'left',
      render: (_, row) => <>{timeStampConverter(row.start_date, 'en-GB')}</>,
    },
    {
      title: 'End Date',
      dataIndex: '',
      key: '',
      sort: false,
      align: 'left',
      render: (_, row) => <>{timeStampConverter(row.end_date, 'en-GB')}</>,
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
      title: 'Register',
      dataIndex: 'can_register',
      key: 'can_register',
      sort: false,
      align: 'center',
      render: (_, row) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {
            row.can_register && (
              <>
                <Icon message={"View Register"}>
                  <FaUserFriends
                    size={25}
                    className="pointer"
                    onClick={() => setRegisterPanelOpen((pre) => {
                      return {
                        ...pre,
                        title: row.title,
                        attendances: row.register,
                        isPanel: true
                      }
                    })}
                  />
                </Icon>
              </>
            )
          }
        </div>
      ),
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
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Icon message={"Event Agenda"}>
            <TfiAgenda
              size={20}
              className="pointer"
              onClick={() => onEventAgenda(row)}
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
        <Table
          data={events}
          columns={columns}
          pageSize={pageSize}
          pageCount={pageInfo.totalPages}
          serverSidePaging={true}
          handleFilterChange={debouncedFilterChange}
          handlePageChange={(pageNumber) => handlePageChange(pageNumber)}
          currentPage={currentPage}
          filterValue={filterValue}
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
      {registerPanelOpen.isPanel && createPortal(
        <EventRegisterReportPanel
          isPanelOpen={registerPanelOpen.isPanel}
          handlePanelToggle={handlePanelToggle}
          attendances={registerPanelOpen.attendances}
          title={registerPanelOpen.title}
        />,
        document.getElementById('dialogue-portal')
      )}
    </>
  );
};

export default EventTableCard;
