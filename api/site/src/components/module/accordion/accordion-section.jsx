/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import AccordionContext from './accordion-context';

const AccordionSection = ({ index, title, content, className }) => {
  const { expanded, handleToggle } = React.useContext(AccordionContext);

  return (
    <div className={`accordion__section ${className || ''}`}>
      <div
        className="accordion__section__header"
        onClick={() => handleToggle(index)}
      >
        <span>{title}</span>{' '}
        <i
          className={`fw-bold text_small ${
            expanded === index ? 'ti-minus' : 'ti-add'
          }`}
        ></i>
      </div>
      <div
        className={`accordion__section__body ${
          expanded === index ? 'expanded' : 'collapsed'
        } `}
      >
        <div className="accordion__section__body__content">{content}</div>
      </div>
    </div>
  );
};

AccordionSection.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  index: PropTypes.number,
  className: PropTypes.string,
};

export default AccordionSection;
