
import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({styles='menu'}) => { 
  return (
      <div className={styles}>
        <Link to="/">My Books</Link>      
        <Link to="/contact-us">Contact</Link>
      </div>
  )
};
export default Menu;
