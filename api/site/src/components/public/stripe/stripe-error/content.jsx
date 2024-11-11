import React from 'react';
import { Flex, Text, Grid, Button } from 'suftnet-ui-kit';
import { useNavigate } from 'react-router-dom';
import { BiError } from 'react-icons/bi';

const PayoutErrorContent = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/v1/dashboard`);
  };

  return (
    <Flex
      justifyContent="center"
      direction="column"
      alignItems="center"
      className={`w-100 bg-light `}
    >
      <Grid row spacing={4} className={`w-80`}>
        <Grid
          col
          lg={12}
          xs={12}
          className="flex-column align-items-center justify-content-center"
        >
          <BiError
            size={100}
            className="text-danger"
            onClick={() => {}}
          />
          <Text as="h3" className="text-start fw-bold mb-2 mt-2">
          Payment Setup Unsuccessful
          </Text>
          <Text as="h3" className="text-start mb-3">
          Unfortunately, your Stripe payout setup was not successful. Please attempt the process again later
          </Text>
          <Button
            className="primary-solid-btn-0"
            onKeyPress={onClick}
            onClick={onClick}
          >
            Go to Dashboard
          </Button>
          ,
        </Grid>
      </Grid>
    </Flex>
  );
};

export default PayoutErrorContent;
