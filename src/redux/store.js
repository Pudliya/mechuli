import { configureStore } from '@reduxjs/toolkit';
import placeReducer from './slices/placeSlice';
import markerSlice from './slices/markerSlice';
import ListDetailBarSlice from './slices/ListDetailBarSlice';
import searchSlice from './slices/searchSlice';
import locationSlice from './slices/locationSlice';

const store = configureStore({
  reducer: {
    place: placeReducer,
    marker: markerSlice,
    listDetail: ListDetailBarSlice,
    search: searchSlice,
    location: locationSlice
  }
});

export default store;
