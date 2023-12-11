import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  markerId: undefined,
  listId: undefined
};

const markerSlice = createSlice({
  name: 'marker',
  initialState,
  reducers: {
    setmarkerId: (state, action) => {
      state.markerId = action.payload;
      state.listId = initialState.listId;
    },
    setlistId: (state, action) => {
      state.listId = action.payload;
      state.markerId = initialState.markerId;
    }
  }
});

export default markerSlice.reducer;
export const { setmarkerId, setlistId } = markerSlice.actions;
