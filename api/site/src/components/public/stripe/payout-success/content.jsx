import React from 'react';
import { Flex, Text, Grid, Button } from 'suftnet-ui-kit';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { useAppContext } from '../../../../components/shared/appContext';

const PayoutSuccessContent = () => {
  const { updateCurrentUser, currentUser } = useAppContext()
  const navigate = useNavigate();
  const onClick = () => {

    const body = {
      ...currentUser,     
      onboardingComplete: true
    };
    
    updateCurrentUser(body);
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
          <FaCheckCircle
            size={100}
            className="icon-color-10"
            onClick={() => { }}
          />
          <Text as="h3" className="text-start fw-bold mb-2 mt-2">
            Great, your stripe payout on boarding is successful.
          </Text>
          <Text as="h3" className="text-start mb-3">
            Your stripe payout on boarding is successful and ready to start
            receiving from Jerur.
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

export default PayoutSuccessContent;
