import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  latlng: [37.566826, 126.9786567]
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLatlng: (state, action) => {
      state.latlng = action.payload;
    }
  }
});

export default locationSlice.reducer;
export const { setLatlng } = locationSlice.actions;
