import React, { useContext } from 'react';
import { Flex, Text, Grid, BriefcaseTwo, Megaphone, Server, Team } from 'suftnet-ui-kit';
import PriceCard from './PriceCard';
import { PRICE_PLANS } from '../../../../assets/data/pricing';
import useMobile from '../../../../hooks/useMobile';

const Pricing = () => {
  const { isMobile } = useMobile();

  return (
    <>
      <Flex
        justifyContent="center"
        direction="column"
        alignItems="center"
        className={`${isMobile ? 'p-5' : 'p-7'} w-100 `}
      >
        <Grid
          row
          spacing={4}
          className={`${isMobile ? 'mt-2 w-100' : 'mt-1'} w-100 flex-row`}
        >
          <Grid col lg={12} xs={12}>
            <div className="flex-column justify-content-center align-items-center">
              <Text
                as="h6"
                className={`text-dark fw-normal mb-3 ${
                  isMobile ? 'text-center' : ''
                }`}
              >
                Our Pricing
              </Text>
              <Text
                as="h1"
                className={`mt-3 text-center w-50 ${isMobile ? 'w-100' : ''}`}
              >
                We offer great{' '}
                <span>prices and quality service for your Church</span>
              </Text>
            </div>
          </Grid>
        </Grid>
        <Grid
          row
          spacing={4}
          className={`${
            isMobile ? 'mt-2 w-100' : 'mt-1'
          } w-80 mt-5 flex-row flex-wrap`}
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

export default Pricing;
