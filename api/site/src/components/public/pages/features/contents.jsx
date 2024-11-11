import React, { useContext, useState, useEffect } from 'react';
import {
  Flex,
  Text,
  Grid, 
  Card
} from 'suftnet-ui-kit';
import { AppJson } from '../../../../assets/data/appJson';
import useMobile from '../../../../hooks/useMobile';

const Contents = () => {
  const { isMobile } = useMobile();
  const [store, setStore] = useState({});

  useEffect(() => {
    setStore(AppJson);
  }, [AppJson]);

  return (
    <>
      <Flex
        justifyContent="center"
        direction="column"
        alignItems="center"
        className={`${isMobile ? 'p-5' : 'p-7'} w-100 bg-light`}
      >
        <Grid
          row
          spacing={2}
          className={`${
            isMobile ? 'mt-2 w-100' : 'mt-1'
          } w-100 mt-1 flex-row flex-wrap`}
        >
          {(store.feature?.list || []).map((list) => (
            <Grid col lg={4} md={6} xs={12} key={list.title}>
                 <Card className="p-4 shadow-sm">
                <div className="flex-column justify-content-between align-items-center">
                  <span className={list.icon}></span>
                  <Text
                    as="h4"
                    className={`text-dark fw-bold mb-1 ${
                      isMobile ? 'text-center' : ''
                    }`}
                  >
                    {list.title}
                  </Text>
                  <Text
                    as="h6"
                    className={`text-dark fw-normal mb-1 ${
                      isMobile ? 'text-center' : ''
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

export default Contents;
