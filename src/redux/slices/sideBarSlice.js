import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false
};

const sidebarToggle = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    }
  }
});

export const { isOpen, setIsOpen } = sidebarToggle.actions;
export default sidebarToggle.reducer;
