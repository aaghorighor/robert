import React, { useContext, useEffect, useState } from 'react';
import { Flex, Text, Grid, Card, Box } from 'suftnet-ui-kit';
import { useLocation } from 'react-router-dom';
import { BiCheckCircle } from 'react-icons/bi';
import { fetchPrice } from '../../../../assets/data/pricing';
import { getVAT } from '../../../../utils/helper';
import CheckOut from './checkout';
import { appContext } from '../../../shared/appContext';

const ContactForm = () => {
  const location = useLocation();
  const [plan, setPlan] = useState({});
  const { isMobile } = useContext(appContext);

  useEffect(() => {
    const result = fetchPrice(location.state.priceId);   
    setPlan(result);
  }, [location.state.priceId]);

  return (
    <>
      <Flex
        justifyContent="center"
        direction="column"
        alignItems="center"
        className="pb-5 bg-light"
      >
        <Grid
          row
          spacing={4}
          className={`${isMobile ? 'mt-2 w-100' : 'mt-1'} w-60 flex-row`}
        >
          <Grid col lg={7} xs={12}>
            <CheckOut />
          </Grid>
          <Grid col lg={5} xs={12}>
            <Card className="single-promo single-promo-hover single-promo-1 text-center py-4 ">
              <div className="flex-column justify-content-center align-items-center ">
                <Text
                  as="h4"
                  className={`text-black fw-bold mb-2 mt-2 ${
                    isMobile ? 'text-center' : 'text-center'
                  }`}
                >
                  {plan.planName}
                </Text>
                <div class="prices price price-show mt-3">
                  <span class="price-currency">{plan.currency}</span>
                  <span class="price-value">{plan.raw}</span>
                  <span class="price-duration">{plan.billingCycle}</span>
                </div>
                <Box
                  as="div"
                  className="flex-column justify-content-start align-items-start px-4 pt-3 pb-3"
                >
                  {plan?.features?.map((feature, index) => (
                    <Box
                key={index}
                as="div"
                className="flex-row justify-content-start align-items-center"
              >
                <BiCheckCircle size={25} className='me-1' />
                <Text as="p" className="lead text_small1">
                  {feature}
                </Text>
              </Box>
                  ))}
                </Box>
              </div>
            </Card>
            <Card className="single-promo single-promo-hover single-promo-1 text-center mt-3 py-2 px-4">
              <div className="flex-row justify-content-between align-items-center b-line-3">
                <Text
                  as="h4"
                  className={`text-black mb-2 mt-2 ${
                    isMobile ? 'text-center' : 'text-center'
                  }`}
                >
                  {plan.planName}
                </Text>
                <Text
                  as="h5"
                  className={`text-black mb-2 mt-2 ${
                    isMobile ? 'text-center' : 'text-center'
                  }`}
                >
                  {plan.currency}
                  {plan.raw}
                </Text>
              </div>
              <div className="flex-row justify-content-between align-items-center b-line-3 ">
                <Text
                  as="h6"
                  className={`text-black mb-2 mt-2 ${
                    isMobile ? 'text-center' : 'text-center'
                  }`}
                >
                  VAT(25%)
                </Text>
                <Text
                  as="h6"
                  className={`text-black mb-2 mt-2 ${
                    isMobile ? 'text-center' : 'text-center'
                  }`}
                >
                  {plan.currency}
                  {Math.round(getVAT(25, plan.raw)).toFixed(2)}
                </Text>
              </div>
              <div className="flex-row justify-content-between align-items-center ">
                <Text
                  as="h3"
                  className={`text-black fw-bold mb-2 mt-2 ${
                    isMobile ? 'text-center' : 'text-center'
                  }`}
                >
                  Total
                </Text>
                <Text
                  as="h3"
                  className={`text-black fw-bold mb-2 mt-2 ${
                    isMobile ? 'text-center' : 'text-center'
                  }`}
                >
                  {plan.currency}
                  { Math.round(parseFloat(plan.raw) + parseFloat(getVAT(25, plan.raw))).toFixed(2)}
                </Text>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Flex>
    </>
  );
};

export default ContactForm;
