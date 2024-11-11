import React, { useContext, useEffect, useState } from 'react';
import {
  Flex,
  Grid,
  Text,
  Layout,
  Content,
  Button,
} from 'suftnet-ui-kit';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { appContext } from '../../shared/appContext';

const ResetPasswordCompleted = (props) => { 
  const { isMobile } = useContext(appContext);

  return (
    <>
      <Layout>
        <Content
          justifyContent="center"
          direction="column"
          alignItems="center"
          className="mt-0"
        >       
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
                      as="h3"
                      className={`text-black fw-normal mt-3 ms-2 mb-2 ${
                        isMobile ? 'text-center' : ''
                      }`}
                    >
                     Your password has been reset successfully!
                    </Text>
                  </div>

                  <Text
                    as="p"
                    className={`text-black text-center w-80 ${
                      isMobile ? 'w-80' : ''
                    }`}
                  >
                   To proceed, please click the button below to go to the login page and access your account.
                  </Text>
                  <Button
                    className="primary-solid-btn-0 mt-3"
                    Component={Link}
                    to="/login"
                  >
                    Sign In
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

export default ResetPasswordCompleted;
