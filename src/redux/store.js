import { configureStore } from '@reduxjs/toolkit';
import placeReducer from './slices/placeSlice';
import markerSlice from './slices/markerSlice';

const store = configureStore({
  reducer: {
    place: placeReducer,
    marker: markerSlice
  }
});

export default store;
