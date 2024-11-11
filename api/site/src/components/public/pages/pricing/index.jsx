import React from 'react';
import { Layout, Content } from 'suftnet-ui-kit';
import SiteHeader from '../../header';
import { BigFooter, BottomFooter } from '../../footer';
import HeaderPanel from '../../header/header-panel';
import Contents from './contents';
import Scroll from '../../shared/scroll-up';

const AppPricing = () => (
  <Layout>
    <SiteHeader />
    <Content
      justifyContent="start"
      direction="column"
      alignItems="start"
      className="mt-0"
    >
      <HeaderPanel
        title="Pricing "
        description="We offer great prices, quality service for your Church."
      />
      <Scroll />
      <Contents />
    </Content>
    <BigFooter bg={'bg-light'} />
    <BottomFooter />
  </Layout>
);

export default AppPricing;
