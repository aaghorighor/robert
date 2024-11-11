import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    events: [],
    event: {},
};

const eventSlice = createSlice({
    name: 'Event',
    initialState,
    reducers: {
        addMyEvent(state, action) {          
            state.events = [ action.payload, ...state.events];
        },
        editMyEvent(state, action) {
            state.event = action.payload
        },
        updateMyEvent(state, action) {
            state.events = state.events.map((event) => {
                return (event._id === action?.payload._id) ? action?.payload : event;
        })},
        deleteMyEvent(state, action) {      
            state.events = state.events.filter((event) => event._id !== action?.payload);
        },
        loadEvents(state, action) {            
            state.events = action?.payload 
        },
        resetEvent(state, action) {            
            state.event = {}
        }
    }
});

export const { addMyEvent, updateMyEvent, deleteMyEvent, loadEvents, editMyEvent, resetEvent } = eventSlice.actions;
export default eventSlice.reducer;