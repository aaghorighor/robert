import React, { useContext } from 'react';
import {
  Flex,
  Grid,
  BriefcaseTwo, Megaphone, Team
} from 'suftnet-ui-kit';
import { appContext } from '../../../shared/appContext';
import PriceCard from '../home/PriceCard';
import { PRICE_PLANS } from '../../../../assets/data/pricing';

const Contents = () => {
  const { isMobile } = useContext(appContext);
  return (
    <>
      <Flex
        justifyContent="center"
        direction="column"
        alignItems="center"
        className={`${isMobile ? 'p-5' : 'pb-7'} w-100'`}
      >
        <Grid
          row
          spacing={4}
          className={`${
            isMobile ? 'mt-2 w-100' : 'mt-1'
          } w-80 flex-row flex-wrap`}
        >
          <Grid col lg={4} md={12} xs={12}>
            <PriceCard plan={PRICE_PLANS[0]} icon={<Team />} />
          </Grid>
          <Grid col lg={4} xs={12}>
            <PriceCard plan={PRICE_PLANS[1]} icon={<BriefcaseTwo />} />
          </Grid>
          <Grid col lg={4} xs={12}>
            <PriceCard plan={PRICE_PLANS[2]} icon={<Megaphone />} />
          </Grid>
        </Grid>
      </Flex>
    </>
  );
};

export default Contents;
