import React from 'react';
import { Layout, Content } from 'suftnet-ui-kit';
import SiteHeader from '../../../header';
import { BigFooter, BottomFooter } from '../../../footer';
import HeaderPanel from '../../../header/header-panel';
import { Subscribe } from '../../../shared';
import Scroll from '../../../shared/scroll-up';
import Contents from './contents';

const MFMPrayersPrivacyPolicy = () => (
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
          title="MFM Prayers"       
          description="Privacy Policy"
        />
        <Scroll />
        <Contents />
        <Subscribe />
      </Content>
      <BigFooter />
      <BottomFooter />
    </Layout>
  </>
);

export default MFMPrayersPrivacyPolicy;
