import React from 'react';
import { Text, Card, CardContent, Table,Button, Spacer } from 'suftnet-ui-kit';
import { FaWindowClose, FaRegFileExcel } from 'react-icons/fa';
import { TbReport } from 'react-icons/tb';
import Scrollbars from "react-custom-scrollbars";
import { Download } from '../../../utils/helper';
import { isArray } from '@apollo/client/utilities';

const EventRegisterReportPanel = ({ isPanelOpen, handlePanelToggle, attendances, title }) => {

  const handleDownload = () => {
    try {
      if (isArray(attendances)) {
        Download(attendances, "event_attendance")
      }
    } catch (error) {
      console.log(error)
    }
  }  

  const columns = [    
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
    }
  ];

  return (
    <div className={`panel ${isPanelOpen ? 'open' : ''} `}>
      <div className="__header flex-row justify-content-between align-items-center">
        <div className='flex-row justify-content-start align-items-center'>
          <TbReport size={20} />
          <Text as="p" className="fs-20 fw-normal px-1">
            {title}
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
          <Card className="bw-2 p-4 __body">
            <CardContent className=" flex-1 ">
              <Table
                showFilter={false}
                showPagination={false}
                serverSidePaging={false}
                data={attendances}
                columns={columns}
                pageSize={5}
                hideBorder={true}
              />              
              <div className="flex-row justify-content-end align-items-center mt-3">
                <Button
                  className="rounded-circle-30 btn-color-12"
                  onClick={handleDownload}
                >
                  <FaRegFileExcel size={15} />
                  <Spacer horizontal={2} />
                  Download ({attendances?.length || 0})
                </Button>

              </div>
            </CardContent>
          </Card>
        </Scrollbars>
      </div>     
    </div>
  );
};

export default EventRegisterReportPanel;
