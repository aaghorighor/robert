import React from 'react';

const initialContext = {
  expanded: false,
};

const AccordionContext = React.createContext(initialContext);
export default AccordionContext;
