import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {houseApi} from '../service/house';

import {housesSlice} from './houseSlice';

export const store = configureStore({
  reducer: {
    [houseApi.reducerPath]: houseApi.reducer,
    houses: housesSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(houseApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);
