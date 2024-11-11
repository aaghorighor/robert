import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'suftnet-ui-kit';
import 'suftnet-ui-kit/dist/index.css';

const PublicRoute = () => (
  <Container className={'bg-body'}>
    <Outlet />
  </Container>
);

export { PublicRoute };

