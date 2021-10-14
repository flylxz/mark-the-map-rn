import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  initialRegion: {
    latitude: 50.0314,
    longitude: 36.2219,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  },
  markers: [
    {
      id: '1',
      title: 'first',
      description: 'test ',
      coords: {latitude: 50.03263326152739, longitude: 36.223269291222095},
    },
    {
      id: '2',
      title: 'second',
      description: 'test test',
      coords: {latitude: 50.033222711974936, longitude: 36.220791935920715},
    },
    {
      id: '3',
      title: 'third',
      description: 'test test test',
      coords: {latitude: 50.03184343096533, longitude: 36.22232756290436},
    },
  ],
};

export const markersSlice = createSlice({
  name: 'markers',
  initialState,
  reducers: {
    addMarker: (state, action) => {
      state.markers = [...state.markers, action.payload];
    },
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
});

export const {addMarker, editMarker, removeMarker} = markersSlice.actions;
