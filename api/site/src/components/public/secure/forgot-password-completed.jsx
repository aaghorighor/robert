import React from 'react';
import {
  Flex,
  Grid,
  Text,
  Layout,
  Content,
  Button,
} from 'suftnet-ui-kit';
import { Link } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';
import { useAppContext } from '../../shared/appContext';

const ForgotPasswordCompleted = () => {
  const { isMobile } = useAppContext();
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
                <FaInfoCircle
                      size={100}
                      className="icon-color-9"
                      onClick={() => {}}
                    />
                  <Text
                    as="p"
                    className={`text-black text-center w-50 ${isMobile ? 'w-80' : ''
                      }`}
                  >
                    If the information entered is associated with an Jerur account we have sent you an email with password reset instructions.
                  </Text>
                  <Button
                    className="google-play-store-btn mt-3"
                    Component={Link}
                    to="/"
                  >
                    Home
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

export default ForgotPasswordCompleted;
