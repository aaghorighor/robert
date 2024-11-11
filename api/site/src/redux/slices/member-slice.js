import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    members: [],
    member: {},
};

const memberSlice = createSlice({
    name: 'MemberSlice',
    initialState,
    reducers: {
        addMember(state, action) {          
            state.members = [ action.payload, ...state.members];
        },
        editMember(state, action) {
            state.member = action.payload
        },
        updateMyMember(state, action) {
            state.members = state.members.map((member) => {
                return (member._id === action?.payload._id) ? action?.payload : member;
        })},
        deleteMyMember(state, action) {      
            state.members = state.members.filter((member) => member._id !== action?.payload);
        },
        loadMembers(state, action) {            
            state.members = action?.payload 
        },
        resetMember(state, action) {            
            state.member = {}
        }
    }
});

export const { addMember, updateMyMember, deleteMyMember, loadMembers, editMember, resetMember } = memberSlice.actions;
export default memberSlice.reducer;