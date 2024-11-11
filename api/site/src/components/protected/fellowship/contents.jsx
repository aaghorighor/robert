import React, { useContext } from 'react';
import { Grid } from 'suftnet-ui-kit';
import { appContext } from '../../shared/appContext';
import FellowshipTableCard from './fellowshipTableCard';
import FellowshipFormCard from './fellowshipFormCard';
import HeaderPanel from '../../../components/shared/headerPanel';

const Contents = () => {
  const { isMobile } = useContext(appContext);
 
  return (
    <div className="">
      <HeaderPanel title={'Fellowships'} />
      <Grid
        row
        spacing={1}
        className={`${
          isMobile ? 'w-100' : ''
        } w-90 bg-transparent z-index-positive mt-xl-n16`}
      >
        <Grid col lg={9} xs={12}>
          <FellowshipTableCard />
        </Grid>
        <Grid col lg={3} xs={12}>
          <FellowshipFormCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default Contents;
