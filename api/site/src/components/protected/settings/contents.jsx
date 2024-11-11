import React, { useContext, useState } from 'react';
import { Grid, Tab, TabPane } from 'suftnet-ui-kit';
import { appContext } from '../../shared/appContext';
import SubscriptionCard from './cards/subscriptionCard';
import GeneralCard from './cards/generalCard';
import UserFormCard from './cards/userFormCard';
import UserTableCard from './cards/userTableCard';
import SliderFormCard from './cards/sliderFormCard';
import SliderTableCard from './cards/sliderTableCard';
import ContactFormCard from './cards/contactFormCard';
import ContactTableCard from './cards/contactTableCard';
import HeaderPanel from '../../../components/shared/headerPanel';
import PushNotificationFormCard from './cards/pushNotificationFormCard';
import PushNotificationTableCard from './cards/pushNotificationTableCard';
import BankCard from './cards/bankCard';
import Features from './cards/features';


const Contents = () => {
  const { isMobile } = useContext(appContext);
  const [activeKey, setActiveKey] = useState('1');

  const handleTabClick = (key) => {
    setActiveKey(key);
  };

  return (
    <div className="">
      <HeaderPanel title={'Settings'} />
      <Grid
        row
        spacing={1}
        className={`${isMobile ? 'w-100' : ''
          } w-90 bg-transparent z-index-positive mt-xl-n16`}
      >
        <Grid col lg={12} xs={12}>
          <Tab handleTabClick={handleTabClick} activeKey={activeKey}>
            <TabPane tab="Users" eventKey="1">
              <Grid row spacing={4} className="px-4 py-4">
                <Grid col lg={8} xs={12}>
                  <UserTableCard />
                </Grid>
                <Grid col lg={4} xs={12}>
                  <UserFormCard />
                </Grid>
              </Grid>
            </TabPane>
            <TabPane tab="General" eventKey="2">
              <Grid row spacing={2} className="px-4 py-2">
                <Grid col lg={3} xs={12}>
                  <SubscriptionCard />
                </Grid>
                <Grid col lg={3} xs={12}>
                  <GeneralCard />
                </Grid>
                <Grid col lg={3} xs={12}>
                  <BankCard />
                </Grid>
                <Grid col lg={3} xs={12}>
                  <Features />
                </Grid>
              </Grid>
            </TabPane>            
            <TabPane tab="Slider" eventKey="4">
              <Grid row spacing={4} className="px-4 py-4">
                <Grid col lg={8} xs={12}>
                  <SliderTableCard key={activeKey} />
                </Grid>
                <Grid col lg={4} xs={12}>
                  <SliderFormCard />
                </Grid>
              </Grid>
            </TabPane>
            <TabPane tab="Contact" eventKey="5">
              <Grid row spacing={4} className="px-4 py-4">
                <Grid col lg={8} xs={12}>
                  <ContactTableCard key={activeKey} />
                </Grid>
                <Grid col lg={4} xs={12}>
                  <ContactFormCard />
                </Grid>
              </Grid>
            </TabPane>
            <TabPane tab="Notification" eventKey="6">
              <Grid row spacing={4} className="px-4 py-4">
                <Grid col lg={8} xs={12}>
                  <PushNotificationTableCard key={activeKey} />
                </Grid>
                <Grid col lg={4} xs={12}>
                  <PushNotificationFormCard />
                </Grid>
              </Grid>
            </TabPane>
          </Tab>
        </Grid>
      </Grid>
    </div>
  );
};

export default Contents;
