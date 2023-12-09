import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchPlace: '',
  searchBtnToggle: false,
  entireLocationToggle: false,
  currentLocationToggle: false
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchPlace: (state, action) => {
      state.searchPlace = action.payload;
    },
    setSearchBtnToggle: (state, action) => {
      state.searchBtnToggle = action;
    },
    setEntireLocationToggle: (state, action) => {
      state.entireLocationToggle = action.payload;
    },
    setCurrentLocationToggle: (state, action) => {
      state.currentLocationToggle = action.payload;
    }
  }
});

export default searchSlice.reducer;
export const {
  searchBtnToggle,
  setSearchPlace,
  setSearchBtnToggle,
  setEntireLocationToggle,
  setCurrentLocationToggle
} = searchSlice.actions;
