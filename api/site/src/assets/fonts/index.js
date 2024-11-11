/* eslint-disable camelcase */
import { createGlobalStyle } from 'styled-components';

import eot from './themify.eot';
import woff from './themify.woff';
import ttf from './themify.ttf';
import svg from './themify.svg';

import unicons_woff from './Unicons.woff';
import unicons_woff2 from './Unicons.woff2';

export const FontsStyle = createGlobalStyle`
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: normal;
    src:
      url('${eot}') format('embedded-opentype'),
      url('${woff}') format('woff'),
      url('${ttf}') format('truetype'),
      url('${svg}') format('svg');
  }

  @font-face {
  font-family: 'Unicons'; 
  src: url('${unicons_woff2}') format('woff2'), url('${unicons_woff}') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

  html, body {
    font-family:'Roboto','sans-serif' ,'Open Sans', 'Unicons';
    line-height:1.7;
  }
`;
