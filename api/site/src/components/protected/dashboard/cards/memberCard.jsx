import React, { useEffect, useState } from 'react';
import { Card, Text } from 'suftnet-ui-kit';
import { useLazyQuery } from '@apollo/client';
import { FaUser  } from "react-icons/fa";
import { GET_MEMBERS_COUNT } from '../../../../queries/member';

const MemberCard = () => {
  const [fetchMemberCount] = useLazyQuery(GET_MEMBERS_COUNT);
  const [memberCount, setMemberCount] = useState(0)

  useEffect(() => {
    const fetchAndLoadMemberCount = async () => {
      const {
        data: { getMemberCount },
      } = await fetchMemberCount();
      setMemberCount(getMemberCount);
    };

    fetchAndLoadMemberCount();
  }, []);

  return (
    <>
      {' '}
      <Card className="bw-0 p-4">
        <div className="flex-row align-items-center justify-content-start">
            <FaUser   color="#006699" size={40} />
          <div className="flex-column align-items-start justify-content-center px-4">
            <Text as="h3" className="fs-20 fw-normal mb-1">
              Member
            </Text>
            <div className="flex-row align-items-center justify-content-start">
              <Text
                as="p"
               className="fs-25 lead fw-bold icon-color-13 badge badge-pill badge-aggregate"
              >
                {parseInt(memberCount?.activeCount || 0) + parseInt(memberCount?.noneActiveCount || 0)}
              </Text>             
            </div>            
          </div>
        </div>
      </Card>
    </>
  );
};

export default MemberCard;
