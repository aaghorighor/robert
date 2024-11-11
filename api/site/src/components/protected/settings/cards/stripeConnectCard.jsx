import React, { useContext } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Text,
  Button,
  Spacer,
} from 'suftnet-ui-kit';
import { appContext } from '../../../shared/appContext';
import { handleStripeConnect } from '../../../../utils/helper';

const StripeConnectCard = ({ handleClose, connected = false }) => {
  const { currentUser } = useContext(appContext);

  return (
    <Card className="bw-2">
      <div className="bg-light p-3">
        <CardHeader className=" flex-row align-items-center justify-content-between">
          <Text as="h6" className="text-dark fs-23">
            Stripe Connect
          </Text>
        </CardHeader>
      </div>

      <CardContent className="py-4 p-4 flex-column align-items-center justify-content-center">
        {connected ? (
          <>
            <Text as="h6" className="text-dark fw-bold fs-23">
              Payout setup Completed
            </Text>
            <Text as="h6" className="text-dark fs-19 mt-2 ">
              The configuration for Stripe Connect has been successfully
              finalized.
            </Text>
          </>
        ) : (
          <>
            <Text as="h6" className="text-dark fw-bold fs-23">
              Payout setup needed
            </Text>
            <Text as="h6" className="text-dark fs-19 mt-2 ">
              Jerur partners with Stripe to transfer earnings to your bank
              account.
            </Text>
            <Text as="h6" className="text-dark fs-17 mt-2">
              You'll be redirected to Stripe to complete the onboarding process.
            </Text>
          </>
        )}

        <div className="flex-row align-items-center justify-content-start mt-4">
          <Button
            className="rounded-circle-30 google-play-btn"
            onClick={() => handleStripeConnect(currentUser)}
            disabled={connected}
          >
            Setup Payment
          </Button>
          <Spacer horizontal={4} />
          <Button
            className="rounded-circle-30 google-play-btn "
            onClick={handleClose}
          >
            Close
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StripeConnectCard;
