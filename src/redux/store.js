import { configureStore } from '@reduxjs/toolkit';
import placeReducer from './slices/placeSlice';
import markerSlice from './slices/markerSlice';
import searchSlice from './slices/searchSlice';
import locationSlice from './slices/locationSlice';

const store = configureStore({
  reducer: {
    place: placeReducer,
    marker: markerSlice,
    search: searchSlice,
    location: locationSlice
  }
});

export default store;
