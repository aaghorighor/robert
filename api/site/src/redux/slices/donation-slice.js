import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    donations: [],
    donation: {},
};

const donationSlice = createSlice({
    name: 'Donation',
    initialState,
    reducers: {
        addMyDonation(state, action) {          
            state.donations = [ action.payload, ...state.donations];
        },
        editMyDonation(state, action) {
            state.donation = action.payload
        },
        updateMyDonation(state, action) {
            state.donations = state.donations.map((donation) => {
                return (donation._id === action?.payload._id) ? action?.payload : donation;
        })},
        deleteMyDonation(state, action) {      
            state.donations = state.donations.filter((donation) => donation._id !== action?.payload);
        },
        loadDonations(state, action) {            
            state.donations = action?.payload 
        },
        resetDonation(state, action) {            
            state.donation = {}
        }
    }
});

export const { addMyDonation, updateMyDonation, deleteMyDonation, loadDonations, editMyDonation, resetDonation } = donationSlice.actions;
export default donationSlice.reducer;