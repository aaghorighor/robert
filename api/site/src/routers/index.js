import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { PublicRoute } from './public-route';
import { ProtectedRoute } from './protected-route';
import 'suftnet-ui-kit/dist/index.css';
import Contact from '../components/public/pages/contact';
import Home from '../components/public/pages/home';

const Routers = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact-us" element={<Contact />} />         
         </Route>
        <Route path="/v1" element={<ProtectedRoute />}>
          
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </>,
    ),
  );

  return <RouterProvider router={router}></RouterProvider>;
};

export default Routers;
