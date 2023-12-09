import { configureStore } from '@reduxjs/toolkit';
import placeReducer from './slices/placeSlice';
import markerSlice from './slices/markerSlice';
import ListDetailBarSlice from './slices/ListDetailBarSlice';

const store = configureStore({
  reducer: {
    place: placeReducer,
    marker: markerSlice,
    listDetail: ListDetailBarSlice
  }
});

export default store;
