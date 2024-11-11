import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    serviceTimes: [],
    serviceTime: {},
};

const serviceTimeSlice = createSlice({
    name: 'ServiceTime',
    initialState,
    reducers: {
        addMyServiceTime(state, action) {          
            state.serviceTimes = [ action.payload, ...state.serviceTimes];
        },
        editMyServiceTime(state, action) {
            state.serviceTime = action.payload
        },
        updateMyServiceTime(state, action) {
            state.serviceTimes = state.serviceTimes.map((serviceTime) => {
                return (serviceTime._id === action?.payload._id) ? action?.payload : serviceTime;
        })},
        deleteMyServiceTime(state, action) {      
            state.serviceTimes = state.serviceTimes.filter((serviceTime) => serviceTime._id !== action?.payload);
        },
        loadServiceTimes(state, action) {            
            state.serviceTimes = action?.payload 
        },
        resetServiceTime(state, action) {            
            state.serviceTime = {}
        }
    }
});

export const { addMyServiceTime, updateMyServiceTime, deleteMyServiceTime, loadServiceTimes, editMyServiceTime, resetServiceTime } = serviceTimeSlice.actions;
export default serviceTimeSlice.reducer;