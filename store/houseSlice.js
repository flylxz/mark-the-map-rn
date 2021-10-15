import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import images from '../constants/images';
import {houseApi} from '../service/house';

const initialState = {
  houses: [],
};

export const addMarkerAsync = createAsyncThunk(
  'houses/addMarkerAsync ',
  async payload => {
    const response = await fetch(
      `http://10.0.1.50:3000/houses/${payload.houseId}`,
      {
        // const response = await fetch(`${houseApi}houses/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload.newMark),
      },
    );

    if (!response.ok) {
      console.log('Something went wrong!');
    }

    const data = await response.json();
    return data;
  },
);

export const housesSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {
    // addMarker: (state, action) => {
    //   state.markers = [...state.markers, action.payload];
    // },
    editMarker: (state, action) => {
      state.markers = [
        ...state.markers.map(i =>
          i.id === action.payload.id ? action.payload : i,
        ),
      ];
    },
    removeMarker: (state, action) => {
      state.markers = state.markers.filter(i => i.id !== action.payload);
    },
  },
  extraReducers: {
    [addMarkerAsync.fulfilled]: (state, action) => {
      console.log('state----', state);
      console.log('action----', action);
      state.push(action.payload.newMark);
    },
  },
});

export const {addMarker, editMarker, removeMarker} = housesSlice.actions;
