import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  markerId: undefined
};

const markerSlice = createSlice({
  name: 'marker',
  initialState,
  reducers: {
    setmarkerId: (state, action) => {
      const id = action.payload;
      state.markerId = id;
    }
  }
});

export default markerSlice.reducer;
export const { setmarkerId } = markerSlice.actions;
