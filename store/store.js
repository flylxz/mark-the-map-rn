import {configureStore} from '@reduxjs/toolkit';
import {markersSlice} from './markersSlice';
import {modalSlice} from './modalSlice';

export const store = configureStore({
  reducer: {
    markers: markersSlice.reducer,
    modal: modalSlice.reducer,
  },
});
