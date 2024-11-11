import React, { useEffect, useState } from 'react';
import { Card, Text } from 'suftnet-ui-kit';
import { useLazyQuery } from '@apollo/client';
import { TbFileReport } from 'react-icons/tb';
import { FETCH_CountInEventCollection  } from '../../../../queries/event';

const EventCard = () => {
  const [fetchEventCount, { error = {} }] = useLazyQuery(FETCH_CountInEventCollection);
  const [eventCount, setEventCount ] = useState(0)

   useEffect(() => {
    const fetchAndLoadEventCount= async () => {
       const {
          data: { countInEventCollection },
        } = await fetchEventCount();
        setEventCount(countInEventCollection);
    };

    fetchAndLoadEventCount();
  }, []);

  return (
    <>
      {' '}
     <Card className="bw-0 p-4">
        <div className="flex-row align-items-center justify-content-start">
          <div className="cycle__13">
            <TbFileReport color="#006699" size={40} />
          </div>
          <div className="flex-column align-items-start justify-content-center px-4">
            <Text as="h3" className="fs-20 fw-normal mb-1">
              Events
            </Text>
            <Text
              as="p"
              className="fs-25 lead fw-bold icon-color-13 badge badge-pill badge-aggregate"
            >
              {eventCount}
            </Text>
          </div>
        </div>
      </Card>
    </>
  );
};

export default EventCard;
