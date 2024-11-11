import React, { useContext, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Text,
  Button,
} from 'suftnet-ui-kit';
import { appContext } from '../../../shared/appContext';
import {
  convertToDateOnly,
  getPlanStatus,
  stripeCustomerPortal,
} from '../../../../utils/helper';

const SubscriptionCard = () => {
  const { currentUser, token } = useContext(appContext);

  const customerPortalHandler = async () => {
    const result = await stripeCustomerPortal(
      currentUser?.stripeCustomerId,
      token,
    );

    if (result?.url) {
      window.location.href = result.url;
    }
  };

  return (
    <Card className="bw-2">
      <div className="bg-light p-3">
        <CardHeader className=" flex-row align-items-center justify-content-between">
          <Text as="h2" className="text-dark fs-23 px-1">
            Subscription
          </Text>
        </CardHeader>
      </div>

      <CardContent className="py-4 p-4 flex-1 ">
        <div className="flex-row align-items-center justify-content-between">
          <label>Plan</label>
          <Text as="p" className="text-dark">
            {currentUser?.plan}
          </Text>
        </div>
        <div className="flex-row align-items-center justify-content-between">
          <label>Start Period</label>
          <Text as="p" className="text-dark">
            {convertToDateOnly(currentUser?.startDate)}
          </Text>
        </div>
        <div className="flex-row align-items-center justify-content-between">
          <label>End Period</label>
          <Text as="p" className="text-dark">
            {convertToDateOnly(currentUser?.endDate)}
          </Text>
        </div>
        <div className="flex-row align-items-center justify-content-between">
          <label>Status</label>
          <Text
            as="p"
            className={`badge badge-pill ${getPlanStatus(currentUser?.status)}`}
          >
            {currentUser?.status}
          </Text>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex-row align-items-center justify-content-start mb-4 px-3">
          <Button
            className="rounded-circle-30 google-play-btn"
            onClick={customerPortalHandler}
          >
            Manage
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionCard;
