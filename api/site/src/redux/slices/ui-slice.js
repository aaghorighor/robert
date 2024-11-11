import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    show_search_bar: false,
  
};

const uiSlice = createSlice({
    name: 'uiSlice',
    initialState,
    reducers: {
        showSearchBar(state, action) {          
            state.show_search_bar =action.payload;
        }      

    }
});

export const { showSearchBar } = uiSlice.actions;
export default uiSlice.reducer;