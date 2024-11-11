import React, { useContext } from 'react';
import { Flex, Text, Grid } from 'suftnet-ui-kit';
import { appContext } from '../../shared/appContext';
import ImageBg from './image-background';
import imgUrl from '../../../assets/imgs/photos/bg2.jpg';

const Subscribe = () => {
  const { isMobile } = useContext(appContext);
  return (
    <ImageBg imageUrl={imgUrl}>
      <Flex
        justifyContent="center"
        direction="column"
        alignItems="center"
        className={`${isMobile ? 'p-5' : 'p-7'}  bg-img-4 `}
      >
        <Grid
          row
          spacing={1}
          className={`${isMobile ? 'w-100 ' : 'w-80'} mt-2 `}
        >
          <Grid
            col
            lg={6}
            xs={12}
            className={`${
              isMobile ? 'w-100 align-items-start' : ' '
            } flex-column align-items-start`}
          >
            <Text as="h1" className="text-start fw-bold mb-3 text-light">
              Subscribe to our newsletter
            </Text>
            <Text
              as="p"
              className="text-start fw-light mb-2 lh-base text-white"
            >
              Subscribe to our newsletter to get our news & deals delivered to
              you. Do not worry, we hate spam and we respect your privacy.
            </Text>
          </Grid>

          <Grid
            col
            lg={6}
            xs={12}
            className={`${
              isMobile
                ? 'w-100 justify-content-center'
                : 'justify-content-start'
            } flex-row  align-items-center`}
          >
            <div className={`${isMobile ? 'w-100' : 'w-70'} subscribe `}>
              <input
                className="email_address"
                maxLength={50}
                placeholder="Email Address"
              ></input>
              <button type="button" className="send_email">
                Submit
              </button>
            </div>
          </Grid>
        </Grid>
      </Flex>
    </ImageBg>
  );
};

export default Subscribe;
