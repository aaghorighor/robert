import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    contacts: [],
    contact: {},
};

const contactSlice = createSlice({
    name: 'ContactsSlice',
    initialState,
    reducers: {
        addMyContact(state, action) {          
            state.contacts = [ action.payload, ...state.contacts];
        },
        editContact(state, action) {
            state.contact = action.payload
        },
        updateMyContact(state, action) {
            state.contacts = state.contacts.map((contact) => {
                return (contact._id === action?.payload._id) ? action?.payload : contact;
        })},
        deleteContact(state, action) {      
            state.contacts = state.contacts.filter((contact) => contact._id !== action?.payload);
        },
        loadContacts(state, action) {            
            state.contacts = action?.payload 
        },
        resetContact(state, action) {            
            state.contact = {}
        }
    }
});

export const { addMyContact, updateMyContact, deleteContact, loadContacts, editContact, resetContact } = contactSlice.actions;
export default contactSlice.reducer;