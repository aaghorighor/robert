import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    user: {},
};

const userSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        addUser(state, action) {          
            state.users = [ action.payload, ...state.users];
        },
        editUser(state, action) {
            state.user = action.payload
        },
        updateMyUser(state, action) {
            state.users = state.users.map((user) => {
                return (user._id === action?.payload._id) ? action?.payload : user;
        })},
        deleteUser(state, action) {      
            state.users = state.users.filter((user) => user._id !== action?.payload);
        },
        loadUsers(state, action) {            
            state.users = action?.payload 
        },
        resetUser(state, action) {            
            state.user = {}
        }
    }
});

export const { addUser, updateMyUser, deleteUser, loadUsers, editUser, resetUser } = userSlice.actions;
export default userSlice.reducer;