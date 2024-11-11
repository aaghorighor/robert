import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pushNotifications: [],
    pushNotification: {},
};

const pushNotificationSlice = createSlice({
    name: 'PushNotificationSlice',
    initialState,
    reducers: {
        addMyPushNotification(state, action) {          
            state.pushNotifications = [ action.payload, ...state.pushNotifications];
        },
        editPushNotification(state, action) {
            state.pushNotification = action.payload
        },
        updateMyPushNotification(state, action) {
            state.pushNotifications = state.pushNotifications.map((pushNotification) => {
                return (pushNotification._id === action?.payload._id) ? action?.payload : pushNotification;
        })},
        deletePushNotification(state, action) {      
            state.pushNotifications = state.pushNotifications.filter((pushNotification) => pushNotification._id !== action?.payload);
        },
        loadPushNotifications(state, action) {            
            state.pushNotifications = action?.payload 
        },
        resetPushNotification(state, action) {            
            state.pushNotification = {}
        }
    }
});

export const { addMyPushNotification, updateMyPushNotification, deletePushNotification, loadPushNotifications, editPushNotification, resetPushNotification } = pushNotificationSlice.actions;
export default pushNotificationSlice.reducer;