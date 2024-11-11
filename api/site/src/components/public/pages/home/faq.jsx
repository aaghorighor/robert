import React from 'react';
import {
  Flex,
  Text,
  Grid
} from 'suftnet-ui-kit';
import { AccordionSection, Accordion } from '../../../module/accordion';
import data from '../../../../assets/data/faq.json';
import useMobile from '../../../../hooks/useMobile';

const Faq = () => {
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
                className={`text-black fw-normal mb-3 ${
                  isMobile ? 'text-center' : ''
                }`}
              >
                FAQS
              </Text>
              <Text
                as="h1"
                className={`mt-3 text-black text-center w-70 ${
                  isMobile ? 'w-100' : ''
                }`}
              >
                <span>If you don't see an answer to your question </span>, you
                can send us an email from our contact form.
              </Text>
            </div>
          </Grid>
          <Accordion>
            <Grid
              row
              spacing={2}
              className={`mt-4 ${isMobile ? 'w-100' : 'w-100'} `}
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

export default Faq;
