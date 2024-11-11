import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    testimonies: [],
    testimony: {},
};

const testimonySlice = createSlice({
    name: 'TestimonySlice',
    initialState,
    reducers: {
        addTestimony(state, action) {          
            state.testimonies = [ action.payload, ...state.testimonies];
        },
        editTestimony(state, action) {
            state.testimony = action.payload
        },
        updateMyTestimony(state, action) {
            state.testimonies = state.testimonies.map((testimony) => {
                return (testimony._id === action?.payload._id) ? action?.payload : testimony;
        })},
        deleteMyTestimony(state, action) {      
            state.testimonies = state.testimonies.filter((testimony) => testimony._id !== action?.payload);
        },
        loadTestimonies(state, action) {            
            state.testimonies = action?.payload 
        },
        resetTestimony(state, action) {            
            state.testimony = {}
        }
    }
});

export const { addTestimony, updateMyTestimony, deleteMyTestimony, loadTestimonies, editTestimony, resetTestimony } = testimonySlice.actions;
export default testimonySlice.reducer;