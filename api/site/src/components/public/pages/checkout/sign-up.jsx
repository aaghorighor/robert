import React, { useContext } from 'react';
import { Flex, Grid, User, Text } from 'suftnet-ui-kit';
import { appContext } from '../../../shared/appContext';

const PackageSignUp = () => {
  const { isMobile } = useContext(appContext);
  return (
    <>
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
              <div className="flex-row justify-content-center align-items-center">
                <User />              
                <Text
                  as="h2"
                  className={`text-black fw-normal ms-2 mb-2 ${
                    isMobile ? 'text-center' : ''
                  }`}
                >
                  Sign Up
                </Text>
              </div>

              <Text
                as="p"
                className={`mt-3 text-black text-center w-80 ${
                  isMobile ? 'w-80' : ''
                }`}
              >
               By signing up,you will gain access to cutting-edge technology that can transform your church's operations and enhance your overall effectiveness. Join us today and start elevating your church to the next level!
              </Text>
            </div>
          </Grid>
        </Grid>
      </Flex>
    </>
  );
};

export default PackageSignUp;
