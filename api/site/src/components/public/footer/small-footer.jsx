import React from 'react';
import { SmallFooter, Text, Link } from 'suftnet-ui-kit';

const BottomFooter = () => (
  <SmallFooter className="flex-row justify-content-center p-2 bg-dark">
    <Text as="h6" className="text-white-50 lh-base">
      Copyrights © 2023. All rights reserved by
    </Text>
    <Link className="p-0 ms-2 text-white" href="/#">
      <Text as="h6" className="text-white-80 lh-base">
        Suftnet Int.
      </Text>
    </Link>
  </SmallFooter>
);

export default BottomFooter;
