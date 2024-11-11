import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    paymentProviders: [],
    paymentProvider: {},
};

const paymentProviderSlice  = createSlice({
    name: 'paymentProviderSlice',
    initialState,
    reducers: {
        addNewPaymentProvider(state, action) {          
            state.paymentProviders = [ action.payload, ...state.paymentProviders];
        },
        editPaymentProvider(state, action) {
            state.paymentProvider = action.payload
        },
        updatePaymentProvider(state, action) {
            state.paymentProviders = state.paymentProviders.map((x) => {
                return (x._id === action?.payload._id) ? action?.payload : x;
        })},
        deletePaymentProvider(state, action) {      
            state.paymentProviders = state.paymentProviders.filter((x) => x._id !== action?.payload);
        },
        loadPaymentProviders(state, action) {            
            state.paymentProviders = action?.payload 
        },
        resetPaymentProvider(state, action) {            
            state.paymentProvider = {}
        }

    }
});

export const { addNewPaymentProvider, updatePaymentProvider, deletePaymentProvider, loadPaymentProviders, editPaymentProvider, resetPaymentProvider } = paymentProviderSlice.actions;
export default paymentProviderSlice.reducer;