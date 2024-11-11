import React from 'react';
import { Layout, Content } from 'suftnet-ui-kit';
import SecureHeader from '../header';
import Contents from '../settings/contents';

const Settings = () => {
  
  return (
    <Layout>
      <SecureHeader />
      <Content
        justifyContent="start"
        direction="column"
        alignItems="start"
        className="mt-4 bg-light"
      >
        <Contents />
      </Content>
    </Layout>
  );

};

export default Settings;
