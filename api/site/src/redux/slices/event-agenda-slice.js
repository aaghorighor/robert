import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    eventAgendas: [],
    eventAgenda: {},
};

const eventAgendaSlice = createSlice({
    name: 'EventAgenda',
    initialState,
    reducers: {
        addMyEventAgenda(state, action) {          
            state.eventAgendas = [ action.payload, ...state.eventAgendas];
        },
        editMyEventAgenda(state, action) {
            state.eventAgenda = action.payload
        },
        updateMyEventAgenda(state, action) {
            state.eventAgendas = state.eventAgendas.map((eventAgenda) => {
                return (eventAgenda._id === action?.payload._id) ? action?.payload : eventAgenda;
        })},
        deleteMyEventAgenda(state, action) {      
            state.eventAgendas = state.eventAgendas.filter((eventAgenda) => eventAgenda._id !== action?.payload);
        },
        loadEventAgendas(state, action) {            
            state.eventAgendas = action?.payload 
        },
        resetEventAgenda(state, action) {            
            state.eventAgenda = {}
        }
    }
});

export const { addMyEventAgenda, updateMyEventAgenda, deleteMyEventAgenda, loadEventAgendas, editMyEventAgenda, resetEventAgenda } = eventAgendaSlice.actions;
export default eventAgendaSlice.reducer;