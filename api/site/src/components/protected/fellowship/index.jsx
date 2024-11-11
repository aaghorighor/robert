import React from 'react';
import { Layout, Content } from 'suftnet-ui-kit';
import SecureHeader from '../header';
import Contents from '../fellowship/contents';

const Fellowship = () => {
  
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

export default Fellowship;
