import React, { useContext, useState, useEffect } from 'react';
import { Table } from 'suftnet-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import { appContext } from '../../shared/appContext';
import Notification from '../../shared/notification';
import { FETCH_TOP10_CAMPAIGN } from '../../../queries/campaign';
import { loadCampaigns } from '../../../redux/slices/campaign-slice';
import { formatCurrency, renderStatusYesNo } from '../../../utils/helper';
import { timeStampConverter } from '../../../utils/helper';
import ProgressBar from '../../../components/shared/progressBar';

const TopCampaignsTableCard = () => {
  const { currentUser = {} } = useContext(appContext);
  const dispatch = useDispatch();
  const { campaigns = {} } = useSelector((state) => state.campaignSlice);
  const [fetchMyCampaigns, { error = {} }] = useLazyQuery(FETCH_TOP10_CAMPAIGN);
  const [errorType, setErrorType] = useState('error');
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);

  useEffect(() => {
    const fetchAndLoadCampaigns = async () => {
       const {
          data: { getTop10Campaigns },
        } = await fetchMyCampaigns();
        dispatch(loadCampaigns(getTop10Campaigns));
    };

    fetchAndLoadCampaigns();
  }, []);

  useEffect(() => {
    if (error && Object.keys(error).length) {
      setLoading(false);
      setServerErrorMessage(error.message);
      setNotificationStatus(true);
    }
  }, [error]);

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
      sort: false,
      align: 'left',
    },
    {
      title: 'Target amount',
      dataIndex: '',
      key: '',
      sort: false,
      align: 'left',
      render: (_, row) => <>{formatCurrency('£', row.target_amount)}</>,
    },
    {
      title: 'Current amount',
      dataIndex: '',
      key: '',
      sort: false,
      align: 'left',
      render: (_, row) => <>{formatCurrency('£', row.current_amount_funded)}</>,
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
      style:{ width : '20%' },
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
    
  ];

  return (
    <>
      <div className={`${loading ? 'overlay__block' : null}`}>
        <Table
          showFilter={false}
          showPagination={false}
          data={campaigns}
          columns={columns}
          pageSize={5}
          hideBorder={true}         
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

export default TopCampaignsTableCard;
