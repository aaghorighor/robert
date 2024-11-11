import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    serviceTimeAgendas: [],
    serviceTimeAgenda: {},
};

const serviceTimeAgendaSlice = createSlice({
    name: 'ServiceTimeAgenda',
    initialState,
    reducers: {
        addMyServiceTimeAgenda(state, action) {          
            state.serviceTimeAgendas = [ action.payload, ...state.serviceTimeAgendas];
        },
        editMyServiceTimeAgenda(state, action) {
            state.serviceTimeAgenda = action.payload
        },
        updateMyServiceTimeAgenda(state, action) {
            state.serviceTimeAgendas = state.serviceTimeAgendas.map((serviceTimeAgenda) => {
                return (serviceTimeAgenda._id === action?.payload._id) ? action?.payload : serviceTimeAgenda;
        })},
        deleteMyServiceTimeAgenda(state, action) {      
            state.serviceTimeAgendas = state.serviceTimeAgendas.filter((serviceTimeAgenda) => serviceTimeAgenda._id !== action?.payload);
        },
        loadServiceTimeAgendas(state, action) {            
            state.serviceTimeAgendas = action?.payload 
        },
        resetServiceTimeAgenda(state, action) {            
            state.serviceTimeAgenda = {}
        }
    }
});

export const { addMyServiceTimeAgenda, updateMyServiceTimeAgenda, deleteMyServiceTimeAgenda, loadServiceTimeAgendas, editMyServiceTimeAgenda, resetServiceTimeAgenda } = serviceTimeAgendaSlice.actions;
export default serviceTimeAgendaSlice.reducer;