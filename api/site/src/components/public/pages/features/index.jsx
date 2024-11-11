import React from 'react';
import { Layout, Content } from 'suftnet-ui-kit';
import SiteHeader from '../../header';
import { BigFooter, BottomFooter } from '../../footer';
import HeaderPanel from '../../header/header-panel';
import Contents from './contents';
import Scroll from '../../shared/scroll-up';

const AppFeatures = () => (
  <>
    <Layout>
      <SiteHeader />
      <Content
        justifyContent="start"
        direction="column"
        alignItems="start"
        className="mt-0"
      >
        <HeaderPanel
          title="Features"
          description="Jerur offers a range of features designed to make your church management experience seamless. "
        />

        <Scroll />
        <Contents />
      </Content>
      <BigFooter bg={'bg-body'} />
      <BottomFooter />
    </Layout>
  </>
);

export default AppFeatures;
