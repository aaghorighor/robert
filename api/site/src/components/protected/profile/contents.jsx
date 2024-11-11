import React, { useContext } from 'react';
import { Grid } from 'suftnet-ui-kit';
import { appContext } from '../../shared/appContext';
import ContactCard from './cards/contactCard';
import AddressCard from './cards/addressCard';
import ChangePasswordCard from './cards/changePasswordCard';
import AboutUsCard from './cards/aboutUsCard';
import HeaderPanel from '../../../components/shared/headerPanel';

const Contents = () => {
  const { isMobile } = useContext(appContext);

  return (
    <div className="">
      <HeaderPanel title={'Profile'} />
      <Grid
        row
        spacing={2}
        className={`${isMobile ? 'w-100' : ''
          } w-70 bg-transparent z-index-positive mt-xl-n14`}
      >
        <Grid col lg={4} xs={12}>
          <ContactCard />
          <div className="py-1"></div>

          <div className="py-1"></div>
          <ChangePasswordCard />
        </Grid>
        <Grid col lg={8} xs={12}>
          <div className="py-1">
            <AboutUsCard />
          </div>
          <div className="py-1">
            <AddressCard />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Contents;
