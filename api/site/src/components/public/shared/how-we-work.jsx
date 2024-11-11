import React, { useState, useContext } from 'react';
import { Flex, Text, Grid, Box } from 'suftnet-ui-kit';
import { appContext } from '../../shared/appContext';
import List from '../pages/home/contents/list';
import image from '../../../assets/imgs/photos/about25.jpg';
import Tiles from '../pages/home/contents/titles';
import data from '../../../assets/data/tiles.json';
import listData from '../../../assets/data/list.json';

const HowWeWork = () => {
  const {isMobile} = useContext(appContext);
  const [content, setContent] = useState('');

  const handleChange = (description) => {
    setContent(description);
  };

  return (
    <>
      <Flex
        justifyContent="center"
        direction="column"
        alignItems="center"
        className={`w-100 bg-img-3 ${isMobile ? 'p-5' : 'p-7 '}`}
      >
        <Grid
          row
          spacing={2}
          className={`w-100 mt-1 flex-nowrap ${isMobile ? 'w-100 flex-wrap' : ''}`}
        >
          <Grid
            col
            lg={4}
            md={12}
            xs={12}
            className="flex-column justify-content-center align-items-center"
          >
            <img src={image} alt="How We Work" className="img-fluid"></img>
          </Grid>
          <Grid col md={12} lg={8} xs={12}>
            <Box
              as="div"
              className={`flex-column justify-content-start align-items-start ${
                isMobile
                  ? 'justify-content-center align-items-center'
                  : ''
              }`}
            >
              <Text as="h1" >
                How We Work
              </Text>
              <Text
                as="p"
                className={`mt-3 lh-base ${
                  isMobile ? 'text-center' : ''
                }`}
              >
                {` Suftnet's process for working as a software development company
                is thorough and comprehensive, ensuring that clients receive
                high-quality software that meets their specific requirements and
                helps them to achieve their goals.`}
              </Text>
            </Box>
            <Box
              as="div"
              className={`flex-row gap-01 fw-bold pt-4 mb-4 ${
                isMobile ? 'flex-column' : ''
              }`}
            >
              {data?.map((x) => (
                <Tiles
                  key={x.id}
                  id={x.id}
                  title={x.title}
                  description={x.description}
                  handleChange={handleChange}
                  icon={x.icon}
                />
              ))}
            </Box>

            {content ? (
              <Box as="div" className="py-2">
                <Box
                  as="div"
                  className={`flex-row justify-content-around align-items-center message__box p-3 ${
                    isMobile ? 'flex-column justify-content-center' : ''
                  }`}
                >
                  <span className="icon ti-info text-white p-2 me-2"></span>
                  <Text
                    as="h6"
                    className={`text_small1  ${
                      isMobile ? 'mt-2' : ''
                    }`}
                  >
                    {content}
                  </Text>
                </Box>
              </Box>
            ) : (
              <ul className="list-unstyled">
                {listData?.map((x) => (
                  <List key={x.id} id={x.id} title={x.title}></List>
                ))}
              </ul>
            )}
          </Grid>
        </Grid>
      </Flex>
    </>
  );
};

export default HowWeWork;
