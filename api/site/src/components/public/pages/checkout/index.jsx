import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { Layout, Content } from 'suftnet-ui-kit';
import ContactForm from './contact-form';
import Scroll from '../../shared/scroll-up';
import PackageSignUp from './sign-up';

const PlanCheckOut = () => {
 useEffect(() => {   
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <Layout>
      <Content
        justifyContent="start"
        direction="column"
        alignItems="start"
        className='mt-0'
      >

        <Scroll />
        <PackageSignUp />
        <ContactForm />
      </Content>
    </Layout>
  )

};


export default PlanCheckOut;
