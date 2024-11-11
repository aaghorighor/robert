import React, { useState } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { Text, Tab, TabPane } from 'suftnet-ui-kit';
import fallbackSrc from '../../assets/imgs/122454.png';
import DoctorServiceTable from '../protected/search_doctors/card/doctor-service-table';
import PatientReviews from '../protected/search_doctors/patient-reviews';

const Panel = ({ row, isPanelOpen, handlePanelToggle }) => {
  const [activeKey, setActiveKey] = useState('1');

  const handleTabClick = (key) => {
    setActiveKey(key);
  };

  return (
    <div className={`panel ${isPanelOpen ? 'open' : ''}`}>
      <div className="__header pointer">
        <FaWindowClose size={40} onClick={handlePanelToggle} />
      </div>
      <div className="__body flex-column justify-content-start align-items-center py-4">
        <div className="h-20 px-2">
          <img
            className="rs rounded-circle h-80 w-80"
            src={
              row?.user?.photo?.secure_url.length
                ? row?.user?.photo?.secure_url
                : fallbackSrc
            }
          />
        </div>
        <div className="flex-column justify-content-center align-items-center mt-1">
          <Text as="h3">{`${row?.user?.first_name} ${row?.user?.last_name}`}</Text>
          <Text
            as="p"
            className={'fs-18 mt-1'}
          >{`${row?.user?.short_description}`}</Text>
          <div className="flex-row justify-content-center align-items-center flex-wrap py-4">
            {(row?.specialty || []).map((specialty, index) => (
              <span key={index} className="badge badge-pill badge-info ">
                {specialty}
              </span>
            ))}
          </div>
          <span className="rating">
            {Number.isFinite(row.star) && row.star >= 1 && row.star <= 5 && (
              <>
                {[...Array(Math.floor(row.star))].map((_, i) => (
                  <i key={i} className="ti-star voted text_small1"></i>
                ))}
                {row.star % 1 !== 0 && <i className="ti-star text_small1"></i>}
                {[...Array(5 - Math.ceil(row.star))].map((_, i) => (
                  <i key={i} className="ti-star text_small1"></i>
                ))}
              </>
            )}
          </span>
          <small>({row.reviewsCount}) reviews</small>
        </div>
        <div className="mt-4 w-90">
          <Tab handleTabClick={handleTabClick} activeKey={activeKey}>
            <TabPane tab="Bio" eventKey="1">
              <div dangerouslySetInnerHTML={{ __html: row?.bio }}></div>
            </TabPane>
            <TabPane tab="Experience" eventKey="2">
              <div dangerouslySetInnerHTML={{ __html: row?.experience }}></div>
            </TabPane>
            <TabPane tab="Services" eventKey="3">
              <DoctorServiceTable row={row} doctorServices={row?.services} />
            </TabPane>
            <TabPane tab="Reviews" eventKey="4">
              <PatientReviews doctorId={row?.user?._id} />
            </TabPane>
          </Tab>
        </div>
      </div>
    </div>
  );
};

export default Panel;
