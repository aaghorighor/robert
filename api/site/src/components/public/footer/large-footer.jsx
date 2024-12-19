import React from 'react';
import { Footer, Flex, Text, Grid } from 'suftnet-ui-kit';
import { Link } from 'react-router-dom';
import logo from '../../../assets/imgs/logo_1.png';
import map from '../../../assets/imgs/map.png';
import useMobile from '../../../hooks/useMobile';

const BigFooter = (props) => {
  const {isMobile} = useMobile();
  return ( <>
    <Footer>
      <Flex
        justifyContent="center"
        direction="column"
        alignItems="center"      
        className={`${isMobile ? 'p-5'  : 'p-7'} w-100 ${props?.bg ?? props?.bg }`}
      >
        <Grid row spacing={5} className={`${isMobile ? "w-100" :'w-80'}`}>
          <Grid col lg={4} xs={12}>
            <img src={logo} alt="Logo"></img>
            <Text as="h5" className="text-lead text_small1">
              {`We're a team of IT professionals dedicated to delivering cutting-edge solutions that help Organization of all sizes stay ahead of the curve.`}
            </Text>
            <div className="social-list-wrap mt-3">
              <ul className="social-list list-inline list-unstyled">
                <li className="list-inline-item">
                  <a href="/#" target="_blank" title="Facebook">
                    <span className="ti-facebook text_small2"></span>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="/#" target="_blank" title="Twitter">
                    <span className="ti-twitter text_small2"></span>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="/#" target="_blank" title="Instagram">
                    <span className="ti-instagram text_small2"></span>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="/#" target="_blank" title="printerst">
                    <span className="ti-pinterest text_small2"></span>
                  </a>
                </li>
              </ul>
            </div>
          </Grid>
          <Grid col lg={2} xs={12}>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="#" className="p-0">
                  How it works
                </Link>
              </li>             
              <li className="mb-2">
                <Link to="#" className="p-0">
                  Pricing
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="p-0">
                  Features
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="p-0">
                  FAQS
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="p-0">
                  Contact Us
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid col lg={2} xs={12}>
            <ul className="list-unstyled">
              <li className="mb-2  flex-row justify-content-start align-items-center">
                <span className="ti-mobile"></span>
                <Link href="tel:+020 8144 3161" className="p-0 ms-2">
                  {' '}
                 (+44)-020 8144 3161
                </Link>
              </li>
              <li className="mb-2  flex-row justify-content-start align-items-center">
                <span className="ti-email"></span>
                <Link href="mailto:info@suftnet.com" className="p-0 ms-2">
                  {' '}
                  info@suftnet.com
                </Link>
              </li>
              <li className="mb-2 flex-row justify-content-start align-items-center">
                <span className="ti-world"></span>
                <Link href="/#" className="p-0 ms-2">
                  {' '}
                  www.suftnet.com
                </Link>
              </li>
              <li className="mb-2 flex-row justify-content-start align-items-center">
                <span className="ti-location-pin"></span>
                <Text as="h6" className="text-dark lh-base ms-2 text_small">
                  2 Riseholme Orten Goldhay, Peterborough. Pe2 5sp.
                </Text>
              </li>
            </ul>
          </Grid>
          <Grid col lg={4} xs={12} className="flex-row justify-content-end ">
            <img src={map} alt="map" className="img-fluid"></img>
          </Grid>
        </Grid>
      </Flex>
    </Footer>
  </>)
};

export default BigFooter;
