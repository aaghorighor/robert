import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Table, Spacer, debounce } from 'suftnet-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery, useMutation } from '@apollo/client';
import { AiTwotoneEdit, AiOutlineFileDone } from 'react-icons/ai';
import { IoIosCloudDone } from 'react-icons/io';
import ConfirmationPopup from '../../shared/popup';
import Notification from '../../shared/notification';
import { FETCH_DONATIONS, REMOVE_DONATION } from '../../../queries/donation';
import {
  loadDonations,
  deleteMyDonation,
  editMyDonation,
} from '../../../redux/slices/donation-slice';
import { formatCurrency, renderStatusYesNo } from '../../../utils/helper';
import { timeStampConverter } from '../../../utils/helper';
import { useAppContext } from '../../../components/shared/appContext';
import Icon from '../../shared/Icon';

const DonationTableCard = () => {
  const dispatch = useDispatch();
  const { currentUser } = useAppContext()
  const { donations = [] } = useSelector((state) => state.donationSlice);
  const [fetchMyDonations] = useLazyQuery(FETCH_DONATIONS);
  const [deleteDonationMutation, { error = {} }] = useMutation(REMOVE_DONATION);
  const [errorType, setErrorType] = useState('error');
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState('');
  const [pageInfo, setPageInfo] = useState({});
  const pageSize = 10

  useEffect(() => {
    const fetchAndLoadDonations = async () => {
      const {
        data: { getDonations },
      } = await fetchMyDonations({
        variables: {
          pageSize: pageSize,
          pageNumber: currentPage,
          filterTerm: filterValue
        },
      });

      dispatch(loadDonations(getDonations.donations));
      setPageInfo(getDonations.pageInfo);
    };

    fetchAndLoadDonations();
  }, [currentPage, filterValue]);  

  useEffect(() => {
    if (error && Object.keys(error).length) {
      setLoading(false);
      setServerErrorMessage(error.message);
      setNotificationStatus(true);
    }
  }, [error]);

  const onUpdate = (donation) => {
    donation = {
      ...donation,
      edit: true,
    };
    dispatch(editMyDonation(donation));
  };

  const onConfirm = async (donationId) => {
    setLoading(true);

    const {
      data: { deleteDonation },
    } = await deleteDonationMutation({
      variables: {
        donationId,
      },
    });

    if (deleteDonation) {
      setLoading(false);

      dispatch(deleteMyDonation(donationId));

      setErrorType('success');
      setServerErrorMessage('Donation was deleted successfully.');
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
      render: (_, row) => <>{timeStampConverter(row.date_donated, 'en-GB')}</>,
    },
    {
      title: 'FirstName',
      dataIndex: 'first_name',
      key: 'first_name',
      sort: false,
      align: 'left',
    },
    {
      title: 'LastName',
      dataIndex: 'last_name',
      key: 'last_name',
      sort: false,
      align: 'left',
    },
    {
      title: 'Donation',
      dataIndex: 'donation_type',
      key: 'donation_type',
      sort: false,
      align: 'left',
    },
    {
      title: 'Amount',
      dataIndex: '',
      key: '',
      sort: false,
      align: 'left',
      render: (_, row) => <>{formatCurrency(currentUser.currency, row.amount)}</>,
    },
    {
      title: 'Online',
      dataIndex: '',
      key: '',
      sort: false,
      render: (_, row) => (
        <button
          className={`badge badge-pill bc-2 ${renderStatusYesNo(row.online)}`}
        >
          {row.online ? 'YES' : 'NO'}
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
          {
            !row.online ? (
              <>
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
                  message="Are you sure you want to delete this donation?"
                  onConfirm={(id) => onConfirm(id)}
                  onCancel={() => onCancel()}
                  id={row._id}
                  position={'top'}
                  okText={'Ok'}
                  cancelText={'No'}
                />
              </>
            ) : <>
            <Icon message={"Donation done"}>
              <IoIosCloudDone
                size={25}
                className="pointer"
                onClick={() => onUpdate(row)}
              />
                           </Icon>
            </>
          }

        </div>
      ),
    },
  ];

  return (
    <>
      <div className={`${loading ? 'overlay__block' : null}`}>
        <Table
          data={donations}
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
    </>
  );
};

export default DonationTableCard;
