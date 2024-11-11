import React, { useContext, useState } from 'react';
import { Grid, Card, CardHeader, Spacer } from 'suftnet-ui-kit';
import { appContext } from '../../shared/appContext';
import CampaignCard from './cards/campaignCard';
import FellowshipCard from './cards/fellowshipCard';
import EventCard from './cards/eventCard';
import HeaderPanel from '../../../components/shared/headerPanel';
import DonationAreaChart from './cards/donationAreaChart';
import DonationPieChart from './cards/donationPieChart';
import TopCampaignsTableCard from './topCampaignsTableCard';
import AdminOnboardingModal from '../../../components/shared/AdminOnboardingModal';
import MemberCard from './cards/memberCard';

const Contents = () => {
  const { isMobile, currentUser } = useContext(appContext);
  const [modalIsOpen, setModalIsOpen] = useState(!currentUser?.onboardingComplete);
   
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="">
      <HeaderPanel title={'Dashboard'} />
      <Grid
        row
        spacing={2}
        className={`${isMobile ? 'w-100' : ''
          } w-80 bg-transparent z-index-positive mt-xl-n16`}
      >
        <Grid col lg={3} xs={12}>
          <EventCard />
        </Grid>
        <Grid col lg={3} xs={12}>
          <CampaignCard />
        </Grid>
        <Grid col lg={3} xs={12}>
          <FellowshipCard />
        </Grid>
        <Grid col lg={3} xs={12}>
          <MemberCard />
        </Grid>
      </Grid>
      <Grid
        row
        spacing={2}
        className={`${isMobile ? 'w-100' : ''} w-80 bg-transparent mt-2`}
      >
        <Grid col lg={8} xs={12}>
          <Card className="bw-2 p-4">
            <DonationAreaChart />
          </Card>
        </Grid>
        <Grid col lg={4} xs={12}>
          <Card className="bw-2 p-4">
            <DonationPieChart />
          </Card>
        </Grid>
      </Grid>
      <Grid
        row
        spacing={2}
        className={`${isMobile ? 'w-100' : ''} w-80 bg-transparent mt-2`}
      >
        <Grid col lg={12} xs={12}>
          <Card className="bw-2 p-4">
            <CardHeader className="mb-10"> Top 5 Campaigns </CardHeader>
            <Spacer vertical={10} />
            <TopCampaignsTableCard />
          </Card>
        </Grid>
      </Grid>

      {/* <AdminOnboardingModal isOpen={modalIsOpen} onClose={closeModal}>       
      </AdminOnboardingModal> */}
    </div>
  );
};

export default Contents;
