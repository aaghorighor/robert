import React, { useRef, useEffect } from 'react';
import { Box } from 'suftnet-ui-kit';

const Scroll = () => {
  const showScroll = useRef(null);

  useEffect(() => {   
    if (showScroll.current) {
      const offset = 50;
      window.addEventListener('scroll', () => {     
        // eslint-disable-next-line no-unused-expressions
        (window.scrollY >= offset) ?  showScroll.current?.classList?.add('show') : showScroll.current?.classList?.remove('show');       
      });
    }
  }, []);

  const scroll = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <Box className="scroll-up" ref={showScroll}   onClick={() => scroll()}>
      <Box
        as="i"
        className="ti-arrow-up"      
        role="button"
        tabIndex="0"
      ></Box>
    </Box>
  );
};

export default Scroll;
