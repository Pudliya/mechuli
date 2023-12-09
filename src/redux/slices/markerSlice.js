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
      const id = action.payload;
      state.markerId = id;
    },
    setlistId: (state, action) => {
      const listId = action.payload;
      state.listId = listId;
    }
  }
});

export default markerSlice.reducer;
export const { setmarkerId, setlistId } = markerSlice.actions;
