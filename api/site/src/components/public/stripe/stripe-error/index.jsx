import React from 'react';
import { Layout, Content } from 'suftnet-ui-kit';
import Scroll from '../../shared/scroll-up';
import Contents from './content';

const StripePayoutError = () => (  
    <Layout>   
      <Content
        justifyContent="start"
        direction="column"
        alignItems="start"
        className="mt-0"
      >       
        <Scroll />
        <Contents />            
      </Content>     
    </Layout>
);

export default StripePayoutError;
