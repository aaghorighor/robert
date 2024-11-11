import React from 'react';
import { Link, Text } from 'suftnet-ui-kit';
import logo from '../../../assets/imgs/logo_1.png';
import { BsCompass } from 'react-icons/bs';

const Logo = () => (
  <div style={{height: '60px'}}>
    <Link
      className="p-0"
      secondary
      href="/"
      onClick={() => {}}
    >
      {/* <img src={logo}  alt="Logo" className='img-fluid'></img> */}
        <div className="flex-row justify-content-start align-items-center px-2">
        {/* <BsCompass
          size={15}
          className='text-white'
        /> */}
        <Text as="h4" className='text-white'>Jerur</Text>
      </div>

    </Link>
  </div>
)

export default Logo;
