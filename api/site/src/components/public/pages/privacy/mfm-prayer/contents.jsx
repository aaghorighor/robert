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
                  Privacy Policy for MFM Prayers App
                </Text>
              </CardHeader>
              <CardContent>
                <Text as="p" className="text-start mb-2 lh-sm ">
                  At MFM Prayers, we take your privacy seriously and are
                  committed to protecting it. This Privacy Policy explains how
                  we collect, use, and protect your personal information when
                  you use our prayer app.
                </Text>
              </CardContent>
            </Card>
          </Grid>
          <Grid col lg={12} xs={12}>
            <Card className="p-4 rounded-0 mh">
              <CardHeader>
                <Text as="h3" className="text-start fw-bold mb-1">
                  Collection of Information
                </Text>
              </CardHeader>
              <CardContent>
                <Text as="p" className="text-start mb-2 lh-sm ">
                  We collect personal information from you when you use our app,
                  such as your name, email address, and prayer requests. We also
                  collect non-personal information, such as your devices
                  operating system and usage statistics. We may use cookies to
                  collect this information.
                </Text>
              </CardContent>
            </Card>
          </Grid>

          <Grid col lg={12} xs={12}>
            <Card className="p-4 rounded-0 mh">
              <CardHeader>
                <Text as="h3" className="text-start fw-bold mb-1">
                  Use of Information
                </Text>
              </CardHeader>
              <CardContent>
                <Text as="p" className="text-start mb-2 lh-sm ">
                  We use your personal information to provide you with the best
                  possible prayer experience and to improve our app. We may also
                  use your information to send you prayer reminders or updates
                  about our app.
                </Text>
              </CardContent>
            </Card>
          </Grid>

          <Grid col lg={12} xs={12}>
            <Card className="p-4 rounded-0 mh">
              <CardHeader>
                <Text as="h3" className="text-start fw-bold mb-1">
                  Disclosure of Information
                </Text>
              </CardHeader>
              <CardContent>
                <Text as="p" className="text-start mb-2 lh-sm ">
                  We do not sell or share your personal information with third
                  parties, except as required by law or to provide you with the
                  services you requested. We may disclose your information to
                  service providers who assist us in operating our app or to
                  enforce our Terms of Service.
                </Text>
              </CardContent>
            </Card>
          </Grid>

          <Grid col lg={12} xs={12}>
            <Card className="p-4 rounded-0 mh">
              <CardHeader>
                <Text as="h3" className="text-start fw-bold mb-1">
                  Security of Information
                </Text>
              </CardHeader>
              <CardContent>
                <Text as="p" className="text-start mb-2 lh-sm ">
                  We take reasonable measures to protect your personal
                  information from unauthorized access or disclosure. However,
                  we cannot guarantee that your information will be completely
                  secure.
                </Text>
              </CardContent>
            </Card>
          </Grid>

          <Grid col lg={12} xs={12}>
            <Card className="p-4 rounded-0 mh">
              <CardHeader>
                <Text as="h3" className="text-start fw-bold mb-1">
                  {`Children's Privacy`}
                </Text>
              </CardHeader>
              <CardContent>
                <Text as="p" className="text-start mb-2 lh-sm ">
                  Our app is not intended for children under the age of 13. We
                  do not knowingly collect personal information from children
                  under 13.
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
                  We will retain your personal information for as long as
                  necessary to fulfill the purposes for which it was collected,
                  including to provide you with support and updates about our
                  app. We will also retain and use your information as necessary
                  to comply with our legal obligations, resolve disputes, and
                  enforce our agreements.
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
                  You have the right to request access to and correction of your
                  personal information that we hold. You may also request that
                  we delete your personal information, and we will do so unless
                  we are required to retain it for legal or legitimate business
                  purposes.
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
                  We reserve the right to update this Privacy Policy at any
                  time. We will notify you of any changes by posting the updated
                  policy on our website or through our app.
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
                  If you have any questions or concerns about our privacy
                  policy, please contact us at support@suftnet.com.
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
