import React, { useContext } from 'react';
import { Grid } from 'suftnet-ui-kit';
import { appContext } from '../../shared/appContext';
import ServiceTimeAgendaFormCard from './serviceTimeAgendaFormCard';
import ServiceTimeAgendaTableCard from './serviceTimeAgendaTableCard';
import HeaderPanel from '../../shared/headerPanel';

const Contents = () => {
  const { isMobile } = useContext(appContext);
 
  return (
    <div className="">
     <HeaderPanel title={'ServiceTime Agendas'} />
      <Grid
        row
        spacing={1}
        className={`${
          isMobile ? 'w-100' : ''
        } w-90 bg-transparent z-index-positive mt-xl-n16`}
      >
        <Grid col lg={9} xs={12}>
          <ServiceTimeAgendaTableCard />
        </Grid>
        <Grid col lg={3} xs={12}>
          <ServiceTimeAgendaFormCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default Contents;
