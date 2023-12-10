import { configureStore } from '@reduxjs/toolkit';
import placeReducer from './slices/placeSlice';
import markerSlice from './slices/markerSlice';
import ListDetailBarSlice from './slices/ListDetailBarSlice';
import searchSlice from './slices/searchSlice';
import locationSlice from './slices/locationSlice';
import sideBarSlice from './slices/sideBarSlice';

const store = configureStore({
  reducer: {
    place: placeReducer,
    marker: markerSlice,
    listDetail: ListDetailBarSlice,
    search: searchSlice,
    location: locationSlice,
    sideBar: sideBarSlice
  }
});

export default store;
