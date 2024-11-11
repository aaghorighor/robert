import React, { useEffect, useState } from 'react';
import { Card, Text } from 'suftnet-ui-kit';
import { useLazyQuery } from '@apollo/client';
import { AiOutlineFileDone } from 'react-icons/ai';
import { FETCH_CountInFellowshipCollection  } from '../../../../queries/fellowship';

const FellowshipCard = () => {
  const [fetchFellowCount, { error = {} }] = useLazyQuery(FETCH_CountInFellowshipCollection);
  const [fellowshipCount, setFellowshipCount ] = useState(0)

   useEffect(() => {
    const fetchAndLoadFellowshipCount= async () => {
       const {
          data: { countInFellowshipCollection },
        } = await fetchFellowCount();
        setFellowshipCount(countInFellowshipCollection);
    };

    fetchAndLoadFellowshipCount();
  }, []);

  return (
    <>
      {' '}
      <Card className="bw-0 p-4">
        <div className="flex-row align-items-center justify-content-start">
          <div className="cycle__12">
            <AiOutlineFileDone color="#006699" size={40} />
          </div>
          <div className="flex-column align-items-start justify-content-center px-4">
            <Text as="h3" className="fs-20 fw-normal mb-1">
              Fellowships
            </Text>
            <Text
              as="p"
              className="fs-25 lead fw-bold icon-color-13 badge badge-pill badge-aggregate"
            >
              {fellowshipCount}
            </Text>
          </div>
        </div>
      </Card>
    </>
  );
};

export default FellowshipCard;
