import React from 'react';
import { Flex, Text, Grid, Box } from 'suftnet-ui-kit';
import PropTypes from 'prop-types';
import imagUrl from '../../../../assets/imgs/setup_steps.png';
import useMobile from '../../../../hooks/useMobile';

const HowItWork = () => {
  const {isMobile}  = useMobile();
 
  return (
    <>
      <Flex
        justifyContent="center"
        direction="column"
        alignItems="center"
        className={`${isMobile ? 'p-5' : 'p-7'} w-100 `}
      >
        <Grid row spacing={2} className={`${isMobile ? 'mt-2' : 'mt-1'} w-100`}>
          <Grid col lg={12} md={12} xs={12}>
            <div className="flex-column justify-content-center align-items-center">
              <Text
                as="h6"
                className={`text-black fw-normal mb-3 ${
                  isMobile ? 'text-start' : ''
                }`}
              >
                HOW IT WORKS
              </Text>
              <Text
                as="h1"
                className={`mt-3 text-black text-center w-50 ${
                  isMobile ? 'w-100' : ''
                }`}
              >
                Purchase subscription, <span>setup your Church</span> and voilà,
                you are all set!
              </Text>
            </div>
          </Grid>
        </Grid>
        <Grid
          row
          spacing={1}
          className={`w-100 ${isMobile ? ' w-100' : 'mt-5'} `}
        >
          <Grid col lg={4} md={6} xs={12} className="p-0">
            <Box as="div">
              <Box as="div" className="py-2">
                <Box as="div" className="flex-row align-items-center mt-3 mb-2">
                  <Box
                    as="div"
                    className="badge badge-circle badge-primary me-1"
                  >
                    <span>1</span>
                  </Box>
                  <Text as="h5" className="fw-bold ">
                    Subscription Purchase
                  </Text>
                </Box>

                <Box as="div" className="list-unstyled">
                  <Box
                    as="div"
                    className="flex-row justify-content-between align-items-center mt-1 mb-2"
                  >
                    <Box as="div" className="me-1">
                      <span className="ti-check"></span>{' '}
                    </Box>
                    <Text as="p" className="lead text_small1">
                      Choose from the available subscription plans. The benefits
                      and costs of each plan
                    </Text>
                  </Box>
                  <Box
                    as="div"
                    className="flex-row justify-content-between align-items-center mt-1 mb-2"
                  >
                    <Box as="div" className="me-1">
                      {' '}
                      <span className="ti-check"></span>
                    </Box>
                    <Text as="p" className="lead text_small1">
                      Complete the purchase through the secure payment gateway
                      integrated into the app.
                    </Text>
                  </Box>
                </Box>
              </Box>
              <Box as="div" className="py-2">
                <Box as="div" className="flex-row align-items-center mt-1 mb-2">
                  <Box
                    as="div"
                    className="badge badge-circle badge-primary me-1"
                  >
                    <span>2</span>
                  </Box>
                  <Text as="h5" className="fw-bold">
                    Customize Settings
                  </Text>
                </Box>

                <Box as="div" className="list-unstyled">
                  <Box
                    as="div"
                    className="flex-row justify-content-start align-items-center mt-1 mb-2"
                  >
                    <Box as="div" className="me-1">
                      <span className="ti-check"></span>
                    </Box>
                    <Text as="p" className="lead text_small1">
                      Customize the platform to fit your church's specific
                      needs.
                    </Text>
                  </Box>
                  <Box
                    as="div"
                    className="flex-row justify-content-between align-items-center mt-1 mb-2"
                  >
                    <Box as="div" className="me-1">
                      <span className="ti-check"></span>{' '}
                    </Box>
                    <Text as="p" className="lead text_small1">
                      Set up service time schedules, configure donation
                      settings, and tailor the platform to align with your
                      church's branding and communication preferences.
                    </Text>
                  </Box>
                </Box>
              </Box>
              <Box as="div" className="py-2">
                <Box as="div" className="flex-row align-items-center mt-1 mb-2">
                  <Box
                    as="div"
                    className="badge badge-circle badge-primary me-1"
                  >
                    <span>3</span>
                  </Box>
                  <Text as="h5" className="fw-bold">
                    Launch Stripe Connect
                  </Text>
                </Box>

                <Box as="div" className="list-unstyled">
                  <Box
                    as="div"
                    className="flex-row align-items-center mt-1 mb-2"
                  >
                    <Box as="div" className="me-1">
                      <span className="ti-check"></span>{' '}
                    </Box>
                    <Text as="p" className="lead text_small1">
                      Set up Stripe Connect within your church SaaS platform to
                      enable member giving in your mobile app.
                    </Text>
                  </Box>
                  <Box
                    as="div"
                    className="flex-row align-items-center mt-1 mb-2"
                  >
                    <Box as="div" className="me-1">
                      <span className="ti-check"></span>{' '}
                    </Box>
                    <Text as="p" className="lead text_small1">
                      Configure Stripe Connect to securely handle payments,
                      manage payouts to your church's bank account, and ensure a
                      seamless giving experience for members.
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid col lg={4} md={6} xs={12} className="p-0">
            <div className="flex-column justify-content-center align-items-center">
              <img src={imagUrl} className="img-fluid"></img>
            </div>
          </Grid>
          <Grid col lg={4} md={6} xs={12} className="p-0">
            <div className="flex-column justify-content-start align-items-start">
              <Box as="div">
                <Box as="div" className="py-2">
                  <Box
                    as="div"
                    className="flex-row align-items-center mt-3 mb-2"
                  >
                    <Box
                      as="div"
                      className="badge badge-circle badge-primary me-1"
                    >
                      <span>4</span>
                    </Box>
                    <Text as="h5" className="fw-bold">
                      Donation Management
                    </Text>
                  </Box>

                  <Box as="div" className="list-unstyled">
                    <Box
                      as="div"
                      className="flex-row justify-content-between align-items-center mt-1 mb-2"
                    >
                      <Box as="div" className="me-1">
                        <span className="ti-check"></span>{' '}
                      </Box>
                      <Text as="p" className="lead text_small1">
                        Utilize the platform's donation management features to
                        accept and track online donations securely.
                      </Text>
                    </Box>
                    <Box
                      as="div"
                      className="flex-row justify-content-between align-items-center mt-1 mb-2"
                    >
                      <Box as="div" className="me-1">
                        <span className="ti-check"></span>{' '}
                      </Box>
                      <Text as="p" className="lead text_small1">
                        Members can contribute using various payment methods,
                        and the platform maintains a record of all donations for
                        reporting purposes.
                      </Text>
                    </Box>
                  </Box>
                </Box>
                <Box as="div" className="py-2">
                  <Box
                    as="div"
                    className="flex-row align-items-center mt-1 mb-2"
                  >
                    <Box
                      as="div"
                      className="badge badge-circle badge-primary me-1"
                    >
                      <span>5</span>
                    </Box>
                    <Text as="h5" className="fw-bold">
                      Fundraising Campaigns
                    </Text>
                  </Box>

                  <Box as="div" className="list-unstyled">
                    <Box
                      as="div"
                      className="flex-row align-items-center mt-3 mb-2"
                    >
                      <Box as="div" className="me-1">
                        <span className="ti-check"></span>{' '}
                      </Box>
                      <Text as="p" className="lead text_small1 text-start">
                        Launch fundraising campaigns within the platform to
                        support specific projects or initiatives.
                      </Text>
                    </Box>
                    <Box
                      as="div"
                      className="flex-row justify-content-between align-items-center mt-1 mb-2"
                    >
                      <Box as="div" className="me-1">
                        <span className="ti-check"></span>{' '}
                      </Box>
                      <Text as="p" className="lead text_small1">
                        Create compelling campaigns, track progress, and engage
                        your members in contributing towards shared goals.
                      </Text>
                    </Box>
                  </Box>
                </Box>
                <Box as="div" className="py-2">
                  <Box
                    as="div"
                    className="flex-row align-items-center mt-1 mb-2"
                  >
                    <Box
                      as="div"
                      className="badge badge-circle badge-primary me-1"
                    >
                      <span>6</span>
                    </Box>
                    <Text as="h5" className="fw-bold">
                      Support and Assistance
                    </Text>
                  </Box>

                  <Box as="div" className="list-unstyled">
                    <Box
                      as="div"
                      className="flex-row justify-content-between align-items-center mt-3 mb-2"
                    >
                      <Box as="div" className="me-1">
                        <span className="ti-check"></span>{' '}
                      </Box>
                      <Text as="p" className="lead text_small1">
                        If you encounter any issues or need help, you can
                        contact the app's support team directly through the
                        built-in customer service feature.
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </div>
          </Grid>
        </Grid>
      </Flex>
    </>
  );
};

HowItWork.propTypes = {
  set_up: PropTypes.object,
};

export default HowItWork;
