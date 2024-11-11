import React, { useContext } from 'react';
import {
  Flex,
  Text,
  Grid,
  Card,
  Megaphone,
  Design,
  BriefcaseTwo,
} from 'suftnet-ui-kit';
import useMobile from '../../../../hooks/useMobile';
import security from '../../../../assets/imgs/icons8-security-user-female-100.png'
import password from '../../../../assets/imgs/icons8-password-authentication64.png'
import merging from '../../../../assets/imgs/icons8-merging-of-two64.png'
import containerised64 from '../../../../assets/imgs/icons8-snaps-are-containerised64.png'

const WhyChooseUs = (props) => {
  const { isMobile } = useMobile();

  return (
    <>
      <Flex
        justifyContent="center"
        direction="column"
        alignItems="center"
        className={`${isMobile ? 'p-5' : 'p-7'} w-100  `}
      >
        <Grid
          row
          spacing={4}
          className={`${isMobile ? 'mt-2 w-100' : 'mt-1'} w-80 flex-row`}
        >
          <Grid col lg={12} xs={12}>
            <div className="flex-column justify-content-center align-items-center">
              <Text
                as="h6"
                className={`text-black fw-normal mb-3 ${isMobile ? 'text-center' : ''
                  }`}
              >
                Why Choose us
              </Text>
              <Text
                as="h1"
                className={`mt-3 text-black text-center w-50 ${isMobile ? 'w-100' : ''
                  }`}
              >
                <span>Jerur is the preferred</span> choice for Pastors,{' '}
                <span> and here are a few reasons why</span>
              </Text>
            </div>
          </Grid>
        </Grid>
        <Grid
          row
          spacing={2}
          className={`${isMobile ? 'mt-2 w-100' : 'mt-1'
            } w-90 mt-5 flex-row flex-wrap`}
        >
          <Grid
            col
            lg={4}
            xs={12}

          >
            <Card className="single-promo single-promo-hover single-promo-1 text-center p-3 ">
              <div className="me-xl-4 flex-column justify-content-center align-items-center">
                 <img
                  alt="merging"
                  src={merging}

                />
              </div>
              <div className="flex-column justify-content-center align-items-center ">
                <Text
                  as="h4"
                  className={`text-black fw-bold mb-2 ${isMobile ? 'text-center' : ''
                    }`}
                >
                  Seamless Integration
                </Text>
                <Text
                  as="p"
                  className={`mb-3 text-black-50 ${isMobile ? 'text-center' : ''}`}
                >
                  Provides a cohesive solution for church service management, donations, and fundraising, enhancing efficiency for both administrators and members.
                </Text>
              </div>
            </Card>
          </Grid>
          <Grid
            col
            lg={4}
            xs={12}

          >
            <Card className="single-promo single-promo-hover single-promo-1 text-center p-3 ">
              <div className="me-xl-4 flex-column justify-content-center align-items-center">
                <img
                  alt="user"
                  src={containerised64}

                />
              </div>
              <div className="flex-column justify-content-center align-items-center ">
                <Text
                  as="h4"
                  className={`text-black fw-bold mb-2 ${isMobile ? 'text-center' : ''
                    }`}
                >
                  Multi-Platform Accessibility
                </Text>
                <Text
                  as="p"
                  className={`text-black-50 mb-3 ${isMobile ? 'text-center' : ''}`}
                >
                  Jerur is optimized for accessibility on computers, tablets, and smartphones, ensuring a seamless and exceptional user experience on all devices.
                </Text>
              </div>
            </Card>
          </Grid>
          <Grid
            col
            lg={4}
            xs={12}
          >
            <Card className="single-promo single-promo-hover single-promo-1 text-center mb-3 me-3 p-3 ">
              <div className="me-xl-4 flex-column justify-content-center align-items-center">
                <img
                  alt="Data Security and Privacy"
                  src={password}
                />
              </div>
              <div className="flex-column justify-content-center align-items-center ">
                <Text
                  as="h4"
                  className={`text-black fw-bold mb-2 ${isMobile ? 'text-center' : ''
                    }`}
                >
                  Data Security and Privacy
                </Text>
                <Text
                  as="p"
                  className={`text-black-50 mb-3 ${isMobile ? 'text-center' : ''}`}
                >
                  We ensures the security and privacy of church-related data with strong measures like encryption and secure storage, safeguarding donation records and personal information.
                </Text>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Flex>
    </>
  );
};

export default WhyChooseUs;
