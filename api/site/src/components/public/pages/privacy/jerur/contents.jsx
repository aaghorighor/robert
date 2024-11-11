import React, { useContext } from 'react';
import {
  Flex,
  Text,
  Grid,
  Card,
  CardContent,
  CardHeader,
} from 'suftnet-ui-kit';
import { appContext } from '../../../../shared/appContext';

const Contents = () => {
  const { isMobile } = useContext(appContext);
  return (
    <>
      <Flex
        justifyContent="center"
        direction="column"
        alignItems="center"
        className={`${isMobile ? 'p-5' : 'p-7'}`}
      >
        <Grid
          row
          spacing={1}
          className={`${isMobile ? 'mt-2 w-100' : 'mt-1'} w-80 flex-row`}
        >
          <Grid col lg={12} xs={12}>
            <Card className="p-4 rounded-0 mh">
              <CardHeader>
                <Text as="h3" className="text-start fw-bold mb-1">
                  Privacy Policy for Jerur Bible App
                </Text>
              </CardHeader>
              <CardContent>
                <Text as="p" className="text-start mb-2 lh-sm ">
                  Jerur is committed to protecting your privacy and ensuring
                  that your personal information is handled in a safe and
                  responsible way. This privacy policy outlines how we collect,
                  store, and use your personal information when you use our
                  Bible app.
                </Text>
              </CardContent>
            </Card>
          </Grid>
          <Grid col lg={12} xs={12}>
            <Card className="p-4 rounded-0 mh">
              <CardHeader>
                <Text as="h3" className="text-start fw-bold mb-1">
                  Information We Collect
                </Text>
              </CardHeader>
              <CardContent>
                <Text as="p" className="text-start mb-2 lh-sm ">
                  We collect personal information such as your name, email
                  address, and any other information you voluntarily provide
                  when you contact us for support or leave a review. We also
                  collect technical information such as your device type,
                  operating system version, and app usage data to help us
                  improve our app and provide a better user experience.
                </Text>
              </CardContent>
            </Card>
          </Grid>

          <Grid col lg={12} xs={12}>
            <Card className="p-4 rounded-0 mh">
              <CardHeader>
                <Text as="h3" className="text-start fw-bold mb-1">
              How We Use Your Information
                </Text>
              </CardHeader>
              <CardContent>
                <Text as="p" className="text-start mb-2 lh-sm ">
                We use your personal information to respond to your support requests, provide you with updates and news about our app, and to personalize your app experience. We may also use your information for analytics and research purposes to improve our app and better understand our users.
                </Text>
              </CardContent>
            </Card>
          </Grid>

          <Grid col lg={12} xs={12}>
            <Card className="p-4 rounded-0 mh">
              <CardHeader>
                <Text as="h3" className="text-start fw-bold mb-1">
                Data Sharing
                </Text>
              </CardHeader>
              <CardContent>
                <Text as="p" className="text-start mb-2 lh-sm ">
                We do not sell, trade, or rent your personal information to third parties. However, we may share your information with our service providers who help us with app development, maintenance, and support. We require our service providers to keep your information confidential and use it only for the purposes for which we disclose it to them.
                </Text>
              </CardContent>
            </Card>
          </Grid>

          <Grid col lg={12} xs={12}>
            <Card className="p-4 rounded-0 mh">
              <CardHeader>
                <Text as="h3" className="text-start fw-bold mb-1">
                Data Retention
                </Text>
              </CardHeader>
              <CardContent>
                <Text as="p" className="text-start mb-2 lh-sm ">
                We will retain your personal information for as long as necessary to fulfill the purposes for which it was collected, including to provide you with support and updates about our app. We will also retain and use your information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.
                </Text>
              </CardContent>
            </Card>
          </Grid>

          <Grid col lg={12} xs={12}>
            <Card className="p-4 rounded-0 mh">
              <CardHeader>
                <Text as="h3" className="text-start fw-bold mb-1">
                Your Rights
                </Text>
              </CardHeader>
              <CardContent>
                <Text as="p" className="text-start mb-2 lh-sm ">
                You have the right to request access to and correction of your personal information that we hold. You may also request that we delete your personal information, and we will do so unless we are required to retain it for legal or legitimate business purposes.
                </Text>
              </CardContent>
            </Card>
          </Grid>

          <Grid col lg={12} xs={12}>
            <Card className="p-4 rounded-0 mh">
              <CardHeader>
                <Text as="h3" className="text-start fw-bold mb-1">
                Changes to Our Privacy Policy
                </Text>
              </CardHeader>
              <CardContent>
                <Text as="p" className="text-start mb-2 lh-sm ">
                We reserve the right to modify this privacy policy at any time. Any changes we make will be effective immediately upon posting the updated policy on our website. We encourage you to review this policy regularly to stay informed about how we are protecting your personal information.
                </Text>
              </CardContent>
            </Card>
          </Grid>

          <Grid col lg={12} xs={12}>
            <Card className="p-4 rounded-0 mh">
              <CardHeader>
                <Text as="h3" className="text-start fw-bold mb-1">
                Contact Us
                </Text>
              </CardHeader>
              <CardContent>
                <Text as="p" className="text-start mb-2 lh-sm ">
                If you have any questions or concerns about our privacy policy, please contact us at support@suftnet.com.
                </Text>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </Flex>
    </>
  );
};

export default Contents;
