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
import Pricing from '../components/public/pages/pricing';
import Features from '../components/public/pages/features';
import Faq from '../components/public/pages/faq';
import Home from '../components/public/pages/home';
import PlanCheckOut from '../components/public/pages/checkout';
import CheckOutCompleted from '../components/public/pages/checkout/check-out-completed';
import Login from '../components/public/secure/login';
import ForgotPassword from '../components/public/secure/forgot-password';
import ForgotPasswordCompleted from '../components/public/secure/forgot-password-completed';
import ResetPassword from '../components/public/secure/reset-password';
import ResetPasswordCompleted from '../components/public/secure/reset-password-completed';
import Settings from '../components/protected/settings';
import Profile from '../components/protected/profile';
import Dashboard from '../components/protected/dashboard';
import StripePayoutSuccess from '../components/public/stripe/payout-success';
import StripePayoutError from '../components/public/stripe/stripe-error';
import ServiceTime from '../components/protected/service-time';
import Event from '../components/protected/event';
import Campaign from '../components/protected/campaign';
import Donation from '../components/protected/donation';
import Fellowship from '../components/protected/fellowship';
import EventAgenda from '../components/protected/event-agenda';
import ServiceTimeAgenda from '../components/protected/service-time-agenda';
import PrivacyPolicy from '../components/public/delivery-privacy-policy';
import Member from '../components/protected/member';
import Testimony from '../components/protected/testimony';

const Routers = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact-us" element={<Contact />} />         
          <Route path="/check-out" element={<PlanCheckOut />} />
          <Route path="/check-out-completed" element={<CheckOutCompleted />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password-completed" element={<ForgotPasswordCompleted />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-password-completed" element={<ResetPasswordCompleted />} />        
          <Route path="/stripe-payout-success" element={<StripePayoutSuccess />} />
          <Route path="/stripe-payout-error" element={<StripePayoutError />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Route>
        <Route path="/v1" element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />       
          <Route path="settings" element={<Settings />} />    
          <Route path="profile" element={<Profile />} />            
          <Route path="service-time" element={<ServiceTime />} />  
          <Route path="service-time-agenda" element={<ServiceTimeAgenda />} />  
          <Route path="events" element={<Event />} /> 
          <Route path="event-agenda" element={<EventAgenda />} /> 
          <Route path="campaigns" element={<Campaign />} /> 
          <Route path="donations" element={<Donation />} /> 
          <Route path="fellowships" element={<Fellowship />} /> 
          <Route path="members" element={<Member />} /> 
          <Route path="testimonies" element={<Testimony />} /> 
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </>,
    ),
  );

  return <RouterProvider router={router}></RouterProvider>;
};

export default Routers;
