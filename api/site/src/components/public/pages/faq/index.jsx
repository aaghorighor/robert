import React from 'react';
import { Layout, Content } from 'suftnet-ui-kit';
import SiteHeader from '../../header';
import { BigFooter, BottomFooter } from '../../footer';
import HeaderPanel from '../../header/header-panel';
import Contents from './contents';
import Scroll from '../../shared/scroll-up';

const AppFaq = () => (
  <>
    <Layout>
      <SiteHeader />
      <Content
        justifyContent="start"
        direction="column"
        alignItems="start"
        className="mb-1"
      >
        <HeaderPanel
          title="FAQS"       
          description="If you don't see an answer to your question, you can send us an email from our contact form."
        />
        <Scroll />
        <Contents />      
      </Content>
      <BigFooter bg={'bg-light'} />
      <BottomFooter />
    </Layout>
  </>
);

export default AppFaq;
