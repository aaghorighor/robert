import React, { useContext } from 'react';
import { Flex, Text, Grid, Card } from 'suftnet-ui-kit';
import PropTypes from 'prop-types';
import useMobile from '../../../../hooks/useMobile';

const Features = (props) => {
  const { isMobile } = useMobile();

  return (
    <>
      <Flex
        justifyContent="center"
        direction="column"
        alignItems="center"
        className={`${isMobile ? 'p-5' : 'p-7'} w-100 bg-light `}
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
                className={`text-dark fw-normal mb-3 ${isMobile ? 'text-center' : ''
                  }`}
              >
                FEATURES
              </Text>
              <Text
                as="h1"
                className={`mt-3 text-dark text-center w-70 ${isMobile ? 'w-100' : ''
                  }`}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: props.feature?.title }}
                />
              </Text>
            </div>
          </Grid>
        </Grid>
        <Grid
          row
          spacing={2}
          className={`${isMobile ? 'mt-2 w-100' : 'mt-1'
            } w-100 mt-5 flex-row flex-wrap`}
        >
          {(props.feature?.list || []).map((list) => (
            <Grid col lg={4} md={6} xs={12} key={list.title}>
              <Card className="p-4">
                <div className="flex-column justify-content-between align-items-center">
                  <div className={`cycle__2 ${list.bgColor} `}>
                    <span className={`${list.icon} ${list.textColor}`}></span>
                  </div>
                  <Text
                    as="h4"
                    className={`text-dark fw-bold mb-1 mt-2 ${isMobile ? 'text-center' : ''
                      }`}
                  >
                    {list.title}
                  </Text>
                  <Text
                    as="h6"
                    className={`mb-1 text-black-50 ${isMobile ? 'text-center' : ''
                      }`}
                  >
                    {list.description}
                  </Text>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Flex>
    </>
  );
};

Features.propTypes = {
  feature: PropTypes.object,
};

export default Features;
