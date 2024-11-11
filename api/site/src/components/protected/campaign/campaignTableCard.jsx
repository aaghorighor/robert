import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Table, Spacer, debounce } from 'suftnet-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery, useMutation } from '@apollo/client';
import { AiTwotoneEdit } from 'react-icons/ai';
import { appContext } from '../../shared/appContext';
import ConfirmationPopup from '../../shared/popup';
import Notification from '../../shared/notification';
import { FETCH_CAMPAIGN, REMOVE_CAMPAIGN } from '../../../queries/campaign';
import {
  loadCampaigns,
  deleteMyCampaign,
  editMyCampaign,
} from '../../../redux/slices/campaign-slice';
import { formatCurrency, renderStatusYesNo } from '../../../utils/helper';
import { timeStampConverter } from '../../../utils/helper';
import ProgressBar from '../../../components/shared/progressBar';
import Icon from '../../shared/Icon';

const CampaignTableCard = () => {
  const { currentUser = {} } = useContext(appContext);
  const dispatch = useDispatch();
  const { campaigns = {} } = useSelector((state) => state.campaignSlice);
  const [fetchMyCampaigns] = useLazyQuery(FETCH_CAMPAIGN);
  const [deleteCampaignMutation, { error = {} }] = useMutation(REMOVE_CAMPAIGN);
  const [errorType, setErrorType] = useState('error');
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState('');
  const [pageInfo, setPageInfo] = useState({});
  const pageSize = 10

  useEffect(() => {
    const fetchAndLoadCampaigns = async () => {
      const {
        data: { getCampaigns },
      } = await fetchMyCampaigns({
        variables: {
          pageSize: pageSize,
          pageNumber: currentPage,
          filterTerm: filterValue
        },
      });

      dispatch(loadCampaigns(getCampaigns.campaigns));
      setPageInfo(getCampaigns.pageInfo);
    };

    fetchAndLoadCampaigns();
  }, [currentPage, filterValue]);

  useEffect(() => {
    if (error && Object.keys(error).length) {
      setLoading(false);
      setServerErrorMessage(error.message);
      setNotificationStatus(true);
    }
  }, [error]);

  const onUpdate = (campaign) => {
    campaign = {
      ...campaign,
      edit: true,
    };
    dispatch(editMyCampaign(campaign));
  };

  const onConfirm = async (campaignId) => {
    setLoading(true);

    const {
      data: { deleteCampaign },
    } = await deleteCampaignMutation({
      variables: {
        campaignId,
      },
    });

    if (deleteCampaign) {
      setLoading(false);

      dispatch(deleteMyCampaign(campaignId));

      setErrorType('success');
      setServerErrorMessage('Campaign was deleted successfully.');
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

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, [])

  const handleFilterChange = useCallback(async (value) => {
    setFilterValue(value);
    setCurrentPage(1);
  }, [])

  const debouncedFilterChange = debounce(handleFilterChange, 100);

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
      title: 'Target amount',
      dataIndex: '',
      key: '',
      sort: false,
      align: 'left',
      render: (_, row) => <>{formatCurrency(currentUser.currency, row.target_amount)}</>,
    },
    {
      title: 'Current amount',
      dataIndex: '',
      key: '',
      sort: false,
      align: 'left',
      render: (_, row) => <>{formatCurrency(currentUser.currency, row.current_amount_funded)}</>,
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
      title: '',
      dataIndex: '',
      key: '',
      sort: false,
      style: { width: '20%' },
      render: (_, row) => (
        <ProgressBar
          currentAmount={row.current_amount_funded}
          targetAmount={row.target_amount}
        />
      ),
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
        <Table
          data={campaigns}
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

export default CampaignTableCard;
