const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  place: null
};

const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    setPlace: (state, action) => {
      console.log('action.payload : ', action.payload);
      state.place = action.payload;
    }
  }
});

// const placeSlice = createSlice({
//   name: 'place',
//   initialState,
//   reducers: {
//     setPlace: (state, action) => {
//       state.address_name = action.payload.address_name;
//       state.category_name = action.payload.category_name;
//       state.id = action.payload.id;
//       state.phone = action.payload.phone;
//       state.place_name = action.payload.place_name;
//       state.place_url = action.payload.place_url;
//       state.position = action.payload.position;
//       state.road_address_name = action.payload.road_address_name;
//     }
//   }
// });

export default placeSlice.reducer;
export const { setPlace } = placeSlice.actions;
