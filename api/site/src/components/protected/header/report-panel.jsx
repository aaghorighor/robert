import React, { useState } from 'react';
import { Text, Card, CardContent, Table, Form, FormGroup, validate, Button, Spacer, Select } from 'suftnet-ui-kit';
import { DateTimePicker } from '../../shared/datepicker';
import { useLazyQuery } from '@apollo/client';
import { FaWindowClose, FaSearch, FaRegFileExcel } from 'react-icons/fa';
import { TbReport } from 'react-icons/tb';
import Scrollbars from "react-custom-scrollbars";
import { FETCH_DONATIONS_BY_DATE } from '../../../queries/donation';
import { FILTER_DONATION_RULES } from '../donation/rules';
import { DONATION_TYPE } from '../../../config/constants';
import Notification from '../../../components/shared/notification';
import { Download, formatCurrency, timeStampConverter } from '../../../utils/helper';
import { useAppContext } from '../../../components/shared/appContext';

const DonationReportPanel = ({ isPanelOpen, handlePanelToggle }) => {
  const { currentUser } = useAppContext()
  const [fetchDonationsByDate, { error = {}, loading }] = useLazyQuery(FETCH_DONATIONS_BY_DATE);
  const [fields, setFields] = useState(FILTER_DONATION_RULES.fields);
  const [errorMessages, setErrorMessages] = useState({});
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [errorType, setErrorType] = useState('error');
  const [donations, setDonations] = useState({
    donations: [],
    totalAmount: 0
  });

  const handleSearch = async () => {

    try {
      const { hasError, errors } = validate(fields, FILTER_DONATION_RULES.donation);
      if (hasError) {
        setErrorMessages(errors);
        return false;
      }

      const {
        data: { filterDonationsByDate },
      } = await fetchDonationsByDate({
        variables: {
          startDateStr: fields.startDateStr,
          endDateStr: fields.endDateStr,
          donation_type: fields.donation_type
        },
      });

      setDonations((pre) => {
        return {
          ...pre,
          donations: filterDonationsByDate.donations,
          totalAmount: filterDonationsByDate.totalAmount
        }
      });

    } catch (error) {
      setServerErrorMessage(error?.message);
      setNotificationStatus(true);
    }
  };

  const handleDownload = () => {
    try {
      if (donations?.donations) {
        Download(donations.donations, "donations")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleClear = () => {
    setFields((pre) => {
      return {
        ...pre,
        startDateStr: '',
        endDateStr: '',
        donation_type: '',
      }
    })
  }

  const handleDateChange = (name, value) => {
    setFields({ ...fields, [name]: value })
    setErrorMessages((pre) => {
      return {
        ...pre,
        [name]: ''
      }
    });
  };

  const onReset = () => {
    setNotificationStatus(false); 
    setServerErrorMessage('');
    if (errorType !== 'error') {     
      setErrorType('error');
    }
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
      align: 'right',
      render: (_, row) => <>{formatCurrency(currentUser.currency, row.amount)}</>,
    }

  ];

  return (
    <div className={`panel ${isPanelOpen ? 'open' : ''} ${loading ? 'overlay__block' : null}`}>
      <div className="__header flex-row justify-content-between align-items-center">
        <div className='flex-row justify-content-start align-items-center'>       
          <Text as="p" className="fs-20 fw-normal px-1">
            Donations Report
          </Text>
        </div>
        <FaWindowClose
          size={40}
          onClick={handlePanelToggle}
          className="pointer"
        />
      </div>
      <div className="w-100 mt-2 ">
        <Scrollbars
          style={{ height: '1000px', zIndex: 9999 }}
          createContext={true}
          noScrollX={true}
        >
          <Card className="bw-2 p-4 __body ">
            <CardContent className="py-2 flex-1 ">
              <div className="w-100 ">
                <Form horizontal>
                  <FormGroup>
                    <Select
                      id={'donation-type'}
                      label={'Donation Type'}
                      options={DONATION_TYPE}
                      value={fields.donation_type}
                      errorMessage={
                        errorMessages?.donation_type && errorMessages?.donation_type?.message
                      }
                      onChange={(e) =>
                        setFields({ ...fields, donation_type: e.target.value })
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <DateTimePicker
                      label={'Start Date'}
                      defaultDate={true}
                      value={
                        fields?.startDateStr
                      }
                      onDateChange={(e) => handleDateChange("startDateStr", e)}
                      errorMessage={
                        errorMessages?.startDateStr &&
                        errorMessages?.startDateStr?.message
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <DateTimePicker
                      label={'End Date'}
                      defaultDate={true}
                      value={
                        fields?.endDateStr
                      }
                      onDateChange={(e) => handleDateChange("endDateStr", e)}
                      errorMessage={
                        errorMessages?.endDateStr &&
                        errorMessages?.endDateStr?.message
                      }
                    />
                  </FormGroup>

                </Form>
                <div className="flex-row justify-content-start align-items-center mt-3">
                  <Button
                    className="rounded-circle-30 primary-solid-btn-0"
                    onClick={handleSearch}
                  >
                    <FaSearch size={15} />
                    <Spacer horizontal={2} />
                    Search
                  </Button>
                  <Spacer horizontal={5} />
                  <Button
                    className="rounded-circle-30"
                    onClick={handleClear}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bw-2 p-4 __body">
            <CardContent className=" flex-1 ">
              <Table
                showFilter={false}
                showPagination={false}
                serverSidePaging={false}
                data={donations.donations}
                columns={columns}
                pageSize={5}
                hideBorder={true}
              />
              <div className="flex-row justify-content-end align-items-center">
                <Text as="h3" className="px-1">
                  Total Amount :
                </Text>
                <Text as="p" className="fs-20 fw-normal px-1">
                  {formatCurrency(currentUser.currency, donations.totalAmount)}
                </Text>
              </div>
              <div className="flex-row justify-content-end align-items-center mt-3">
                <Button
                  className="rounded-circle-30 btn-color-12"
                  onClick={handleDownload}
                >
                  <FaRegFileExcel size={15} />
                  <Spacer horizontal={2} />
                  Download
                </Button>

              </div>
            </CardContent>
          </Card>
        </Scrollbars>
      </div>
      <Notification
        status={notificationStatus}
        type={errorType}
        message={serverErrorMessage}
        duration={errorType === 'error' ? 4000 : 1000}
        onReset={() => onReset()}
      />
      {loading && (
        <div className="overlay">
          <div className="overlay-content"></div>
        </div>
      )}
    </div>
  );
};

export default DonationReportPanel;
