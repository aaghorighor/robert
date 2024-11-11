import React from 'react';
import { Link } from 'suftnet-ui-kit';
import logo from '../../../assets/imgs/logo.png';

const Logo = () => (
  <div className='mt-2'>
    <Link
      className="p-0"      
      secondary
      href="/"
      onClick={() => console.log('')}
    >
      <img src={logo} alt="arnaty logo"  className='img-fluid'></img>
    </Link>
  </div>
)

export default Logo;
