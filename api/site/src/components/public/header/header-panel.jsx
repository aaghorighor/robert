import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Flex, Text, Grid } from 'suftnet-ui-kit';
import { appContext } from '../../shared/appContext';
import useMobile from '../../../hooks/useMobile';

const HeaderPanel = (props) => {
  const { isMobile } = useMobile();
  return (
    <Flex
        justifyContent="center"
        direction="column"
        alignItems="center"
        className="w-100 p-7"
      >
        <Grid
          row
          spacing={5}
          className={`${isMobile ? 'w-100' : 'w-90'}  mt-1 `}
        >
          <Grid col lg={12} xs={12}>
            <div className="flex-column justify-content-center align-items-center">
              <Text
                as="h2"
                className={`text-dark fw-normal ${
                  isMobile ? 'text-center display-6' : 'display-5 '
                }`}
              >
                {props.title}
              </Text>
              {props.description && (
                <Text
                  as="h3"
                  className={`mt-3 text-dark text-center w-70 lh-base ${
                    isMobile ? 'w-100' : ''
                  }`}
                >
                  {props.description}
                </Text>
              )}
            </div>
          </Grid>
        </Grid>
      </Flex>
  );
};

HeaderPanel.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imgUrl: PropTypes.string,
};

export default HeaderPanel;
