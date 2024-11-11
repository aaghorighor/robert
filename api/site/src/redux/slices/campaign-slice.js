import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    campaigns: [],
    campaign: {},
};

const campaignSlice = createSlice({
    name: 'Campaign',
    initialState,
    reducers: {
        addMyCampaign(state, action) {          
            state.campaigns = [ action.payload, ...state.campaigns];
        },
        editMyCampaign(state, action) {
            state.campaign = action.payload
        },
        updateMyCampaign(state, action) {
            state.campaigns = state.campaigns.map((campaign) => {
                return (campaign._id === action?.payload._id) ? action?.payload : campaign;
        })},
        deleteMyCampaign(state, action) {      
            state.campaigns = state.campaigns.filter((campaign) => campaign._id !== action?.payload);
        },
        loadCampaigns(state, action) {            
            state.campaigns = action?.payload 
        },
        resetCampaign(state, action) {            
            state.campaign = {}
        }
    }
});

export const { addMyCampaign, updateMyCampaign, deleteMyCampaign, loadCampaigns, editMyCampaign, resetCampaign } = campaignSlice.actions;
export default campaignSlice.reducer;