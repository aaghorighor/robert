import React from 'react';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useAppContext } from '../components/shared/appContext';
import { Container } from 'suftnet-ui-kit';
import 'suftnet-ui-kit/dist/index.css';

const ProtectedRoute = () => {
  const { user } = useAppContext();
  // if (!user) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <Container style={{ background: '#ffffff' }}>
      <Outlet />
    </Container>
  );
};

export { ProtectedRoute };
