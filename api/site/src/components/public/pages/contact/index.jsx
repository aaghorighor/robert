import React from 'react';
import { Layout, Content } from 'suftnet-ui-kit';
import SiteHeader from '../../header';
import { BigFooter, BottomFooter } from '../../footer';
import HeaderPanel from '../../header/header-panel';
import ContactForm from './contact-form';
import Scroll from '../../shared/scroll-up';

const Contact = () => (
  <>
    <Layout>
      <SiteHeader  />
      <Content
        justifyContent="start"
        direction="column"
        alignItems="start"
        className='mt-0'
      >
        <HeaderPanel
          title="Contact us"      
          description="It is very easy to get in touch with us. Just use the contact form or pay us a visit for a coffee at the office. "
        />
        <Scroll />
        <ContactForm  />
      </Content>
      <BigFooter bg={'bg-light'} />
      <BottomFooter />
    </Layout>
  </>
);


export default Contact;
