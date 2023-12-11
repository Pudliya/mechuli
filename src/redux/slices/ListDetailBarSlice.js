import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toggle: false,
  listToggle: false
};

const ListDetailBarSlice = createSlice({
  name: 'listdetailbar',
  initialState,
  reducers: {
    toggleOpen: (state, action) => {
      state.toggle = action.payload;
    },
    listToggleOpen: (state, action) => {
      state.listToggle = action.payload;
    }
  }
});

export const { toggleOpen, listToggleOpen } = ListDetailBarSlice.actions;
export default ListDetailBarSlice.reducer;
