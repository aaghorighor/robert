import React, { useContext, useEffect, useState } from 'react';
import {
  Flex,
  Grid,
  Text,
  Layout,
  Content,
  Button,
  Check,
} from 'suftnet-ui-kit';
import { FaCheckCircle } from 'react-icons/fa';
import { useLocation, Link } from 'react-router-dom';
import Scroll from '../../shared/scroll-up';
import { fetchPrice } from '../../../../assets/data/pricing';
import useMobile from '../../../../hooks/useMobile';

const CheckOutCompleted = (props) => {
  const location = useLocation();
  const { isMobile } = useMobile();
  const [planName, setPlanName] = useState('');

  useEffect(() => {
    const result = fetchPrice(location.state.priceId);
    setPlanName(result.planName);
  }, [location.state.priceId]);

  return (
    <>
      <Layout>
        <Content
          justifyContent="center"
          direction="column"
          alignItems="center"
          className="mt-0"
        >
          <Scroll />
          <Flex
            justifyContent="center"
            direction="column"
            alignItems="center"
            className="py-5"
          >
            <Grid
              row
              spacing={4}
              className={`${isMobile ? 'mt-2 w-100' : 'mt-1'} w-60 flex-row`}
            >
              <Grid col lg={12} xs={12}>
                <div className="flex-column justify-content-center align-items-center">
                  <div className="flex-column justify-content-center align-items-center">
                    <FaCheckCircle
                      size={100}
                      className="icon-color-10"
                      onClick={() => {}}
                    />
                    <Text
                      as="h2"
                      className={`text-black fw-normal mt-3 ms-2 mb-2 ${
                        isMobile ? 'text-center' : ''
                      }`}
                    >
                      Thanks for subscribing to our {planName} plan
                    </Text>
                  </div>

                  <Text
                    as="p"
                    className={`text-black text-center w-80 ${
                      isMobile ? 'w-80' : ''
                    }`}
                  >
                    We appreciate your subscription to our {planName} plan!.
                    Your subscription has been successfully processed, and your
                    account is all set up and prepared for use.
                  </Text>
                  <Button
                    className="primary-solid-btn-0 mt-3"
                    Component={Link}
                    to="/v1/dashboard"
                  >
                    Go to dashboard
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Flex>
        </Content>
      </Layout>
    </>
  );
};

export default CheckOutCompleted;
