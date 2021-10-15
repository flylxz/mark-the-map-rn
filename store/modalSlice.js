import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  visible: false,
  markerId: null,
  houseId: null,
  newCoords: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModalAdd: (state, action) => {
      state.visible = true;
      state.newCoords = action.payload.coords;
      state.houseId = action.payload.id;
      // console.log('action===', action);
    },
    openModalEdit: (state, action) => {
      state.visible = true;
      state.markerId = action.payload;
      // console.log('+++', state);
    },
    closeModal: state => {
      state.visible = false;
      state.markerId = null;
      state.newCoords = null;
      state.houseId = null;
      //   state = initialState;
      //   console.log(state);
    },
  },
});

export const {openModalAdd, openModalEdit, closeModal} = modalSlice.actions;
