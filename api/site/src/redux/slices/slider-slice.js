import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sliders: [],
    slider: {},
};

const sliderSlice = createSlice({
    name: 'SliderSlice',
    initialState,
    reducers: {
        addMySlider(state, action) {          
            state.sliders = [ action.payload, ...state.sliders];
        },
        editSlider(state, action) {
            state.slider = action.payload
        },
        updateMySlider(state, action) {
            state.sliders = state.sliders.map((slider) => {
                return (slider._id === action?.payload._id) ? action?.payload : slider;
        })},
        deleteSlider(state, action) {      
            state.sliders = state.sliders.filter((slider) => slider._id !== action?.payload);
        },
        loadSliders(state, action) {            
            state.sliders = action?.payload 
        },
        resetSlider(state, action) {            
            state.slider = {}
        }
    }
});

export const { addMySlider, updateMySlider, deleteSlider, loadSliders, editSlider, resetSlider } = sliderSlice.actions;
export default sliderSlice.reducer;