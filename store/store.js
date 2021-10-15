import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {houseApi} from '../service/house';

import {housesSlice} from './houseSlice';
import {modalSlice} from './modalSlice';

export const store = configureStore({
  reducer: {
    [houseApi.reducerPath]: houseApi.reducer,
    houses: housesSlice.reducer,
    modal: modalSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(houseApi.middleware),
});

setupListeners(store.dispatch);
