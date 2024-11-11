import { combineReducers } from '@reduxjs/toolkit';
import uiSlice from '../slices/ui-slice';
import paymentProviderSlice from '../slices/payment-provider-slice';
import userSlice from '../slices/user-slice';
import serviceTimeSlice from '../slices/service-time-slice';
import eventSlice from '../slices/event-slice';
import campaignSlice from '../slices/campaign-slice';
import donationSlice from '../slices/donation-slice';
import fellowshipSlice from '../slices/fellowship-slice';
import sliderSlice from '../slices/slider-slice';
import eventAgendaSlice from '../slices/event-agenda-slice';
import serviceTimeAgendaSlice from '../slices/service-time-agenda-slice';
import contactSlice from '../slices/contact-slice';
import notificationSlice from '../slices/push-notification-slice';
import memberSlice from '../slices/member-slice';
import testimonySlice from '../slices/testimony-slice';

const reducers = combineReducers({
  uiSlice,
  paymentProviderSlice,
  userSlice,
  serviceTimeSlice,
  eventSlice,
  campaignSlice,
  donationSlice,
  fellowshipSlice,
  sliderSlice,
  contactSlice,
  eventAgendaSlice,
  serviceTimeAgendaSlice,
  notificationSlice,
  memberSlice,
  testimonySlice
});

export default reducers;
