import React, { useContext } from 'react';
import { Grid } from 'suftnet-ui-kit';
import { appContext } from '../../shared/appContext';
import TestimonyTableCard from './testimonyTableCard';
import TestimonyFormCard from './testimonyFormCard';
import HeaderPanel from '../../shared/headerPanel';

const Contents = () => {
  const { isMobile } = useContext(appContext);
  
  return (
    <div className="">
     <HeaderPanel title={'Testimonies'} />
      <Grid
        row
        spacing={1}
        className={`${
          isMobile ? 'w-100' : ''
        } w-90 bg-transparent z-index-positive mt-xl-n16`}
      >
        <Grid col lg={9} xs={12}>
          <TestimonyTableCard />
        </Grid>
        <Grid col lg={3} xs={12}>
          <TestimonyFormCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default Contents;