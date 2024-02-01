import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../slices/todoSlice';

export const store = configureStore({
  // passing  all the reducer here, only one reducer in this project
  reducer: {
    // get only one reducer TodoReducer => will get Data from Localstorage
    todo: todoReducer,
  },
});
