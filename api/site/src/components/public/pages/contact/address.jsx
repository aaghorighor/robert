import React from 'react';
import { Text, Grid, Box } from 'suftnet-ui-kit';

const Address = () => {
  return (
    <Grid
      row
      spacing={1}
      className={``}
    >
      <Grid col lg={6} md={6} xs={12}>

      </Grid>
      <Grid
        col
        lg={6}
        md={6}
        xs={12}
        className={`flex-column justify-content-center align-items-center  px-4 `}
      >
        <Box as="div" className="contact__address__office mb-3">
          <span className="ti-location-pin text_small2 text-primary"></span>
          <Box as="div" className="ms-2">
            <Text as="h4" className="fw-bold">
              Address
            </Text>
            <address>
              <Text as="h4" className="text_small">
                453 Cranbrook Road llford Essex IG2 6EW
              </Text>
            </address>
          </Box>
        </Box>
        <Box as="div" className="contact__address__office mb-3">
          <i className="ti-email text_small2 text-primary"></i>
          <Box as="div" className="ms-2">
            <Text as="h4" className="fw-bold">
              E-mail
            </Text>
            <Text as="p">support@suftnet.com</Text>
            <Text as="p">info@suftnet.com</Text>
          </Box>
        </Box>
        <Box as="div" className="contact__address__office mb-3">
          <i className="ti-mobile text_small2 text-primary"></i>
          <Box as="div" className="ms-2">
            <Text as="h4" className="fw-bold">
              Phone
            </Text>
            <Text as="p">(+44)-020 8144 3161</Text>           
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Address;
