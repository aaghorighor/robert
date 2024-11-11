import React, { useContext } from 'react';
import { Flex, Grid } from 'suftnet-ui-kit';
import { appContext } from '../../../shared/appContext';
import { AccordionSection, Accordion } from '../../../module/accordion';
import data from '../../../../assets/data/faq.json';

const Contents = () => {
  const { isMobile } = useContext(appContext);
  return (
    <>
      <Flex
        justifyContent="center"
        direction="column"
        alignItems="center"
        className={`${isMobile ? 'p-5' : 'pb-7'}`}
      >
        <Grid
          row
          spacing={4}
          className={`${isMobile ? 'mt-2 w-100' : 'mt-1'} w-80 flex-row`}
        >
          <Accordion>
            <Grid
              row
              spacing={2}
              className={`${isMobile ? 'w-100' : 'w-100'} `}
            >
              {data.map((x, index) => (
                <Grid col lg={6} xs={12} key={x.title}>
                  <AccordionSection
                    key={x.id}
                    index={index}
                    title={x.title}
                    content={x.content}
                  />
                </Grid>
              ))}
            </Grid>
          </Accordion>
        </Grid>
      </Flex>
    </>
  );
};

export default Contents;
