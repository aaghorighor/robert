import React from 'react';
import { Layout, Content } from 'suftnet-ui-kit';
import SiteHeader from '../../header';
import { BottomFooter } from '../../footer';
import Scroll from '../../shared/scroll-up';
import ContentBody from './contentBody';

const Home = () => {

  return (
    <Layout >
      <SiteHeader />
      <Content
        justifyContent="start"
        direction="column"
        alignItems="start"
        className="mt-0"
      >
        <Scroll />
        <ContentBody />
      </Content>
      <BottomFooter />
    </Layout>
  );
};

export default Home;
