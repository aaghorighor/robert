import React, { useEffect, useState } from 'react';
import { Card, Text } from 'suftnet-ui-kit';
import { useLazyQuery } from '@apollo/client';
import { FcAcceptDatabase } from 'react-icons/fc';
import { FETCH_CountInCampaignCollection  } from '../../../../queries/campaign';

const CampaignCard = () => {
  const [fetchCampaignCount, { error = {} }] = useLazyQuery(FETCH_CountInCampaignCollection);
  const [campaignCount, setCampaignCount ] = useState(0)

   useEffect(() => {
    const fetchAndLoadCampaignCount= async () => {
       const {
          data: { countInCampaignCollection },
        } = await fetchCampaignCount();
        setCampaignCount(countInCampaignCollection);
    };

    fetchAndLoadCampaignCount();
  }, []);

  return (
    <>
      {' '}
      <Card className="bw-0 p-4">
        <div className="flex-row align-items-center justify-content-start">
          <div className="cycle__13">
            <FcAcceptDatabase color="#006699" size={40} />
          </div>
          <div className="flex-column align-items-start justify-content-center px-4">
            <Text as="h3" className="fs-20 fw-normal mb-1">
              Campaigns
            </Text>
            <Text
              as="p"
              className="fs-25 lead fw-bold icon-color-13 badge badge-pill badge-aggregate"
            >
              {campaignCount}
            </Text>
          </div>
        </div>
      </Card>
    </>
  );
};

export default CampaignCard;
