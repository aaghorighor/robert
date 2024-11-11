/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import AccordionContext from './accordion-context';

const Accordion = ({ children, className, ...rest }) => {
  const [expanded, setExpanded] = React.useState(-1);

  const handleToggle = (index) => {
    setExpanded(index === expanded ? -1: index);
  };

  return (
    <AccordionContext.Provider value={{ expanded, handleToggle }}>
      <div {...rest} className={`accordion ${className || ''}`}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

Accordion.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Accordion;
