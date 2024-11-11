import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fellowships: [],
    fellowship: {},
};

const fellowshipSlice = createSlice({
    name: 'Fellowship',
    initialState,
    reducers: {
        addMyFellowship(state, action) {          
            state.fellowships = [ action.payload, ...state.fellowships];
        },
        editMyFellowship(state, action) {
            state.fellowship = action.payload
        },
        updateMyFellowship(state, action) {
            state.fellowships = state.fellowships.map((fellowship) => {
                return (fellowship._id === action?.payload._id) ? action?.payload : fellowship;
        })},
        deleteMyFellowship(state, action) {      
            state.fellowships = state.fellowships.filter((fellowship) => fellowship._id !== action?.payload);
        },
        loadFellowships(state, action) {            
            state.fellowships = action?.payload 
        },
        resetFellowship(state, action) {            
            state.fellowship = {}
        }
    }
});

export const { addMyFellowship, updateMyFellowship, deleteMyFellowship, loadFellowships, editMyFellowship, resetFellowship } = fellowshipSlice.actions;
export default fellowshipSlice.reducer;