import React from 'react';
import { Text, Grid, Button } from 'suftnet-ui-kit';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useMobile from '../../../../hooks/useMobile';
import { fadeInAnimate } from '../../../../utils/helper';
import phone from '../../../../assets/imgs/phone_2.png';
import background_image from '../../../../assets/imgs/background_image.png';
import { ContainerWindow } from '../../shared/app-container';
import ImageContainer from '../../shared/image-background';

const Hero = (props) => {
  const { isMobile } = useMobile();

  return (
    <ContainerWindow width={60} >
      <Grid
        row
        spacing={4}
        className={`w-100 mt-5 mb-5 ${isMobile ? 'w-100' : ''}`}
      >
        <Grid col lg={7} md={7} className="flex-column justify-content-center">
          <Text
            as="h1"
            className={`text-black  ${isMobile ? 'text-center mt-2' : 'mt-5'}`}
          >
            <div dangerouslySetInnerHTML={{ __html: props.title }} />
          </Text>
          <Text
            as="h6"
            className={`lead mt-2 lh-base ${isMobile ? 'text-center' : ''}`}
          >
            {props.short_description}
          </Text>

          {!isMobile && (
            <div className='flex-row justify-content-start align-items-center'>
              <Button
                className="btn-color-13 mt-3"
                Component={Link}
                to="/pricing"
              >
                Get Started
              </Button>
              <div style={{ marginRight: 4 }}></div>
              <Button
                className="google-play-store-btn mt-3"
                Component="a"
                href={props.google_play_link}
                target="_blank"
              >
                <span className="uil-google-play p-1"></span> Google Play
              </Button>
            </div>
          )}
        </Grid>
        <Grid
          col
          lg={5}
          md={5}
          className={`flex-row  ${isMobile ? 'mt-4 justify-content-center' : 'justify-content-right'
            } `}
        >
          <ImageContainer imageUrl={background_image}>
            <div
              className={`flex-row  ${isMobile ? 'mt-4 justify-content-center' : 'justify-content-center'
                } `}
            >
              <img
                alt="phone"
                src={phone}
                className='img-fluid'
                style={{ ...fadeInAnimate('0ms') }}
              />
            </div>

          </ImageContainer>

        </Grid>
      </Grid>

    </ContainerWindow>

  );
};

Hero.propTypes = {
  image: PropTypes.string,
  short_description: PropTypes.string,
  google_play_link: PropTypes.string,
  title: PropTypes.string
};

export default Hero;
