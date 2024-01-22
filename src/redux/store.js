import {configureStore} from '@reduxjs/toolkit';
import appSlice from './slice/app.slice';

export const store = configureStore({
  reducer: {
    app: appSlice,
  },
});
