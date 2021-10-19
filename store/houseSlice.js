import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import images from '../constants/images';
import {houseApi} from '../service/house';

const initialState = {
  houses: [],
};

// export const fetchHousesAsync = createAsyncThunk(
//   'houses/fetchHouses',
//   async () => {
//     const response = await fetch(`http://10.0.1.50:3000/houses`);
//     if (!response.ok) {
//       console.log('Something went wrong!');
//     }

//     const data = await response.json();
//     return data;
//   },
// );

// export const addMarkerAsync = createAsyncThunk(
//   'houses/addMarkerAsync',
//   async payload => {
//     const response = await fetch(
//       `http://10.0.1.50:3000/houses/${payload.houseId}`,
//       {
//         // const response = await fetch(`${houseApi}houses/`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload.newMark),
//       },
//     );

//     if (!response.ok) {
//       console.log('Something went wrong!');
//     }

//     const data = await response.json();
//     return data;
//   },
// );

// export const removeMarkerAsync = createAsyncThunk(
//   'houses/removeMarkerAsync ',
//   async payload => {
//     const response = await fetch();
//   },
// );

export const housesSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {
    // fetchData: (state, action) => {
    //   state = action.payload;
    //   // console.log('===', state);
    // },
    // editMarker: (state, action) => {
    //   state.markers = [
    //     ...state.markers.map(i =>
    //       i.id === action.payload.id ? action.payload : i,
    //     ),
    //   ];
    // },
    // removeMarker: (state, action) => {
    //   state.markers = state.markers.filter(i => i.id !== action.payload);
    // },
  },
  // extraReducers: {
  //   [fetchHousesAsync.fulfilled]: (state, action) => {
  //     state = action.payload;
  //     // console.log('state----', state);
  //   },
  //   [addMarkerAsync.fulfilled]: (state, action) => {
  //     // console.log('action----', action.payload);
  //     state.houses.push(action.payload);
  //   },
  // },
});

export const {editMarker, removeMarker} = housesSlice.actions;
